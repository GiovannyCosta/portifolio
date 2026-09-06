# gio.env

Site de serviços e portfólio técnico de Giovanny Costa. Projeto estático em HTML, CSS e JavaScript, sem etapa de build ou dependências de produção.

## Páginas

- `index.html`: apresentação dos serviços e projetos.
- `tecnico.html`: portfólio técnico, tecnologias e formação.
- `projetos/`: páginas de Astro Verde, Ludica+ e Clínica Psi.

## Organização

- `src/css/sales/`: estilos da página de vendas, divididos por seção. `index.css` mantém a ordem dos imports; ajustes responsivos ficam por último.
- `src/css/technical/`: componentes do portfólio técnico, reunidos por `style.css`.
- `src/css/projects/`: estilos das páginas de projetos; reutilizam a base e o cabeçalho técnico.
- `src/js/sales/`: navegação da página de vendas.
- `src/js/technical/`: scripts do portfólio técnico; `main.js` carrega os módulos em sequência.
- `src/img/brand/`: logo da marca.
- `src/img/sales/`: modelo ilustrativo da landing page.
- `src/img/projects/`: imagens e referências visuais organizadas por projeto.
- `src/img/tech-icons/` e `src/img/itens-banner/`: ícones e banners do portfólio técnico.
- `src/ico/`: favicons e ícones para dispositivos; a identidade atual usa o prefixo `gioenv`.
- `src/docs/`: documentos acadêmicos dos projetos.
- `scripts/check.cjs`: validação local, sem dependências adicionais.

## Desenvolvimento e validação

Sirva a raiz com um servidor HTTP estático (por exemplo, Live Server). Os caminhos `/src/` e `/projetos/` pressupõem que a raiz do repositório seja a raiz do site.

Com Node.js instalado:

```sh
npm run check
git diff --check
```

A verificação cobre sintaxe JavaScript, caminhos HTML/CSS, manifests e módulos técnicos carregados dinamicamente. A aparência e as interações devem ser revisadas no navegador em desktop e celular.

Para publicar, use a raiz como diretório de saída; não é necessário comando de build. Arquivos temporários ficam em `tmp/`, ignorado pelo Git.
