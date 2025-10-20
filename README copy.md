# API Template com Node.js, Clean Architecture e TypeORM

Um template robusto e pronto para produção para construir APIs Node.js.

Este projeto é construído sobre os pilares da **Arquitetura Limpa (Clean Architecture)**, **S.O.L.I.D.** e **Domain-Driven Design (DDD)**, usando as ferramentas mais modernas do ecossistema TypeScript.

---

## 🚀 Stack de Tecnologia

- **Node.js**
- **TypeScript**
- **Express**: Servidor web
- **Docker** e **Docker Compose**: Ambiente de banco de dados (PostgreSQL)
- **TypeORM (v0.3+)**: ORM para comunicação com o banco
- **TSyringe**: Contêiner de Injeção de Dependência (DI)
- **Bcrypt.js** e **JWT**: Para autenticação
- **Class-transformer** e **Class-validator**: Para validação de DTOs e formatação de Views (JSON de resposta)
- **DotEnv**: Gerenciamento de variáveis de ambiente
- **Express-Async-Errors**: Tratamento de erros em rotas assíncronas

---

## 🏁 Começando

Siga os passos abaixo para rodar o projeto localmente.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (v18+ recomendado)
- [NPM](https://www.npmjs.com/)
- [Docker](https://www.docker.com/products/docker-desktop/) e **Docker Compose**

### 1. Instalação

1.  **"Use este template"** no GitHub para criar seu novo repositório, ou clone este repo.
2.  Entre na pasta do projeto: `cd seu-projeto`
3.  Instale as dependências:
    ```bash
    npm install
    ```

### 2. Configurando o Ambiente

1.  Copie o arquivo de exemplo `.env` para criar seu arquivo de ambiente local:

    ```bash
    cp .env.example .env
    ```

    _(O arquivo `.env` é pessoal e ignorado pelo Git)_

2.  Verifique o arquivo `.env` e ajuste as portas ou senhas, se necessário. Os valores padrão já estão configurados para funcionar com o Docker Compose.

### 3. Rodando o Banco de Dados (Docker)

1.  Inicie o container do PostgreSQL em segundo plano (`-d`):

    ```bash
    docker-compose up -d
    ```

2.  (Opcional) Para acessar a interface gráfica (Adminer) do banco, acesse: `http://localhost:8080`
    - **Sistema:** `PostgreSQL`
    - **Servidor:** `postgres_db`
    - **Usuário:** `docker`
    - **Senha:** `dockerpass`
    - **Banco de Dados:** `template_api`

### 4. Rodando as Migrations

Com o banco no ar, precisamos criar as tabelas. O projeto usa migrations do TypeORM para isso.

```bash
npm run migration:run
```
