# Skore Challenge

<p align="center">Projeto para o desafio da skore.</p>

<img src="https://img.shields.io/static/v1?label=license&message=MIT&color=#919191&style=for-the-ba dge"/> <img src="https://img.shields.io/static/v1?label=npm&message=v16.13.0&color=#919191&style=for-the-badge"/>

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e [Typescript](https://www.typescriptlang.org/).
Você pode utilizar o [Docker](https://www.docker.com/) para o banco de dados ou usar um banco de dados local
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

## 📦 ## 📦 Instalando o projeto

Você pode optar por rodar o somente o banco em um container Docker ou rodar toda a aplicação.

Caso você quira rodar somente o banco, basta abrir o terminal e rodar:

```bash
# Clone este repositório
$ git clone https://github.com/xXMauricioHXx/skore-challenge.git

# Acesse a pasta do projeto no terminal/cmd
$ cd skore-challenge

# Subindo container do banco
$ docker-compose up -d db

# Instale as dependências
$ npm install

# Com o banco rodando, execute as migrations
$ npm run migration:latest

# Execute a aplicação
$ npm run dev

```

Se você quer rodar a aplicação em container, abra o terminal e rode:

```bash
# Clone este repositório
$ git clone https://github.com/xXMauricioHXx/skore-challenge.git

# Acesse a pasta do projeto no terminal/cmd
$ cd skore-challenge

docker-compose up
```

Se deseja ter tudo rodando local, banco e aplicação, basta rodar os seguintes comandos:

```bash
# Clone este repositório
$ git clone https://github.com/xXMauricioHXx/skore-challenge.git

# Acesse a pasta do projeto no terminal/cmd
$ cd skore-challenge

# Instale as dependências
$ npm install

# Com o banco rodando, execute as migrations
$ npm run migration:latest

# Execute a aplicação
$ npm run dev
```

Ao final da instalação basta acessar http://localhost:3000/content para acessar a listagem de conteúdos.

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [Docker](https://www.docker.com/)

### 🎲 Arquitetura

O projeto procura seguir as ideias de [arquitetura limpa](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html), assim focando nas regras de negócio, essa arquitetura traz alguns benefícios como:

- Complexidade acidental deixada para o fim (assim podemos focar no desenvolvimento do problema sem se preocupar com frameworks, banco, etc);
- Baixo acoplamento entre as camadas, trazendo mais flexibilidade a mudanças de ferramentas de desenvolvimento sem que afete as regras de negócio;
- Procura seguir as ideias do SOLID, oque aumenta a manutenabilidade do código;
- Regras de negócio centralizadas, utilizando entidades como um ponto único de verdade;

### Autor

---

<a href="https://github.com/xXMauricioHXx">
 
 <img style="border-radius: 50%;" src="https://media-exp1.licdn.com/dms/image/C4D03AQHcYztxG6lv5w/profile-displayphoto-shrink_200_200/0/1612968776138?e=1647475200&v=beta&t=oSk0aobtYw-4uNSvhVoRQZ-I40Lt8hivBEx7IJ-YgmM" width="100px;" alt=""/>
 <br />
 <sub><b>Mauricio Henrique</b></sub></a>

Feito com ❤️ por Mauricio Henrique 👋🏽 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Mauricio-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/mauricio-henrique-1249b5154/)](https://www.linkedin.com/in/mauricio-henrique-1249b5154/)
[![Gmail Badge](https://img.shields.io/badge/-mauriciosh558@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:mauriciosh558@gmail.com)](mailto:mauriciosh558@gmail.com)
