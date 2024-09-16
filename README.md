
# API Rest com Node.js, NestJS e Prisma ORM

Este projeto é uma API REST desenvolvida por Daniel Carlos para servir como um banco de palavras da língua portuguesa associadas a grupos de palavras.

Essa API pode ser usada por aplicativos e jogos que usam palavras.

## Tecnologias Utilizadas

- **Node.js**: Plataforma para execução de código JavaScript no lado do servidor.
- **Typescript**: Superset de javascript que adiciona tipagem estática à linguagem.
- **NestJS**: Framework de desenvolvimento de aplicações escaláveis em Node.js com foco em arquitetura modular e programação orientada a objetos.
- **Prisma ORM**: ORM (Object-Relational Mapping) para interação com o banco de dados de forma simples e eficiente.

## Instalação

### Pré-requisitos

- **Node.js** (v14 ou superior)
- **npm** ou **yarn**
- **Banco de dados** compatível com o Prisma (PostgreSQL, MySQL, SQLite, etc.)

### Passos para instalar

1. Clone este repositório:
   ```bash
   git clone https://github.com/daniel-carlos/palavras-api.git
   ```

2. Instale as dependências:
   ```bash
   cd nome-do-repositorio
   npm install
   # ou
   yarn install
   ```

3. Configure o banco de dados. Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente:

   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   GEMINI_API_KEY="<<your_gemini_api_key>>"
   ```

4. Configurar o Prisma:
   ```bash
   npx prisma generate
   ```

4. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor:
   ```bash
   npm run start
   # ou
   yarn start
   ```

## Endpoints

### Exemplos de Endpoints

- **POST** `/words`: Cria uma nova palavra.
- **POST** `/words/batch`: Cria várias palavras de uma vez.
- **POST** `/words/assign`: Cria associações entre uma palavra e os grupos.
- **GET** `/words`: retorna as palavras do banco.
- **GET** `/words/:id`: retorna uma palavra do banco.
- **GET** `/words/random`: retorna um conjunto de palavras escolhidas de maneira aleatória
- **PATCH** `/words/:id`: Edita os dados de uma palavra.
- **DELETE** `/words/:id`: Remove uma palavra do banco.
- **POST** `/bot/auto-assign`: recebe uma lista de palavras e uma lista de grupos e usa a API do Gemini para criar associações entre as palavras e os grupos.
- **POST** `/bot/random-assign/:n`: cria associações entre **n** palavras escolhidas aleatoriamente e os grupos passados usando a API do Gemini.  

## Como Contribuir

1. Faça um fork deste repositório.
2. Crie uma branch com a sua feature: `git checkout -b minha-feature`.
3. Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`.
4. Faça push para a branch: `git push origin minha-feature`.
5. Abra um pull request.

## License

Este projeto está licenciado sob a [MIT License](LICENSE).
