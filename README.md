# Kit Nina CONAG

**Assistente executiva de implantação e gestão para consultores CONAG**, rodando no Claude Code.

O kit transforma o Claude numa camada de controle operacional sobre o trabalho do consultor. Ela garante coerência entre:

**AGENDA → REUNIÕES → ATAS → TAREFAS → PROJETOS → ETAPAS DA IMPLANTAÇÃO → HORAS → PENDÊNCIAS → PRÓXIMOS PASSOS**

O modelo nasceu do uso real de um consultor entre agosto e outubro de 2026 e foi validado pela equipe de projetos para teste com todos os consultores.

---

## O que ele faz

- **Lê as transcrições do Google Meet** (Drive) e gera a **ata** de cada reunião, no padrão CONAG.
- Mantém uma **ficha viva por cliente**: status, etapa, tarefas, pendências por responsável (minhas / CONAG / cliente / terceiros), riscos, próximos passos.
- **Cruza o calendário** com fichas e atas: reunião sem ata, próxima reunião não agendada, compromisso sem prazo, horas a apontar.
- Liga os **assuntos de cada reunião ao catálogo oficial de tarefas** de implantação (`catalogo/tarefas_e_modulos.xlsx`), com ajuste manual por cliente.
- Mantém um **Planner** (página privada do consultor) com agenda, checklist da semana, follow-ups e diagnóstico dos clientes.
- Rotinas por comando: **"bom dia"**, **"fechar o dia"**, **"organize minha semana"**, **"faça meu painel"**, **"atualizar o planner"**.

## O que ele não faz

- **Não agenda nada sozinho** — agendamento oficial continua sendo do consultor, no portal. A assistente identifica, alerta, cobra e confirma.
- **Não inventa** datas, horas, responsáveis, decisões ou status. Sem informação → "Não identificado".
- **Não é controle do gestor sobre o consultor.** É ferramenta **do** consultor; os dados ficam na máquina dele.

---

## Como começar

Siga o **[ONBOARDING.md](ONBOARDING.md)**. Leva cerca de 30 minutos, mais o tempo da primeira carga do histórico (depende do volume de reuniões e do modo escolhido).

Na primeira execução, a assistente conduz uma conversa de configuração em que **cada consultor define**:
- seu nome, como quer ser chamado, e o **nome e a apresentação da assistente**;
- a **busca de histórico**: data de corte, incluir ou não "Compartilhados comigo", e se a importação é **por cliente** (um de cada vez, com confirmação) ou **tudo de uma vez**, com corte específico por cliente se quiser.

---

## Estrutura

| Pasta / arquivo | Para quê |
|---|---|
| `CLAUDE.md` | Entrada: configuração inicial, privacidade, e carrega o método e as regras |
| `docs/metodo.md` | O método completo (papel da assistente, rotinas, atas, pendências, alertas, relatórios) |
| `docs/regras-operacionais.md` | Regras aprendidas no uso real — cada uma existe porque o erro oposto já aconteceu |
| `docs/importacao-historico.md` | Primeira carga das transcrições e varreduras recorrentes |
| `docs/planner.md` | Planner: abas, modelo de dados, protocolo de atualização |
| `config/consultor.exemplo.md` | Modelo da configuração pessoal |
| `projetos/_template/` | Modelo de ficha de cliente e de ata |
| `planner/planner-modelo.html` | Planner em branco |
| `catalogo/tarefas_e_modulos.xlsx` | Catálogo oficial de tarefas de implantação CONAG |
| `identidade visual/` | Cores, fontes e logos para relatórios e PDFs |
| `ferramentas/` | Manutenção do kit |

**O que nunca sobe para o repositório** (garantido pelo `.gitignore`): `config/consultor.md`, as pastas de clientes em `projetos/`, o registro de compartilhados e cópias preenchidas do Planner.

---

## Requisitos

- **Claude Code** (extensão do VS Code ou terminal) com plano que permita conectores.
- Conectores **Google Drive** e **Google Calendar** autorizados em claude.ai → Configurações → Conectores.
- Gravação/transcrição do Google Meet ativada nas reuniões com clientes.

---

## Cuidados

- **Repositório privado** na organização da CONAG. O catálogo e a identidade visual são material interno.
- Transcrições e dados financeiros de clientes passam pelo Claude. Seguir a política da CONAG para uso de IA com dados de clientes.
- O consumo de tokens cresce com o volume de transcrições. Prefira a importação **por cliente** e uma data de corte na primeira carga.

---

## Contribuindo

Encontrou uma regra que deveria valer para todos, ou melhorou o Planner? Abra uma **branch** e um **pull request** só com arquivos genéricos (sem dados de cliente). Se alterar o código do Planner, regenere o modelo em branco (`docs/planner.md`, seção "Manutenção do modelo").
