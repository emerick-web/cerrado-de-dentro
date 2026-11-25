
/* ===== Utilidades ===== */
const $=(s,e=document)=>e.querySelector(s), $$=(s,e=document)=>[...e.querySelectorAll(s)];
const R=document.documentElement;
// localStorage protegido: se o navegador bloquear, o site continua funcionando
const mem={
  get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch{return d}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}
};

/* ===== Acessibilidade: tema, tamanho da letra, alto contraste, animações ===== */
const P=Object.assign({tema:null,z:1,hc:false,calm:false},mem.get('prefs',{}));
const escuro=()=>(R.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'))==='dark';
function aplicar(){
  if(P.tema)R.dataset.theme=P.tema;
  R.style.setProperty('--z',P.z);
  R.toggleAttribute('data-hc',P.hc); R.toggleAttribute('data-calm',P.calm);
  $('#tema').setAttribute('aria-pressed',escuro());
  $('#hc').setAttribute('aria-pressed',P.hc); $('#calm').setAttribute('aria-pressed',P.calm);
  $('#zv').textContent=Math.round(P.z*100)+'%';
  mem.set('prefs',P); contraste();
}
$('#abtn').onclick=e=>{const p=$('#a11y');p.hidden=!p.hidden;e.currentTarget.setAttribute('aria-expanded',!p.hidden)};
$('#tema').onclick=()=>{P.tema=escuro()?'light':'dark';aplicar()};
$('#hc').onclick=()=>{P.hc=!P.hc;aplicar()};
$('#calm').onclick=()=>{P.calm=!P.calm;aplicar();auto()};
$('#mais').onclick=()=>{P.z=Math.min(1.5,+(P.z+.125).toFixed(3));aplicar()};
$('#menos').onclick=()=>{P.z=Math.max(1,+(P.z-.125).toFixed(3));aplicar()};
matchMedia('(prefers-color-scheme: dark)').onchange=aplicar;

/* ===== Contraste WCAG calculado ao vivo =====
   Fórmula do W3C: luminância relativa de cada cor, depois (L1+0,05)/(L2+0,05). */
const lum=h=>{const [r,g,b]=[1,3,5].map(i=>{const c=parseInt(h.slice(i,i+2),16)/255;return c<=.03928?c/12.92:((c+.055)/1.055)**2.4});return .2126*r+.7152*g+.0722*b};
const razao=(a,b)=>{const [x,y]=[lum(a),lum(b)].sort((p,q)=>q-p);return (x+.05)/(y+.05)};
const PARES=[['Texto principal × fundo','--ink','--bg'],['Texto secundário × cartão','--muted','--card'],['Texto do botão × roxo','--on','--pri'],['Links roxos × fundo','--pri','--bg'],['Verde × fundo','--verde','--bg'],['Terra (avisos) × cartão','--solo','--card'],['Amarelo × fundo (só decoração)','--ipe','--bg']];
function contraste(){
  const cs=getComputedStyle(R),v=n=>cs.getPropertyValue(n).trim();
  $('#tb').innerHTML=PARES.map(([t,a,b])=>{
    const r=razao(v(a),v(b));
    const n=r>=7?'AAA ✓':r>=4.5?'AA ✓':r>=3?'Só texto grande ou ícones':'✗ Não usar em texto';
    return `<tr><td>${t}</td><td>${v(a)} / ${v(b)}</td><td>${r.toFixed(2).replace('.',',')}:1</td><td>${n}</td></tr>`;
  }).join('');
}

/* ===== Carrossel (imagens em SVG, sem arquivos externos) ===== */
const CENAS=[
 {t:'Ipê em flor',d:'No fim da seca, os ipês florescem de repente e pintam o Cerrado de amarelo, roxo e rosa.',sky:'#F7D774',sun:'#FFF3C4',h1:'#9BB26B',h2:'#5E8A4A',e:'🌳'},
 {t:'Veredas e buritis',d:'Onde há buritis costuma haver água por perto: as veredas guardam nascentes.',sky:'#9CCDE8',sun:'#FFFFFF',h1:'#7FB08A',h2:'#3F7A52',e:'🌴'},
 {t:'Campo dourado',d:'Na seca o capim dourece, mas por baixo a raiz segue viva.',sky:'#F2B880',sun:'#FFE9B0',h1:'#D9B45A',h2:'#A98532',e:'🌾'},
 {t:'Lobo-guará ao entardecer',d:'Símbolo do Cerrado, o lobo-guará anda sozinho ao fim do dia e adora o fruto da lobeira.',sky:'#8E6FB5',sun:'#FFD27A',h1:'#6D5A8A',h2:'#3E3358',e:'🐺'}
];
const svg=c=>`<svg viewBox="0 0 600 240" role="img" aria-label="Ilustração: ${c.t}"><rect width="600" height="240" fill="${c.sky}"/><circle cx="480" cy="70" r="34" fill="${c.sun}"/><path d="M0 170Q150 120 300 165T600 150V240H0Z" fill="${c.h1}"/><path d="M0 205Q180 170 340 205T600 195V240H0Z" fill="${c.h2}"/><text x="140" y="180" font-size="96" aria-hidden="true">${c.e}</text></svg>`;
$('#slides').innerHTML=CENAS.map((c,i)=>`<figure class="slide" role="group" aria-roledescription="slide" aria-label="${i+1} de ${CENAS.length}">${svg(c)}<figcaption><strong>${c.t}.</strong> ${c.d}</figcaption></figure>`).join('');
$('#dots').innerHTML=CENAS.map((c,i)=>`<button aria-label="Ir para o slide ${i+1}"></button>`).join('');
let atual=0,tm,pausado=matchMedia('(prefers-reduced-motion: reduce)').matches;
function ir(n){
  atual=(n+CENAS.length)%CENAS.length;
  $$('.slide').forEach((s,k)=>s.classList.toggle('on',k===atual));
  $$('#dots button').forEach((b,k)=>k===atual?b.setAttribute('aria-current','true'):b.removeAttribute('aria-current'));
}
function auto(){ // roda sozinho só se a pessoa permitir (WCAG 2.2.2: poder pausar)
  clearInterval(tm);
  const toca=!pausado&&!P.calm;
  if(toca)tm=setInterval(()=>ir(atual+1),6000);
  $('#pp').textContent=toca?'Pausar':'Reproduzir';
  $('#slides').setAttribute('aria-live',toca?'off':'polite');
}
$('#prev').onclick=()=>ir(atual-1); $('#next').onclick=()=>ir(atual+1);
$('#pp').onclick=()=>{pausado=!pausado;auto()};
$$('#dots button').forEach((b,k)=>b.onclick=()=>ir(k));
const car=$('#car');
car.onmouseenter=car.onfocusin=()=>clearInterval(tm); car.onmouseleave=car.onfocusout=auto;

/* ===== Explorar: abas + pesquisa + favoritos ===== */
const ITENS=[
 ['Pequi','frutos','🟡','Perfumado e marcante, vai no arroz e no frango. Cuidado: dentro do caroço há espinhos, então se come roendo, não mordendo.'],
 ['Baru','frutos','🌰','A castanha do baru é crocante e nutritiva. Colher e vender baru ajuda famílias do Cerrado e mantém a árvore em pé.'],
 ['Buriti','frutos','🌴','O fruto alaranjado vira doce, suco e sorvete. A palmeira costuma marcar lugares com água por perto.'],
 ['Cagaita','frutos','🍋','Fruta ácida e refrescante, ótima em suco. Aparece na virada da seca para a chuva.'],
 ['Lobo-guará','bichos','🐺','O maior canídeo da América do Sul. As pernas longas ajudam a enxergar acima do capim alto.'],
 ['Tamanduá-bandeira','bichos','🐾','Não tem dentes: a língua comprida recolhe cupins e formigas. O rabo largo serve de cobertor.'],
 ['Ema','bichos','🐦','A maior ave do Brasil não voa, mas corre rápido. É o pai quem cuida dos ovos e dos filhotes.'],
 ['Povos indígenas','gente','🌱','Habitam o Cerrado há milênios e guardam saberes sobre plantas, fogo e água.'],
 ['Quilombolas','gente','🏡','Comunidades que mantêm roças, festas e saberes de origem africana, protegendo o território.'],
 ['Apanhadoras de flores','gente','🌼','Colhem à mão, no tempo certo, flores sempre-vivas: secas, continuam bonitas e viram artesanato.'],
 ['Geraizeiros','gente','🌳','Moradores dos gerais do norte de Minas que plantam e colhem frutos nativos.']
];
let aba='todos',busca='';
const favs=new Set(mem.get('favs',[]));
const sem=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(); // busca sem acento
function lista(foco){
  const r=ITENS.filter(([n,c,e,t])=>(aba==='todos'||c===aba)&&sem(n+' '+t).includes(sem(busca)));
  $('#cards').innerHTML=r.map(([n,c,e,t])=>`<li class="item" data-c="${c}"><h3><span aria-hidden="true">${e}</span> ${n}</h3><p>${t}</p><button class="btn alt sm" aria-pressed="${favs.has(n)}" data-n="${n}"><span aria-hidden="true">${favs.has(n)?'♥':'♡'}</span> Guardar</button></li>`).join('');
  $('#cont').textContent=r.length?`${r.length} resultado(s) na aba “${$('[aria-selected=true]',$('#tabs')).textContent}”.`:'Nada encontrado. Tente outra palavra ou volte para “Todos”.';
  $('#favs').textContent='♥ '+favs.size;
  if(foco)$(`#cards [data-n="${foco}"]`)?.focus();
}
$('#cards').onclick=e=>{
  const b=e.target.closest('button'); if(!b)return;
  const n=b.dataset.n; favs.has(n)?favs.delete(n):favs.add(n);
  mem.set('favs',[...favs]); lista(n);
};
$('#q').oninput=e=>{busca=e.target.value;lista()};
const abas=$$('[role=tab]',$('#tabs'));
function escolher(b){
  abas.forEach(x=>{x.setAttribute('aria-selected',x===b);x.tabIndex=x===b?0:-1});
  aba=b.dataset.a; lista();
}
abas.forEach((b,k)=>{
  b.onclick=()=>escolher(b);
  b.onkeydown=e=>{ // setas do teclado trocam de aba
    const d={ArrowRight:1,ArrowLeft:-1}[e.key]; if(!d)return;
    const p=abas[(k+d+abas.length)%abas.length]; escolher(p); p.focus();
  };
});

/* ===== Formulários com validação acessível ===== */
const EMAIL=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function checar(f,regras){
  let ok=true,primeiro;
  for(const [id,teste,msg] of regras){
    const el=f.elements[id],bom=teste(el);
    $('#e-'+id).textContent=bom?'':'⚠ '+msg; // o ícone evita depender só da cor
    el.setAttribute('aria-invalid',!bom);
    if(!bom){ok=false;primeiro??=el}
  }
  primeiro?.focus(); return ok;
}
$('#fc').onsubmit=e=>{
  e.preventDefault(); $('#st').textContent='';
  const f=e.target;
  if(checar(f,[['nome',v=>v.value.trim().length>=3,'Digite seu nome (3 letras ou mais).'],['email',v=>EMAIL.test(v.value),'Use um e-mail como nome@exemplo.com.'],['msg',v=>v.value.trim().length>=10,'Escreva pelo menos 10 caracteres.'],['aceito',v=>v.checked,'Marque a caixa para continuar.']])){
    $('#st').textContent='Mensagem recebida (demonstração). Valeu pela conversa!'; f.reset();
  }
};
$('#fl').onsubmit=e=>{
  e.preventDefault(); $('#lst').textContent='';
  if(checar(e.target,[['lemail',v=>EMAIL.test(v.value),'Use um e-mail como nome@exemplo.com.'],['lsenha',v=>v.value.length>=6,'A senha precisa de pelo menos 6 caracteres.']]))
    $('#lst').textContent='Você entrou em modo demonstração: nada foi enviado nem salvo.';
};
$('#ver').onchange=e=>$('#lsenha').type=e.target.checked?'text':'password';

/* ===== Navegação por abas: cada opção mostra uma página do site ===== */
function rota(){
  const destino = location.hash.replace('#','') || 'inicio';
  const login = destino === 'login';
  $('#home').hidden = login;
  $('#login').hidden = !login;

  if (!login) {
    const paginas = ['inicio','sobre','explorar','vida','cores','bastidores','contato'];
    const alvo = paginas.includes(destino) ? destino : destino;
    const existe = document.querySelector(`[data-page="${alvo}"]`);
    const paginaFinal = existe ? alvo : 'inicio';
    document.querySelectorAll('#home [data-page]').forEach(secao => {
      secao.hidden = secao.dataset.page !== paginaFinal;
    });
    document.querySelectorAll('nav .page-tab').forEach(link => {
      const ativo = link.getAttribute('href') === `#${destino}` ||
        (paginaFinal === 'inicio' && link.getAttribute('href') === '#inicio');
      if (ativo) link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current');
    });
  } else {
    document.querySelectorAll('nav .page-tab').forEach(link => {
      if (link.getAttribute('href') === '#login') link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current');
    });
  }
  window.scrollTo({top:0, behavior:'auto'});
  if (login) $('#lemail').focus();
}
addEventListener('hashchange',rota);

/* ===== Início ===== */
ir(0); aplicar(); lista(); rota(); auto();


/* ===== Interações extras ===== */
(() => {
  // Botão voltar ao topo
  const topo = document.createElement('button');
  topo.id = 'topo';
  topo.type = 'button';
  topo.setAttribute('aria-label', 'Voltar ao topo');
  topo.textContent = '↑';
  document.body.appendChild(topo);
  const atualizarTopo = () => topo.classList.toggle('show', window.scrollY > 500);
  window.addEventListener('scroll', atualizarTopo, { passive: true });
  topo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  atualizarTopo();

  // Mensagens rápidas sem interromper a navegação
  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);
  let toastTimer;
  window.mostrarAviso = (mensagem) => {
    toast.textContent = mensagem;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  };

  // Animação discreta de entrada ao rolar a página
  const blocos = document.querySelectorAll('main section, footer .wrap > *');
  blocos.forEach((el) => el.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    blocos.forEach((el) => observer.observe(el));
  } else {
    blocos.forEach((el) => el.classList.add('visible'));
  }

  // Fecha o painel de acessibilidade com Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const painel = document.getElementById('a11y');
      const botao = document.getElementById('abtn');
      if (painel && !painel.hidden) {
        painel.hidden = true;
        botao?.setAttribute('aria-expanded', 'false');
        botao?.focus();
      }
    }
  });

  // Melhora a resposta visual ao guardar favoritos
  const cards = document.getElementById('cards');
  cards?.addEventListener('click', (event) => {
    if (event.target.closest('button[data-n]')) {
      const nome = event.target.closest('button[data-n]').dataset.n;
      window.mostrarAviso(`"${nome}" atualizado nos seus favoritos.`);
    }
  });
})();
