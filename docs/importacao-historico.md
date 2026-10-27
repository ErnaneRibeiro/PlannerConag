# Importação do histórico (primeira carga) e varreduras

> Como a assistente monta as fichas a partir das transcrições do Google Drive. Os parâmetros vêm de `config/consultor.md` → seção "Busca de histórico".

---

## Parâmetros que o consultor define

| Parâmetro | Opções | Padrão sugerido |
|---|---|---|
| **Fonte** | Só "Meu Drive" / Meu Drive + "Compartilhados comigo" | Só Meu Drive na primeira carga; compartilhados depois |
| **Data de corte geral** | Uma data (AAAA-MM-DD) ou "sem corte" | Início do contrato mais antigo ainda ativo |
| **Modo** | **Por cliente** (um por vez, com confirmação) ou **Tudo de uma vez** | Por cliente |
| **Corte por cliente** | Data específica para um cliente (sobrepõe a geral) | — |
| **Clientes a ignorar** | Lista de nomes | Cancelados, reuniões internas que não interessam |

A data de corte vale para **todas** as varreduras futuras até o consultor mudar.

---

## Fluxo da primeira carga

### Passo 1 — Inventário (só metadados)
Buscar as transcrições/anotações no Drive dentro do corte (Google Docs, por título e data de criação), **sem ler conteúdo**. Agrupar por cliente provável (pelo título do evento: nome do cliente, da fazenda ou do contato). Apresentar ao consultor:

| Cliente provável | Nº de reuniões | Período (primeira → última) | Observação |
|---|---|---|---|

Itens sem cliente claro vão para uma lista à parte, para o consultor dizer de quem são (ou se são internos/ignorar).

### Passo 2 — Consultor confirma o mapa
- Quais clientes importar, na ordem desejada.
- Correções de agrupamento (ex.: mesmo cliente com dois nomes).
- Cortes específicos por cliente, se houver.

### Passo 3 — Integração
**Modo "Por cliente" (recomendado):**
1. Para o cliente da vez: um agente por reunião, em paralelo, gerando `projetos/<Cliente>/atas/AAAA-MM-DD.md` (modelo em `projetos/_template/atas/_modelo-ata.md`).
2. Consolidar a ficha `projetos/<Cliente>/<Cliente>.md` (tarefas, pendências por responsável, riscos, reuniões, próximos passos).
3. **Perguntar ao consultor o "geral" do cliente** (avaliação dele, contexto não escrito em ata) e registrar na ficha.
4. Mostrar um resumo curto e **perguntar se segue para o próximo cliente**.

**Modo "Tudo de uma vez":** mesmo processo para todos os clientes confirmados, e no fim uma lista de perguntas do "geral" de cada cliente.

### Passo 4 — Planner
Com as fichas prontas: popular a aba Clientes, as próximas agendas (Calendar da semana atual + seguinte), o checklist da semana e os follow-ups. Ver `docs/planner.md`.

---

## Varreduras recorrentes (depois da primeira carga)

- **Toda manhã** (rotina "Bom dia"): buscar transcrições novas desde a última varredura e atualizar as fichas antes de montar o painel do dia.
- **"Compartilhados comigo"** (se ativado): listar só os arquivos novos de outros proprietários desde a data de corte que ainda não estão em `projetos/_compartilhados/registro.md` → pedir decisão (Incorporar / Só consulta / Ignorar) → registrar. Ver `docs/regras-operacionais.md`, seção 3.
- Reunião citada como ocorrida mas sem transcrição → procurar também nos compartilhados (o organizador pode ter sido outra pessoa) e perguntar se foi gravada em outra ferramenta (ex.: Tactiq).

---

## Como mudar os parâmetros depois

Basta dizer à assistente, por exemplo:
- "Mude a data de corte para 01/06/2026"
- "Passe a incluir os compartilhados comigo"
- "Importe agora o cliente X a partir de março"

A assistente atualiza `config/consultor.md` e confirma o que mudou.
