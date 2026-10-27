# Onboarding — Kit Nina CONAG

Passo a passo para cada consultor montar a própria assistente. Tempo estimado: **30 minutos** + primeira carga do histórico.

---

## 1. Pré-requisitos

- [ ] **VS Code** instalado, com a extensão **Claude Code** (ou o Claude Code no terminal).
- [ ] **Git** instalado (`git --version` deve responder).
- [ ] Acesso ao repositório do kit no GitHub da CONAG.
- [ ] Conta Claude com conectores habilitados.

## 2. Autorizar os conectores (uma vez)

1. Acesse **claude.ai → Configurações → Conectores**.
2. Autorize **Google Drive** e **Google Calendar** com seu e-mail CONAG.
3. **Feche e reabra o VS Code / Claude Code.** Conectores autorizados com a sessão aberta só aparecem numa sessão nova.

## 3. Baixar o kit

Escolha uma pasta de trabalho (ex.: `Documentos`) e rode:

```bash
git clone <URL do repositório> "Kit Nina CONAG"
```

Abra a pasta `Kit Nina CONAG` no VS Code.

## 4. Primeira conversa: configuração

Abra o Claude Code na pasta do kit e diga **"oi"** (ou qualquer coisa). Sem `config/consultor.md`, a assistente inicia a **configuração inicial** e pergunta, uma etapa por vez:

1. **Você** — nome, como quer ser chamado, e-mail, papel, gestor.
2. **A assistente** — nome (padrão "Nina"), como ela se apresenta, tom.
3. **Conectores** — ela confere se Drive e Calendar estão disponíveis.
4. **Busca de histórico:**
   - **Data de corte** — a partir de quando buscar transcrições (ou sem corte).
   - **Compartilhados comigo** — incluir ou não reuniões gravadas por outras pessoas. Se incluir, ela **pergunta arquivo por arquivo** antes de usar qualquer um.
   - **Modo** — **por cliente** (recomendado: um cliente por vez, você confirma antes de seguir) ou **tudo de uma vez**.
   - Corte específico por cliente e clientes a ignorar (opcional).
5. **Planner** — ela publica o seu Planner a partir do modelo em branco e guarda o link.
6. **Rotina** — seus horários e reuniões internas fixas.

Tudo vai para `config/consultor.md`, que é **só seu** e não sobe para o GitHub. Para mudar depois, basta pedir ("mude a data de corte para 01/06", "passe a me chamar de…").

## 5. Primeira carga do histórico

1. A assistente mostra um **inventário**: clientes encontrados, nº de reuniões, período. Nessa etapa ela lê **só títulos e datas**, sem abrir conteúdo.
2. Você confirma o mapa: corrige agrupamentos, define a ordem, exclui o que não interessa.
3. No modo **por cliente**, para cada cliente ela:
   - gera as atas (`projetos/<Cliente>/atas/`);
   - monta a ficha (`projetos/<Cliente>/<Cliente>.md`);
   - **pergunta a sua avaliação geral do cliente**, que é o contexto que não está escrito em ata;
   - pergunta se segue para o próximo.
4. No fim, ela popula o Planner: agendas da semana, checklist, follow-ups e aba Clientes.

## 6. Uso diário

| Você diz | Ela faz |
|---|---|
| **"bom dia"** | Busca atas novas, atualiza fichas, monta o painel do dia: agenda, preparação das reuniões, pendências críticas, follow-ups, foco |
| **"fechar o dia"** | Concluído / não concluído, novas pendências, horas a apontar, atas a registrar, prioridades de amanhã |
| **"organize minha semana"** | Visão da semana, capacidade, riscos, agendamentos a fazer |
| **"faça meu painel"** | Painel executivo consolidado |
| **"atualizar o planner"** | Protocolo completo de atualização do Planner |
| Cola uma transcrição ou relato | Fechamento da reunião: resumo, decisões, tarefas, pendências, próximos passos e o que fazer no portal |

No **Planner** você pode:
- marcar itens do checklist e deixar comentários;
- sinalizar "reunião não ocorreu", informando o motivo;
- ajustar a ligação entre os assuntos da reunião e o catálogo de tarefas.

A página salva sozinha, e a assistente lê as suas mudanças na próxima atualização.

## 7. Atualizar o kit

Quando houver melhorias no método ou no Planner:

```bash
git pull
```

Seus arquivos pessoais (`config/`, `projetos/<clientes>`, cópias do Planner) não são afetados. Se o **Planner** ganhou funcionalidade nova, peça à assistente: "aplique a nova versão do modelo no meu Planner, preservando meus dados".

## 8. Problemas comuns

| Sintoma | Causa provável | O que fazer |
|---|---|---|
| A assistente diz que não tem acesso ao Drive | Conector autorizado com a sessão aberta | Reabrir o VS Code / Claude Code |
| Arquivos `.gdoc` vazios no disco | Google Docs não têm conteúdo local | Normal. A leitura é feita pelo conector, não pelo disco |
| Reunião sem transcrição | Gravação não ativada, outro organizador, outra ferramenta | Ela procura nos compartilhados (se ativado) e pergunta. **Nunca marca a reunião como "não ocorreu" sozinha** |
| Tarefa atribuída a você por engano | Transcrição com falas trocadas (microfone compartilhado) | Ela marca como "a validar". Confirme ou descarte |
| `git status` mostra arquivo de cliente | `.gitignore` alterado ou arquivo fora da pasta padrão | Não faça commit. Avise quem mantém o kit |
