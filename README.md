### Instruções para executar o projeto:

Primeiramente, é necessário criar um arquivo `.env` na raíz do projeto com as seguintes configurações para a execução da API:

JWT_SECRET='chave_secreta'

- Chave secreta necessária para a criação do token de autenticação dos usuários da API

DB_HOST='host_postgres'

- Caso queira executar localmente o projeto, o valor deste campo será `localhost`
- Caso queira executar em uma máquina Docker, o valor deste campo será `db`

DB_USER='usuario_postgres'

- Nome de usuário do postgres

DB_PASSWORD='senha_postgres'

- Senha de usuário do postgres

DB_NAME='bd_postgres'

- Nome do banco de dados utilizado pelo postgres para a API

DB_PORT=5432

- Número da porta na qual o banco de dados postgres executa

PORT=numero_da_porta

- Número da porta na qual será executada a API

### Opções para executar a API:

1. Executar a API localmente:

Abaixo seguem as instruções para executar o projeto em sua máquina local:

- Primeiramente, para instalar as dependências do projeto, é necessário executar no terminal o seguinte comando:

- `npm install`

- Logo em seguida, basta executar o seguinte comando que a API será executada:

- `npm run dev`

2. Executar a API em um contêiner Docker:

- Com o Docker rodando em sua máquina, basta executar no terminal o seguinte comando para rodar a API:

- `docker-compose up -d`
