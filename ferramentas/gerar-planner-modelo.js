// Gera planner-modelo.html (sem dados) a partir do Planner ao vivo.
const fs = require('fs');
const { JSDOM } = require('jsdom');
const [, , SRC, OUT] = process.argv;
let h = fs.readFileSync(SRC, 'utf8');

// 1) Estado vazio
const EMPTY = {
  focoRecomendado: '',
  proximasReunioes: [],
  checklistSemana: [],
  adminTasks: [],
  followups: [],
  catalogTasks: [],
  reunioesNaoRealizadas: [],
  clientes: [],
  correlacoesAjustes: {}
};
h = h.replace(/(<script type="application\/json" id="app-state">)[\s\S]*?(<\/script>)/,
  (a, b, e) => b + JSON.stringify(EMPTY, null, 2) + e);

// 2) Grade de semanas: uma semana gerada a partir da data real, sem eventos
const weeksStart = h.indexOf('var WEEKS = [');
const weeksEnd = h.indexOf('var HOJE_WEEK_INDEX');
if (weeksStart < 0 || weeksEnd < 0) throw new Error('WEEKS não encontrado');
const hojeLineEnd = h.indexOf('\n', weeksEnd);
const WEEKS_NOVO = `/* WEEKS: grade de agenda (seg-sex). No modelo começa só com a semana atual, calculada
   pela data real do navegador. A assistente acrescenta semanas e eventos ao atualizar o Planner. */
var WEEKS = (function(){
  var MESES = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  var d = new Date(); d.setHours(0,0,0,0);
  var dow = d.getDay(); var seg = new Date(d); seg.setDate(d.getDate() - ((dow + 6) % 7));
  var datas = [], sex;
  for (var i = 0; i < 5; i++) { var x = new Date(seg); x.setDate(seg.getDate() + i); datas.push(String(x.getDate()).padStart(2,'0')); sex = x; }
  var label = datas[0] + (seg.getMonth() !== sex.getMonth() ? ' de ' + MESES[seg.getMonth()] : '') + ' – ' + datas[4] + ' de ' + MESES[sex.getMonth()] + ' de ' + sex.getFullYear();
  return [{ label: label, datas: datas, hoje: null, events: [] }];
})();
var HOJE_WEEK_INDEX = 0;`;
h = h.slice(0, weeksStart) + WEEKS_NOVO + h.slice(hojeLineEnd);

// 3) Painel Executivo (iframe estático): MESMO layout e CSS, dados trocados por marcadores
h = h.replace(/(<iframe srcdoc=")([\s\S]*?)(")/, (a, b, src, e) => {
  const raw = src.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  const pd = new JSDOM(raw); const p = pd.window.document;
  const set = (sel, html) => p.querySelectorAll(sel).forEach(el => { el.innerHTML = html; });
  set('.masthead__meta', '<strong>[Nome do consultor]</strong>\n      Atualizado em [DD/MM/AAAA] · [dia da semana]. [Resumo da agenda do dia]');
  p.querySelectorAll('.kpi__value').forEach(el => { el.textContent = '—'; });
  p.querySelectorAll('.kpi__label').forEach(el => { el.textContent = el.textContent.replace(/\s*\([^)]*\)/g, '').trim(); });
  // listas de risco: um exemplo de cada nível de gravidade
  p.querySelectorAll('.risk-list').forEach(list => {
    const vistos = new Set();
    [...list.children].forEach(r => {
      const sev = [...r.classList].find(c => c.startsWith('sev-')) || 'x';
      if (vistos.has(sev)) { r.remove(); return; }
      vistos.add(sev);
      const n = r.querySelector('.risk__name'); if (n) n.textContent = '[Cliente]';
      const dsc = r.querySelector('.risk__desc'); if (dsc) dsc.textContent = '[Descrição do risco — preenchida pela assistente a partir das fichas]';
    });
  });
  p.querySelectorAll('ol.actions').forEach(ol => {
    [...ol.children].forEach((li, i) => { if (i > 0) li.remove(); else li.innerHTML = '<span><strong>[Prioridade — Cliente]</strong>: [ação recomendada]</span>'; });
  });
  p.querySelectorAll('h2').forEach(el => { el.textContent = el.textContent.replace(/semana de .*/, 'semana de [DD/MM–DD/MM]'); });
  const dias = [...p.querySelectorAll('.agenda-day')];
  dias.forEach((day, i) => {
    if (i > 0) { day.remove(); return; }
    const lbl = day.querySelector('.agenda-day__label'); if (lbl) lbl.textContent = '[Dia (DD/MM)]';
    [...day.querySelectorAll('.agenda-item')].forEach((it, j) => {
      if (j > 0) { it.remove(); return; }
      const t = it.querySelector('time'); if (t) t.textContent = '[hora]';
      const ti = it.querySelector('.agenda-item__title'); if (ti) ti.textContent = '[Cliente]';
      const no = it.querySelector('.agenda-item__note'); if (no) no.textContent = '[Tipo de reunião]';
    });
  });
  set('.focus-callout p', '[Foco recomendado — preenchido pela assistente]');
  const spans = p.querySelectorAll('footer span'); if (spans.length > 1) spans[spans.length - 1].textContent = '[DD/MM/AAAA]';
  const out = pd.serialize();
  return b + out.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + e;
});

// 3b) Dados fixos no código
h = h.replace(/var COVERAGE = \[[\s\S]*?\];/, 'var COVERAGE = []; /* preenchido pela assistente: {c:"Cliente", done:n, prog:n, na:n} */');
h = h.replace(/mine: 'Cliente sob acompanhamento direto de [^']*'/, "mine: 'Cliente sob acompanhamento direto do consultor'");
h = h.replace(/stroke-dasharray="[\d.]+ [\d.]+"/, 'stroke-dasharray="0 264"');
h = h.replace(/>\d+%<\/text>/, '>0%</text>').replace(/>\d+ de \d+<\/text>/, '>0 de 0</text>');
h = h.replace(/>\d+ clientes<\/div>/, '>0 clientes</div>').replace(/mapeados até agora — \d+ restantes/, 'mapeados até agora');
h = h.replace(/(line-height:1\.9;font-weight:600">)[^<]*(<\/div>)/, '$1$2');

h = h.replace(/ · atualizado em \d{2}\/\d{2}\/\d{4}/, '');

// 4) Limpar o conteúdo que a página salvou de si mesma (containers preenchidos via JS)
const scripts = [...h.matchAll(/<script(?![^>]*application\/json)[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');
const ids = new Set();
for (const m of scripts.matchAll(/getElementById\('([\w-]+)'\)\.(innerHTML|textContent|value)\s*=/g)) ids.add(m[1]);
for (const m of scripts.matchAll(/var\s+(\w+)\s*=\s*document\.getElementById\('([\w-]+)'\)/g)) {
  const v = m[1], id = m[2];
  if (new RegExp('\\b' + v + '\\.(innerHTML|textContent)\\s*=').test(scripts)) ids.add(id);
}
for (const m of scripts.matchAll(/renderCheck\([^,]+,\s*'([\w-]+)'(?:,\s*'([\w-]+)')?/g)) { ids.add(m[1]); if (m[2]) ids.add(m[2]); }
const dom = new JSDOM(h);
const doc = dom.window.document;
const limpos = [];
for (const id of ids) {
  const el = doc.getElementById(id);
  if (!el || el.tagName === 'SCRIPT') continue;
  if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') { el.removeAttribute('value'); el.textContent = ''; }
  else el.innerHTML = '';
  limpos.push(id);
}
// overlays de modal fechados
doc.querySelectorAll('.modal-overlay.open').forEach(e => e.classList.remove('open'));
const printArea = doc.querySelector('.print-area'); if (printArea) printArea.innerHTML = '';

fs.writeFileSync(OUT, dom.serialize());
console.log('ids limpos:', limpos.join(', '));
