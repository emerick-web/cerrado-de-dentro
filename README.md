# Cerrado de Dentro

Site educativo e acolhedor sobre o Cerrado brasileiro (frutos, bichos e gente). Projeto final de **Desenvolvimento de Interfaces 2/2026** (CEUB), por Enzo Emerick.

## Recursos
- Navegação por páginas (Início, O Cerrado, Explorar, Vida e preservação, Design, Projeto, Contato, Entrar)
- Painel de acessibilidade: modo claro/escuro, fonte maior (100% a 150%), alto contraste e sem animações
- Carrossel de imagens em SVG com pausa
- Abas de pesquisa com busca sem acento e favoritos salvos no navegador
- Cartões explicativos, formulário de contato e página de login (demonstrações, sem envio de dados)
- Tabela de contraste WCAG calculada ao vivo
- Rodapé com referências

## Como rodar
1. Baixe ou clone o repositório.
2. Abra `index.html` no navegador. Não precisa instalar nada.
3. (Opcional) Ative o GitHub Pages em *Settings > Pages > Deploy from a branch > main*.

## Estrutura
```
index.html   estrutura e conteúdo
style.css    paleta (variáveis CSS), layout e componentes
script.js    acessibilidade, contraste, carrossel, busca, formulários e navegação
```

## Passo a passo da construção
1. **Escolher o tema e o público.** Partimos de um tema pouco genérico: o Cerrado visto por frutos, bichos e pessoas. O público é composto por estudantes e curiosos. O tom é pessoal (primeira pessoa) e a linguagem é simples. Esse tom é uma decisão de branding e de usabilidade ao mesmo tempo.
2. **Definir a paleta como variáveis CSS.** Em style.css, o bloco “TOKENS DE COR” cria as variáveis --bg, --card, --ink, --muted, --pri, --on, --verde, --ipe, --solo e --line. Todos os componentes usam apenas var(--nome). Para mudar a identidade visual basta editar essas linhas. O modo escuro redefine as mesmas variáveis em @media (prefers-color-scheme: dark) e em :root[data-theme="dark"].
3. **Escrever o HTML semântico.** O index.html usa header, nav, main, section, article, form, label e footer. Há um link “Pular para o conteúdo” no topo, lang="pt-BR", títulos em ordem (h1, h2, h3) e atributos ARIA onde o HTML puro não basta (aria-pressed, aria-expanded, role="tablist", aria-live).
4. **Criar o CSS base e os componentes.** Tipografia (Atkinson Hyperlegible no texto e Young Serif nos títulos), grid e flexbox para o layout, botões em formato de pílula, cartões com cantos assimétricos, foco visível com outline de 3 px e media queries para telas pequenas.
5. **Programar o painel de acessibilidade.** O objeto P guarda tema, zoom, alto contraste e “sem animações”. A função aplicar() escreve essas escolhas no elemento <html> (data-theme, data-hc, data-calm e a variável --z, usada no tamanho da fonte). As preferências ficam no localStorage, dentro de try/catch para não quebrar se o navegador bloquear o armazenamento.
6. **Calcular o contraste ao vivo.** A função razao() implementa a fórmula do W3C (luminância relativa). Ela lê as cores com getComputedStyle, calcula a razão para cada par e escreve a tabela na seção Design. Ao trocar o tema, a tabela é recalculada.
7. **Montar o carrossel.** O array CENAS descreve cada slide (título, texto, cores e emoji). A função svg() gera a ilustração e ir() mostra um slide por vez. O carrossel pode ser pausado, pausa sozinho com o mouse ou o foco sobre ele e não roda se a pessoa pediu menos movimento.
8. **Montar a área Explorar.** O array ITENS tem 11 cartões em três categorias. A função lista() filtra por aba e por texto (sem diferenciar acentos, graças a normalize("NFD")) e atualiza o contador de resultados. Os favoritos ficam num Set salvo no localStorage.
9. **Validar formulários.** A função checar() recebe regras (campo, teste, mensagem), escreve a mensagem ao lado do campo, marca aria-invalid e leva o foco ao primeiro erro. O formulário de contato e o de login usam a mesma função. Nenhum dado é enviado: ambos são demonstrações.
10. **Navegar por “páginas” com hash.** Cada link do menu aponta para um hash (#sobre, #explorar, #vida, #cores, #bastidores, #contato, #login). A função rota() lê location.hash, esconde as seções que não pertencem àquela página (atributo hidden e data-page) e marca o item ativo com aria-current="page".
11. **Acrescentar melhorias de interação.** Botão “voltar ao topo”, aviso curto (toast) ao guardar favoritos, animação de entrada com IntersectionObserver e fechamento do painel de acessibilidade com a tecla Esc. Todas respeitam a preferência por menos movimento.
12. **Testar.** Testes feitos: carregamento sem erros no console, troca de páginas, busca, abas e favoritos, mensagens de erro dos formulários, modo escuro, zoom da fonte, alto contraste e telas de 1280 px e 390 px. A tabela de contraste foi conferida com a fórmula do W3C. Ainda vale testar à mão a navegação só por teclado e com leitor de tela.
13. **Publicar no GitHub.** Veja os comandos abaixo e a seção “Apêndice”.

## Registro de versões
- **v1**: Arquivo único (HTML, CSS e JS juntos). Paleta, tema claro/escuro, carrossel, abas de pesquisa, formulários, login e rodapé.
- **v2**: Site separado em index.html, style.css e script.js. Menu por páginas (Início, O Cerrado, Explorar, Vida e preservação, Design, Projeto, Entrar), conteúdo extra, botão voltar ao topo, avisos, animações de entrada e melhorias visuais.
- **v2.1**: Correções: (1) erro de JavaScript que interrompia o script e deixava carrossel, cartões e tabela de contraste vazios; (2) seção Contato com formulário restaurada, com link no menu; (3) texto “\n” solto removido do HTML; (4) título do rodapé com contraste insuficiente no modo escuro (1,34:1) passou a ter 15,71:1.

## Publicar no GitHub
```bash
git init
git add .
git commit -m "feat: versão 2.1 do site Cerrado de Dentro"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/cerrado-de-dentro.git
git push -u origin main
```

## Referências
- W3SCHOOLS. HTML, CSS and JavaScript Tutorials. https://www.w3schools.com/
- STANFORD d.school. Hasso Plattner Institute of Design at Stanford. https://dschool.stanford.edu/
- NIELSEN, J. 10 Usability Heuristics for User Interface Design. Nielsen Norman Group. https://www.nngroup.com/articles/ten-usability-heuristics/
- NIELSEN NORMAN GROUP. Artigos de Jakob Nielsen. https://www.nngroup.com/articles/author/jakob-nielsen/
- THE ODIN PROJECT. Full Stack Development Curriculum. https://www.theodinproject.com/
- GOVERNO FEDERAL. Design System gov.br: fundamentos visuais, cores. https://www.gov.br/ds/fundamentos-visuais/cores?tab=visao-geral
- CODÉDEX. Learn to code. https://www.codedex.io/
- W3C. Web Content Accessibility Guidelines (WCAG) Overview. https://www.w3.org/WAI/standards-guidelines/wcag/
- W3C. Understanding Success Criterion 1.4.3: Contrast (Minimum). https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- WEBAIM. Contrast Checker. https://webaim.org/resources/contrastchecker/
- GOOGLE FONTS. Atkinson Hyperlegible. https://fonts.google.com/specimen/Atkinson+Hyperlegible
- GOOGLE FONTS. Young Serif. https://fonts.google.com/specimen/Young+Serif
- MINISTÉRIO DO MEIO AMBIENTE E MUDANÇA DO CLIMA (via Agência Gov). No Dia do Cerrado, conheça as ações do governo federal para ampliar a conservação do bioma. 2025. https://agenciagov.ebc.com.br/noticias/202509/no-dia-do-cerrado-conheca-as-acoes-do-governo-federal-para-ampliar-a-conservacao-do-bioma
- ICMBIO. Cartilha sobre o Cerrado (berço das águas e “floresta de cabeça para baixo”). https://www.gov.br/icmbio/pt-br/centrais-de-conteudo/publicacoes/publicacoes-diversas/fauna-e-flora/cartilha_diagramacao_final_01Nov.pdf
- NATIONAL GEOGRAPHIC BRASIL. O que é o bioma Cerrado? 2023. https://www.nationalgeographicbrasil.com/meio-ambiente/2023/03/o-que-e-o-bioma-cerrado
- WWF-BRASIL. Livreto sobre o Cerrado (biodiversidade e endemismo). https://wwfbrnew.awsassets.panda.org/downloads/wwf_livretoptfinal.pdf

## Créditos
Feito com apoio de IA (Claude, da Anthropic), estudado e revisado por Enzo Emerick. Ilustrações autorais; ícones são emojis do sistema.
