# Regras operacionais

> Regras aprendidas no uso real do modelo (piloto de agosto a outubro de 2026). Cada uma existe porque o erro oposto já aconteceu. Valem para todos os consultores, salvo ajuste em `config/consultor.md`.

---

## 1. Fatos e status

### 1.1 Nunca presumir que uma reunião não ocorreu
Falta de transcrição no Drive **não** prova que a reunião não aconteceu (pode ser atraso de sincronização, reunião em andamento, gravação feita em outra ferramenta, ou organizador diferente). Reportar só o fato neutro: "sem transcrição disponível ainda".
- Reunião de status incerto: **buscar ativamente** a transcrição (Drive próprio e, se configurado, "Compartilhados comigo"). Achou → processar normalmente (ata + ficha + Planner). Não achou → não presumir nada.
- Só registrar "não ocorreu" quando o próprio consultor disser — no Planner, pelo botão "Sinalizar que a reunião não ocorreu", com o motivo.

### 1.2 Gravação existente não prova reunião realizada
Transcrição vazia, ou encerrada em poucos segundos/minutos sem falas, também não confirma nada. Gerar a ata com o aviso "sem conteúdo" e perguntar ao consultor.

### 1.3 Diarização (quem falou) não é confiável
Em salas com microfone compartilhado, a transcrição atribui falas à pessoa errada. Tarefas que o resumo automático atribui ao consultor devem ser **conferidas na transcrição**; se duvidosas, marcar "Inferência — validar". Nunca atribuir compromisso ao consultor sem evidência.

### 1.4 Reunião interna × reunião de cliente
Reuniões só entre a equipe CONAG (alinhamentos, discussões técnicas, gestão de projetos) vão para o projeto **Interno CONAG** — não para a ficha de um cliente. Quando citarem um cliente, registrar uma linha de "citação em reunião interna" na ficha desse cliente, apontando para a ata interna.

### 1.5 Cliente com nome diferente no Calendar
É comum o evento do Calendar estar no nome do titular, razão social ou contato (ex.: nome do produtor em vez do nome da fazenda). Se a busca pelo nome do cliente não achar nada, buscar pelos nomes das pessoas da ficha. Evento sem correspondência clara → perguntar ao consultor, não presumir.

---

## 2. Pendências e listas

### 2.1 Contato primeiro
Pendências de **ligar, mandar mensagem, agendar, alinhar com alguém** vão sempre para o **topo** de qualquer lista (ficha, checklist, painel). Contato humano depende de timing e é o que mais trava projeto quando esquecido.

### 2.2 Cliente maduro / sob demanda
Para cliente com implantação concluída e atendimento reativo, a pendência padrão é só **manter contato periódico** (relacionamento/atualização). Não manter pendências técnicas antigas que o consultor já disse que não fazem mais sentido.

### 2.3 Pendência × tarefa
"Cliente enviar dados" é pendência **do cliente**; "cobrar o cliente" é tarefa **minha** de follow-up. Manter as duas, relacionadas.

### 2.4 Pedido ambíguo → perguntar
Se a instrução não deixa claro o que fazer, perguntar antes de agir. Atenção a verbos como "possam ser gerados" / "possam ser impressos": é pedido de **capacidade** (ex.: um botão), não autorização para executar tudo de uma vez.

---

## 3. Arquivos "Compartilhados comigo"

Quando o consultor ativa a busca em "Compartilhados comigo" (ver `docs/importacao-historico.md`):
- **Todo arquivo novo de outro proprietário é confirmado com o consultor, um a um**, antes de ser incorporado. Decisões: **Incorporar / Só consulta / Ignorar**.
- Antes da confirmação, ler **só metadados** (título, proprietário, datas). Conteúdo completo só depois de aprovado.
- Registrar cada decisão em `projetos/_compartilhados/registro.md`; nunca perguntar de novo sobre arquivo já decidido.
- Apresentar em lote, agrupado por cliente provável, mas a decisão é por arquivo (o consultor pode responder "todos").
- Deduplicar com o Drive próprio (a mesma reunião pode estar nos dois lugares).
- Ata vinda de compartilhado registra a origem ("compartilhado por …").
- O Drive para desktop (unidade G:) **não** espelha "Compartilhados comigo" — é preciso o conector Google Drive.

---

## 4. Processamento de transcrições

- Transcrições do Meet são Google Docs: no disco aparecem como atalhos `.gdoc` sem conteúdo. Ler sempre pelo **conector Google Drive**.
- Conferir o título do arquivo: pode ser "Transcrição" bruta ou "Anotações do Gemini" (resumo + próximas etapas + às vezes a transcrição completa).
- Arquivos grandes estouram o limite da ferramenta e são salvos em arquivo local — ler esse arquivo inteiro, em partes.
- Muitas reuniões de uma vez: processar **em paralelo, um agente por arquivo**, cada um só lendo e escrevendo a ata daquela reunião; a consolidação nas fichas é feita depois, por quem orquestra. Não pedir a um único agente que leia vários arquivos grandes.
- Cada agente usa um **arquivo temporário com nome único** (concorrência entre agentes já sobrescreveu arquivo temporário de outro).
- Depois de processar em paralelo, **conferir** que cada ata ficou com a reunião certa (data e duração no cabeçalho).
- Na primeira ficha de cada cliente, **perguntar ao consultor como está o "geral"** do cliente (contexto que não está escrito em ata) antes de dar a ficha por concluída.

---

## 5. Estrutura de dados

- **Uma pasta por cliente** em `projetos/<Cliente>/`, com a ficha `<Cliente>.md` (o arquivo leva o nome do cliente, não `projeto.md`) e as atas em `atas/AAAA-MM-DD.md` (ou `AAAA-MM-DD-assunto.md` quando houver mais de uma no dia).
- Novo cliente: copiar `projetos/_template/projeto.md` renomeando.
- Não há arquivo global de pendências — as rotinas (Bom dia, Organize minha semana, Faça meu painel) agregam lendo as fichas.
- **Cliente "guarda-chuva"** (ex.: escritório parceiro que opera várias bases de produtores): um único cliente com as bases listadas dentro da ficha, não uma pasta por base.
- **Interno CONAG**: projeto próprio para reuniões internas, com seção "Regras de processo vigentes" (horas, apontamento, chamados…) — útil para a assistente orientar o consultor.
- **Pessoal Profissional** (opcional): perfil/feedbacks do próprio consultor a partir de 1:1 e alinhamentos. Conteúdo sensível — nunca compartilhar.

---

## 6. Relatórios e documentos

- Padrão visual: pasta `identidade visual/` (cores `#3DB54A` / `#00B0A8` / `#8C8C8C`, Archivo Black + Mulish, logo `assets/logo-full.png`).
- Relatório formal: voz impessoal/passiva, datas DD/MM com dois dígitos, primeira versão é rascunho, e ao corrigir um trecho verificar se a mesma informação se repete em outras seções (ver método, seção 36).
- Valores reais de cliente não vão para material público sem aprovação da diretoria (ou devem ser ofuscados).

---

## 7. Automação

O consultor pode preferir que as rotinas dependam de **ele abrir a sessão** (reforça o hábito) em vez de agendamentos automáticos que podem falhar em silêncio. Não sugerir agendamento automático para as rotinas diárias, a menos que o consultor peça.
