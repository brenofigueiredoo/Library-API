# Library-API 📚

A Library-API oferece funcionalidades para criar e autenticar usuários, adicionar livros, emprestar/devolver livros e listar os livros lidos e aqueles em posse do usuário. Simplificando o gerenciamento eficiente de uma biblioteca online, proporciona uma experiência completa aos usuários.

***➡ Documentação da API***: [Clique aqui]() e acesse a documentação da API.

***➡ Diagrama ER***: [Clique aqui](https://github.com/brenofigueiredoo/Library-API/blob/main/diagram.png) e acesse o diagrama do Projeto.

<br />

## Rodando localmente
1. Faça o clone da do repósitorio e acesse a pasta clonada.
```bash
git clone https://github.com/brenofigueiredoo/Library-API.git

cd Library-API
```
2. Instale todas as dependências.
```bash
yarn install
```
3. Configure .env
4. Rode as migrations
```
yarn migration:run
```
6. Rode o servidor.
```bash
# Desenvolvimento
yarn run start

# Modo de observação
yarn run start:dev

# Modo de produção
yarn run start:prod
```

## This is an H2

## Ferramentas utilizadas 🛠 
- NestJs <img align="center" alt="python" height="30" width="40" src="https://github.com/devicons/devicon/blob/master/icons/nestjs/nestjs-plain.svg">
- TypeScript <img align="center" alt="django" height="30" width="40" src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-plain.svg">
- PostgreSQL <img align="center" alt="postgresql" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg">
- Insomnia <img align="center" alt="insomnia" height="30" width="40" src="https://www.svgrepo.com/show/353904/insomnia.svg">
- GitHub <img align="center" alt="github" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg">
- VsCode <img align="center" alt="vscode" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg">

&nbsp;
[link to my anchored heading](#my-anchor)
## <a name="pookie"></a> Documentação 📖
### 1 - Users
#### 1.1 - Criar Usuário
- Endpoint: `POST /users`
  
Cria um novo usuário. Deve enviar um JSON no corpo da requisição com os seguintes campos:
```
{
  "name": "string",
  "email": "user@example.com",
  "password": "string"
}
```

#### 1.2 - Login do Usuário
- Endpoint: `POST /login`
  
Gera um token de acesso ao usuário. Deve enviar um JSON no corpo da requisição com os seguintes campos:
```
{
  "email": "user@example.com",
  "password": "string"
}
```

#### 1.3 - Listar Usuários
- Endpoint: `GET /users`
- O token de acesso deve ser incluído no cabeçalho da requisição
- É necessário ser Admin
  
Retorna todos os usuários.

#### 1.4 - Listar Usuário
- Endpoint: `GET /users/retrieve-user`
- O token de acesso deve ser incluído no cabeçalho da requisição
  
Retorna os dados do usuário logado.

#### 1.5 - Atualizar Usuário
- Endpoint: `PATCH /users/update-user`
- O token de acesso deve ser incluído no cabeçalho da requisição
  
Atualiza os dados do usuário logado. Deve enviar um JSON no corpo da requisição algum dos seguintes campos:
```
{
  "name": "string",
  "email": "user@example.com",
  "password": "string"
}
```

#### 1.6 - Deletar Usuário
- Endpoint: `DELETE /users/delete-user`
- O token de acesso deve ser incluído no cabeçalho da requisição
  
Deleta usuário logado do banco de dados.

### 2 - Books
#### 2.1 - Criar Livro
- Endpoint: `POST /books`

Cria um novo livro. Deve enviar um JSON no corpo da requisição com os seguintes campos:
```
{
  "title": "string",
  "author": "string",
  "genre": "string",
  "publicationDate": "yyyy/MM/dd",
}
```

#### 2.2 - Listar Livros
- Endpoint: `GET /books`
  
Retorna todos os livros.

#### 2.3 - Listar Livro por ID
- Endpoint: `GET /books/:bookId`
- O token de acesso deve ser incluído no cabeçalho da requisição
  
Retorna os dados do livro passado por parâmetro.

#### 2.4 - Atualizar Livro
- Endpoint: `PATCH /books/:bookId`
- O token de acesso deve ser incluído no cabeçalho da requisição
- É necessário ser Admin
  
Atualiza os dados do livro passado por parâmetro. Deve enviar um JSON no corpo da requisição com os seguintes campos:
```
{
  "title": "string",
  "author": "string",
  "genre": "string",
  "publicationDate": "yyyy/MM/dd",
}
```

#### 2.5 - Deletar Livro
- Endpoint: `DELETE /books/:bookId`
- O token de acesso deve ser incluído no cabeçalho da requisição
- É necessário ser Admin

Deleta o livro passado por parâmetro.

### 3 - User Book Manager
#### 3.1 - Pegar livro emprestado
- Endpoint: `POST /user-books/create-relation/:bookId`
- O token de acesso deve ser incluído no cabeçalho da requisição

Pega o livro empresado.

#### 3.2 - Listar livros pegos emprestado
- Endpoint: `GET /user-books/list-relations`
- O token de acesso deve ser incluído no cabeçalho da requisição

Lista todos os livros pegos pelo usuário logado.

#### 3.3 - Retornar relação
- Endpoint: `GET /user-books/retrieve-relation/:relationId`
- O token de acesso deve ser incluído no cabeçalho da requisição

Retorna a relação de usuário com um livro.

#### 3.4 - Devolver livro
- Endpoint: `PATCH /user-books/update-relation/:relationId`
- O token de acesso deve ser incluído no cabeçalho da requisição

Devolve o livro e o deixa livre para outro usuário usar-lo.
