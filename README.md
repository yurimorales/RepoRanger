# RepoRanger App

RepoRanger é uma aplicação full-stack desenvolvida para facilitar a importação e visualização de repositórios do GitHub, com foco em automação, integração e análise de dados de repositórios. O projeto foi criado para servir como base de estudos e demonstração de integração entre frontend, backend, mensageria e banco de dados relacional.

## Contexto do Projeto

O objetivo do RepoRanger é permitir que usuários busquem repositórios de um usuário do GitHub, exportem esses dados em CSV e realizem a importação desses repositórios para uma base de dados própria. O processamento da importação é feito de forma assíncrona, utilizando RabbitMQ, garantindo escalabilidade e desacoplamento entre as etapas de upload e persistência dos dados.

## Features

- Buscar repositórios de usuários do GitHub.
- Exportar a lista de repositórios para um arquivo CSV.
- Importar repositórios a partir de um arquivo CSV.
- Processamento assíncrono da importação utilizando RabbitMQ.
- Armazenamento persistente dos dados em um banco MariaDB.
- Visualização dos repositórios importados em uma tabela.

## Instruções de Instalação

1. **Clone o repositório:**
   ```
   git clone <url-do-repositório>
   cd RepoRanger
   ```
2. **Executando a aplicação:**
   - Inicie todos os serviços utilizando Docker Compose:
     ```
     docker-compose up --build
     ```

## Serviços

- **Backend:** Serviço em TypeScript com Express, responsável pelas APIs e integração com RabbitMQ e MariaDB.
- **Frontend:** Aplicação React para interação com o usuário.
- **MariaDB:** Banco de dados relacional para armazenamento dos repositórios.
- **RabbitMQ:** Serviço de mensageria para processamento assíncrono das importações.

## Uso

- Acesse a aplicação frontend através do endereço:  `http://localhost:3000`.
- As APIs do backend estão disponíveis no endereço: `http://localhost:5000/api`.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias e correções.

## Licença

Este projeto está licenciado sob a licença MIT.