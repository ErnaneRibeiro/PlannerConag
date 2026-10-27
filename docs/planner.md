# Planner — painel operacional do consultor

O Planner é uma página HTML publicada como **artifact** do Claude (privada para o consultor). Ela concentra agenda, reuniões, checklist, follow-ups e diagnóstico dos clientes. O consultor interage direto na página (marca itens, comenta, sinaliza reunião não realizada) e a página **salva a si mesma** a cada interação. A assistente mantém o conteúdo a partir das fichas, atas, Calendar e Drive.

- Modelo em branco: `planner/planner-modelo.html`
- Link do Planner de cada consultor: `config/consultor.md` → "Link do meu Planner"

---

## Primeira publicação

1. Pedir à assistente: "publique meu Planner a partir do modelo".
2. A assistente publica `planner/planner-modelo.html` como artifact novo (privado) com a capacidade `artifact` (autossalvamento) e grava o link em `config/consultor.md`.
3. A cópia de trabalho local fica em `planner/` (ignorada pelo git).

---

## Abas

| Aba | Conteúdo |
|---|---|
| **Hoje** | Foco recomendado, próximas agendas (semana atual + seguinte), checklist da semana, tarefas administrativas, follow-ups |
| **Agenda** | Grade seg–sex por semana, com horas por reunião e temas do catálogo |
| **Catálogo × Atas** | Cobertura do catálogo de implantação por cliente |
| **Painel Executivo** | Visão consolidada (gerada sob demanda: "Faça meu painel") |
| **Clientes** | Relatório de diagnóstico por cliente, com botão "Gerar PDF" |

---

## Modelo de dados (`<script id="app-state">`)

| Campo | O que guarda | Regras |
|---|---|---|
| `focoRecomendado` | Texto curto do foco do dia | Só o acionável **hoje/nesta semana**. Nada resolvido, nada de semana futura, nada de recapitulação |
| `proximasReunioes[]` | Cards de reunião: `id, data (AAAA-MM-DD), hora, cliente, tipo, cor, resumo, tarefasCliente[], proximosPassos[], pendenciasAnteriores[], implantacao{}` | Ver "Próximas agendas" abaixo |
| `checklistSemana[]` | `id, label, tipo (followup / prazo / sem-agenda), checked, comentario?, futuro?, recorrente?` | Contatos no topo. `futuro:true` = só aparece no modal. `recorrente: {frequencia:"quinzenal-segunda", ancora, ultimoCiclo}` reabre sozinho |
| `adminTasks[]` | Tarefas administrativas do consultor | — |
| `followups[]` | `id, cliente, ultimoContato, ultimaNota, proximo` | — |
| `catalogTasks[]` | Status por cliente no catálogo: `codigo, titulo, cliente, status (done/prog), data` | — |
| `reunioesNaoRealizadas[]` | Gerado pelo botão "Sinalizar que a reunião não ocorreu": `id, cliente, data, hora, motivo, registradoEm, processado` | A assistente processa (`processado:true`) e atualiza a ficha |
| `clientes[]` | Diagnóstico por cliente: resumo, resumo executivo, papéis, objetivos, diagnóstico + riscos, categoria (mine/other/finished) | Sincronizado **uma vez por semana** (segunda), por síntese das fichas — não extração literal |
| `correlacoesAjustes{}` | Ajustes manuais do consultor nos vínculos ponto × catálogo, por cliente | **Nunca sobrescrever** |

Outros blocos:
- `<script id="catalogo-ref">`: catálogo vigente (código, título, épico, macro-módulo), derivado de `catalogo/tarefas_e_modulos.xlsx` (tarefas **sem** X na coluna "APAGAR").
- `var WEEKS` (no script principal): grade de agenda. No modelo, começa com a semana atual calculada pela data; a assistente acrescenta semanas e eventos (`dia, h, dur, t, sub, cor, horas, notaHoras, temas[]`).
- `var COVERAGE`: barras da aba Catálogo × Atas.
- Painel Executivo: HTML estático dentro de um `iframe srcdoc` — não se atualiza sozinho.

---

## Próximas agendas (`proximasReunioes`)

- Varrer o Calendar **completo** (listar eventos, não busca semântica) do dia de hoje até o fim da semana seguinte; todo evento de cliente vira (ou já tem) um card. Eventos internos da CONAG não entram.
- **Um card por agenda** — nunca juntar duas datas num card.
- Sempre em **ordem cronológica** (data, depois hora).
- Campo `data` em ISO; o rótulo "Hoje / Amanhã / dia da semana" é calculado pela página — nunca escrever à mão.
- Só reuniões com **data e hora reais**. "A combinar" vira item do checklist (`tipo: "sem-agenda"`).
- Card **não sai por data passada**. Sai só se (a) a assistente encontrar a transcrição e confirmar que a reunião ocorreu, ou (b) o consultor clicar em "Sinalizar que a reunião não ocorreu".
- Cada card traz: resumo da última reunião, tarefas do cliente, sugestão de próximos passos, pendências da reunião anterior e o **cruzamento com o catálogo** (abaixo).

### Cruzamento ponto da reunião × catálogo
`implantacao: {referencia, pontos: [{id, tipo: "d" | "p", ponto, status, vinculos: [códigos]}]}`
- `d` = discutido na última reunião; `p` = próximo ponto (pendências/próximos passos).
- Vínculos sugeridos por **proximidade de assunto** com título + épico + macro-módulo do catálogo vigente.
- `status`: done, prog, reaberta, bloq, parado.
- O consultor remove/adiciona vínculos no modal; o ajuste vai para `correlacoesAjustes[cliente][pontoId]` e vale **só para aquele cliente**. Ao regenerar, reaproveitar o mesmo `id` de ponto para o ajuste continuar valendo.

---

## Protocolo "atualizar o planner" (sempre completo)

1. Checar a data real de hoje.
2. Para reuniões de ontem/hoje ainda sem confirmação: buscar no Calendar e no Drive se ocorreram (ver `docs/regras-operacionais.md`, 1.1).
3. Confirmada: escrever a ata e atualizar a ficha **antes** de mexer no Planner.
4. Atualizar o card com dados reais (hora, duração do marcador "encerrada após", temas do catálogo).
5. Varrer o Calendar completo (semana atual + seguinte) e acertar `proximasReunioes`.
6. Processar `reunioesNaoRealizadas` pendentes.
7. **Ler a versão ao vivo do Planner antes de publicar** e mesclar: nunca apagar check, comentário ou ajuste feito pelo consultor.
8. Avançar todas as referências de "hoje" — inclusive o Painel Executivo e qualquer data fixa no HTML (procurar datas no arquivo inteiro, não só no estado).
9. Não misturar prazo com reunião na mesma lista.
10. Atualizar o foco recomendado (enxuto).
11. Validar (JSON do estado, sintaxe do script, iframe) e **publicar uma vez só**, completo.

Quando o consultor interage na página (notificação de artifact alterado), rodar este protocolo por iniciativa própria.

---

## Rotina semanal ligada ao Planner

- **Segunda (ou domingo):** organizar a agenda da semana; sincronizar a aba Clientes com as fichas.
- **Sexta:** fechamento da semana — por cliente com atividade, sugerir status por item do catálogo (para copiar na tela de projetos do portal), lembrar o apontamento de horas e listar o que foi tratado.
- **Toda manhã:** atas novas → fichas; depois pendências e pauta das reuniões do dia.

---

## Manutenção do modelo (para quem mantém o kit)

Se o código do Planner evoluir, regenerar o modelo em branco a partir de um Planner preenchido:

```bash
cd ferramentas
npm install
node gerar-planner-modelo.js <planner-preenchido.html> ../planner/planner-modelo.html
```

O script zera o estado, troca a grade de semanas pela semana atual, mantém o Painel Executivo com o **mesmo layout e CSS** trocando os dados por marcadores (`[Cliente]`, `—`, um exemplo por estilo de item) e limpa todo conteúdo que a página salvou de si mesma. CSS e JavaScript do Planner ficam **idênticos** ao original — o layout é exatamente o mesmo. **Antes de subir para o GitHub**, procurar no arquivo gerado por nomes de clientes e pessoas — o script cobre os pontos conhecidos, mas código novo pode trazer dados fixos novos.
