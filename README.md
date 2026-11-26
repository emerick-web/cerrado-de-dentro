#🌼 Cerrado de Dentro

Frutos, bichos e gente do coração do Brasil.

Site educativo e acolhedor sobre o Cerrado brasileiro, feito como projeto final da disciplina Desenvolvimento de Interfaces 2/2026 (CEUB), com o professor Dr. Felipe Batista da Silva.

Autor: Enzo Emerick
Site online: https://emerick-web.github.io/cerrado-de-dentro/
Repositório: https://github.com/emerick-web/cerrado-de-dentro
Versão atual: 2.1
Sobre o projeto

O Cerrado costuma ser lembrado só como "mato seco". O Cerrado de Dentro parte da ideia contrária: o bioma tem nome, sabor e gente. Em vez de um texto distante e enciclopédico, o site apresenta os frutos, os bichos e as comunidades que fazem parte do Cerrado, em primeira pessoa e com linguagem simples, como uma conversa.

O projeto também é uma demonstração de interface acessível. A página Design mostra a paleta de cores, o significado de cada cor e uma tabela de contraste WCAG que é calculada ao vivo no navegador.

Para quem é

Estudantes e pessoas curiosas que querem conhecer o Cerrado, e quem avalia o projeto e quer ver na prática WCAG, heurísticas de Nielsen e psicologia das cores aplicadas a um site real.

O tema: o Cerrado

O tema foi escolhido por ser pouco genérico e por render um site humano e cheio de cor.

O Cerrado ocupa cerca de um quarto do território brasileiro e abriga mais de 12 mil espécies de plantas. São valores aproximados, que variam um pouco entre as fontes.
É chamado de berço das águas, porque dele nascem rios de grandes bacias brasileiras.
É chamado de floresta de cabeça para baixo, porque muitas plantas investem mais nas raízes, que descem metros no solo, do que na parte de cima.
Boa parte da vegetação nativa já virou pasto e lavoura, por isso conhecer é o primeiro passo para proteger.

O conteúdo do site se divide em três grupos:

Frutos: pequi, baru, buriti e cagaita.
Bichos: lobo-guará, tamanduá-bandeira e ema.
Gente: povos indígenas, quilombolas, apanhadoras de flores sempre-vivas e geraizeiros.
Páginas do site

O site tem uma única página HTML, e o menu troca a seção exibida sem recarregar.

Início: apresentação em primeira pessoa e carrossel de cenas do Cerrado.
O Cerrado: três cartões explicativos (berço das águas, raízes, gente que cuida) e textos de apoio.
Explorar: abas por categoria, busca sem acento e botão "Guardar" para favoritos.
Vida e preservação: plantas, animais, água, ameaças e atitudes.
Design: paleta, psicologia das cores e contraste WCAG ao vivo.
Projeto: decisões de design ligadas às heurísticas de Nielsen.
Contato: formulário com validação.
Entrar: página de login.
Recursos
Painel de acessibilidade: modo claro/escuro, letra de 100% a 150%, alto contraste e "sem animações", com as escolhas salvas no navegador. A tecla Esc fecha o painel.
Carrossel com quatro cenas em SVG, botões de anterior, próximo e pausa, e respeito a quem prefere menos movimento.
Abas de pesquisa e cartões: 11 cartões, busca que ignora acentos e setas do teclado para trocar de aba.
Favoritos guardados no localStorage, com contador no menu e aviso rápido.
Cartões explicativos nas páginas O Cerrado e Vida e preservação.
Formulários de contato e de login com mensagens de erro ao lado do campo. São demonstrações: nada é enviado.

Limitações
O formulário de contato e o login são demonstrações: não há servidor, e nenhum dado é enviado ou guardado.
Sem internet, as fontes caem para as de reserva, e o layout continua funcionando.
Os emojis variam de aparência em cada aparelho.
A navegação só por teclado e com leitor de tela ainda precisa ser testada manualmente.

Próximos passos: página de ajuda, fotografias reais com texto alternativo, teste de usabilidade com pessoas do público e um back-end simples para o contato.

Referências
W3Schools: HTML, CSS e JavaScript
Stanford d.school: design centrado nas pessoas
Nielsen Norman Group: 10 heurísticas de usabilidade
Nielsen Norman Group: artigos de Jakob Nielsen
The Odin Project
Design System do Governo Federal: cores
Codédex
W3C: WCAG
WebAIM Contrast Checker
Google Fonts: Atkinson Hyperlegible e Young Serif
Contraste ao vivo: a tabela da página Design é recalculada quando o tema muda.
Rodapé com referências e créditos.
Extras: link "Pular para o conteúdo", botão "voltar ao topo" e animação suave de entrada
