const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const errors = [];
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (['.git', '.agents', '.codex', '.vscode', 'tmp', 'node_modules'].includes(entry.name)) return [];
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}
function checkReference(file, ref) {
  if (!ref || /^(?:[a-z]+:|\/\/|#)/i.test(ref) || ref.includes('${')) return;
  const clean = decodeURIComponent(ref.split(/[?#]/)[0]);
  if (!clean) return;
  let target = clean.startsWith('/') ? path.join(root, clean) : path.resolve(path.dirname(file), clean);
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
  if (!fs.existsSync(target)) errors.push(`${path.relative(root, file)}: referência ausente ${ref}`);
}
const files = walk(root);
let references = 0;
for (const file of files) {
  const ext = path.extname(file);
  if (!['.html', '.css', '.js', '.cjs', '.webmanifest'].includes(ext)) continue;
  const content = fs.readFileSync(file, 'utf8');
  if (ext === '.js' || ext === '.cjs') {
    const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
    if (result.status !== 0) errors.push(result.stderr || `Falha ao validar ${file}`);
  }
  const pattern = ext === '.html' ? /(?:src|href)\s*=\s*["']([^"']+)["']/g
    : ext === '.css' ? /url\(\s*["']?([^\s"')]+)["']?\s*\)/g : null;
  if (pattern) for (const match of content.matchAll(pattern)) {
    checkReference(file, match[1]);
    references++;
  }
  if (ext === '.webmanifest') {
    try { for (const icon of JSON.parse(content).icons || []) checkReference(file, icon.src); }
    catch (error) { errors.push(`${file}: ${error.message}`); }
  }
}
// The technical portfolio loads these classic scripts sequentially at runtime.
const mainPath = path.join(root, 'src/js/technical/main.js');
const main = fs.readFileSync(mainPath, 'utf8');
const modules = main.match(/const modulesToLoad = \[([\s\S]*?)\];/);
if (!modules) errors.push('Lista de módulos técnicos não encontrada.');
else for (const match of modules[1].matchAll(/"([\w]+\.js)"/g)) checkReference(mainPath, match[1]);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Validação concluída: JavaScript, manifests, módulos dinâmicos e ${references} referências HTML/CSS.`);
