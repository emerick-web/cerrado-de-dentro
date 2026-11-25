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


## Estrutura
```
index.html   estrutura e conteúdo
style.css    paleta (variáveis CSS), layout e componentes
script.js    acessibilidade, contraste, carrossel, busca, formulários e navegação
```


## Registro de versões
- **v1**: Arquivo único (HTML, CSS e JS juntos). Paleta, tema claro/escuro, carrossel, abas de pesquisa, formulários, login e rodapé.
- **v2**: Site separado em index.html, style.css e script.js. Menu por páginas (Início, O Cerrado, Explorar, Vida e preservação, Design, Projeto, Entrar), conteúdo extra, botão voltar ao topo, avisos, animações de entrada e melhorias visuais.
- **v2.1**: Correções: (1) erro de JavaScript que interrompia o script e deixava carrossel, cartões e tabela de contraste vazios; (2) seção Contato com formulário restaurada, com link no menu; (3) texto “\n” solto removido do HTML; (4) título do rodapé com contraste insuficiente no modo escuro (1,34:1) passou a ter 15,71:1.


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


