# Chitkara Enterprise Knowledge Agent API

FastAPI backend for the Chitkara Enterprise Knowledge Agent.

The API uses a two-agent pipeline:

User
→ Agent 1: Knowledge/RAG Agent
→ Agent 2: Answer Formatter
→ Final Response

## Agents

### Agent 1

Name:

`chitkara-enterprise-knowlegde-agent`

Version:

`12`

Responsible for:
- Knowledge retrieval
- Answer generation
- Using the configured Foundry knowledge tools

### Agent 2

Name:

`chitkara-answer-formatter`

Version:

`2`

Responsible for:
- Formatting
- Structuring
- Improving readability
- Preserving the factual content of Agent 1

Agent 2 does not have its own knowledge base.

## Requirements

- Python 3.12
- Docker
- Microsoft Foundry project
- Azure authentication with access to the Foundry project

## Environment

Create a `.env` file:

```env
FOUNDRY_PROJECT_ENDPOINT=https://YOUR-PROJECT.services.ai.azure.com
