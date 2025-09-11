📋 Sales System API - Sistema de Vendas
Uma API RESTful completa para gerenciamento de vendas, construída com Node.js, PostgreSQL e Docker.

🚀 Tecnologias Utilizadas

Node.js - Runtime JavaScript
Express.js - Framework web
PostgreSQL - Banco de dados relacional
Docker - Containerização
JWT - Autenticação
Swagger/OpenAPI - Documentação interativa
Jest - Testes automatizados
Supertest - Testes de integração

📋 Funcionalidades

✅ Autenticação JWT com expiração mensal
✅ CRUD completo de Clientes
✅ CRUD completo de Produtos
✅ Gestão de Pedidos de Venda
✅ Controle de estoque automático
✅ Validações de dados (CPF, Telefone, CEP, Email)
✅ Paginação em todas as listagens
✅ Documentação interativa com Swagger
✅ Testes unitários e de integração
✅ Documentação completa da API

📚 Documentação Interativa

A API possui documentação completa e interativa através do Swagger UI:

🌐 Acessar Documentação

http://localhost:3000/api/docs

🎯 Funcionalidades do Swagger UI
📖 Documentação Completa: Todos os endpoints documentados
🔄 Testes Interativos: Execute requests diretamente na interface
🔐 Autenticação Integrada: Configure tokens JWT facilmente
📋 Exemplos Práticos: Modelos de requests e responses
🔍 Busca e Filtro: Encontre endpoints rapidamente
📱 Interface Responsiva: Acessível em qualquer dispositivo

🔐 Como Usar a Documentação

Acesse a documentação: http://localhost:3000/api/docs

Obtenha um token:
Vá na seção Auth → POST /auth/login
Clique em "Try it out"

Preencha os dados:

json
{
  "email": "admin@email.com",
  "password": "senha123"
}

Execute e copie o token retornado

Configure autenticação:

Clique no botão "Authorize" 🔐 no topo
Cole o token: Bearer seu_token_aqui
Clique em "Authorize"

Teste os endpoints:

Agora você pode testar qualquer endpoint protegido
Use "Try it out" para preencher dados e executar

📊 Estrutura da Documentação:

🔐 Auth: Autenticação e registro de usuários
👥 Clients: Gerenciamento completo de clientes
📦 Products: Cadastro e gestão de produtos
🛒 Orders: Processamento de pedidos de venda

🏗️ Estrutura do Projeto

project/
├── .env
├── .env.test
├── docker-compose.yml
├── docker-compose.test.yml
├── jest.config.js
├── package.json
├── scripts/
│   ├── init-db.sql
│   └── test-init.sql
├── public/
│   └── swagger-custom.css
├── src/
│   ├── index.js
│   ├── config/
│   │   ├── database.js
│   │   ├── env.config.js
│   │   ├── auth.config.js
│   │   ├── test.config.js
│	  │	  └── swagger.config.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── client.controller.js
│   │   ├── product.controller.js
│   │   └── order.controller.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── client.model.js
│   │   ├── product.model.js
│   │   └── order.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── client.routes.js
│   │   ├── product.routes.js
│   │   ├── order.routes.js
│   │   └── docs.routes.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── validation.middleware.js
│   ├── utils/
│   │   └── validators.js
│   └── tests/
│       ├── integration/
│       │   ├── auth.test.js
│       │   ├── clients.test.js
│       │   ├── products.test.js
│       │   └── orders.test.js
│       └── unit/
│           ├── validators.test.js
│           └── auth.test.js
└── README.md

⚙️ Pré-requisitos

Node.js 16+
Docker e Docker Compose
npm ou yarn
Postman (para testar as APIs)

🚀 Como Executar

1. Clone o repositório
bash
git clone <url-do-repositorio>
cd sales-system

2. Instale as dependências
bash
npm install

3. Configure as variáveis de ambiente
Crie um arquivo .env na raiz do projeto:

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sales_db
DB_USER=admin
DB_PASSWORD=password

# JWT
JWT_SECRET=seu_super_secret_jwt_aqui_mude_em_producao
JWT_EXPIRES_IN=30d

# App
PORT=3000
NODE_ENV=development

4. Inicie o PostgreSQL com Docker
bash
docker-compose up -d

5. Execute o script de inicialização do banco
bash
npm run init-db

6. Inicie a aplicação
bash
# Desenvolvimento
npm run dev

# Produção
npm start

A aplicação estará disponível em: http://localhost:3000

🧪 Executando Testes

# Todos os testes
npm test

# Apenas testes de integração
npm run test:integration

# Apenas testes de unidade
npm run test:unit

# Testes com cobertura
npm run test:coverage

# Setup completo (Docker + Testes)
npm run test:full

📚 Documentação da API

Autenticação
Todas as rotas (exceto auth) requerem autenticação JWT. Use o header:

text
Authorization: Bearer <seu_token>

🔐 Endpoints de Autenticação

Registrar Usuário
http
POST /api/auth/register
Body:

json
{
  "username": "admin",
  "email": "admin@email.com",
  "password": "senha123"
}

Login
http
POST /api/auth/login
Body:

json
{
  "email": "admin@email.com",
  "password": "senha123"
}

Obter Perfil
http
GET /api/auth/me
Headers:

text
Authorization: Bearer <token>

👥 Endpoints de Clientes

Criar Cliente
http
POST /api/clients
Headers:

text
Authorization: Bearer <token>
Content-Type: application/json

Body:

json
{
  "cpf": "529.982.247-25",
  "nome": "João Silva",
  "telefone": "(11) 99999-9999",
  "email": "joao@email.com",
  "cep": "01234-567",
  "municipio": "São Paulo",
  "estado": "SP",
  "endereco": "Rua das Flores",
  "numero": "123",
  "complemento": "Apto 45"
}

Listar Clientes
http
GET /api/clients?page=1&limit=10
Headers:

text
Authorization: Bearer <token>

Buscar Cliente por ID
http
GET /api/clients/1
Headers:

text
Authorization: Bearer <token>

Atualizar Cliente
http
PUT /api/clients/1
Headers:

text
Authorization: Bearer <token>
Content-Type: application/json

Body: (mesma estrutura do POST)

Excluir Cliente
http
DELETE /api/clients/1

Headers:

text
Authorization: Bearer <token>

📦 Endpoints de Produtos

Criar Produto
http
POST /api/products
Headers:

text
Authorization: Bearer <token>
Content-Type: application/json

Body:

json
{
  "descricao": "Notebook Dell",
  "valor": 2899.90,
  "quantidade_estoque": 25
}

Listar Produtos
http
GET /api/products?page=1&limit=10

Headers:

text
Authorization: Bearer <token>

Buscar Produto por ID
http
GET /api/products/1
Headers:

text
Authorization: Bearer <token>

Atualizar Produto
http
PUT /api/products/1
Headers:

text
Authorization: Bearer <token>
Content-Type: application/json

Body: (mesma estrutura do POST)

Excluir Produto
http
DELETE /api/products/1
Headers:

text
Authorization: Bearer <token>

🛒 Endpoints de Pedidos

Criar Pedido
http
POST /api/orders
Headers:

text
Authorization: Bearer <token>
Content-Type: application/json

Body:

json
{
  "id_cliente": 1,
  "items": [
    {
      "id_produto": 1,
      "valor_produto": 2899.90,
      "quantidade": 2
    },
    {
      "id_produto": 2,
      "valor_produto": 3499.00,
      "quantidade": 1
    }
  ]
}

Listar Pedidos
http
GET /api/orders?page=1&limit=10
Headers:

text
Authorization: Bearer <token>

Buscar Pedido por ID
http
GET /api/orders/1
Headers:

text
Authorization: Bearer <token>

Excluir Pedido
http
DELETE /api/orders/1
Headers:

text
Authorization: Bearer <token>

🎯 Exemplos de Requisições no Postman

1. Configurar Environment no Postman

Crie um environment com as variáveis:

base_url: http://localhost:3000/api
token: (será preenchido automaticamente após login)

2. Collection do Postman

Importe esta collection:

{
  "info": {
    "name": "Sales System API",
    "description": "API completa do sistema de vendas",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:3000/api",
      "type": "string"
    }
  ],
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"username\": \"admin\",\n  \"email\": \"admin@email.com\",\n  \"password\": \"senha123\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/auth/register",
              "host": ["{{base_url}}"],
              "path": ["auth", "register"]
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"admin@email.com\",\n  \"password\": \"senha123\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/auth/login",
              "host": ["{{base_url}}"],
              "path": ["auth", "login"]
            },
            "event": [
              {
                "listen": "test",
                "script": {
                  "exec": [
                    "pm.environment.set(\"token\", pm.response.json().token);",
                    "console.log(\"Token set:\", pm.response.json().token);"
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  ]
}

3. Fluxo de Teste Recomendado

Registrar usuário → /auth/register
Fazer login → /auth/login (o token será salvo automaticamente)
Criar clientes → /clients
Criar produtos → /products
Criar pedidos → /orders
Testar listagens → /clients, /products, /orders

🛡️ Validações Implementadas

Clientes:

✅ CPF válido e único
✅ Telefone válido (10-11 dígitos)
✅ CEP válido (8 dígitos)
✅ Email válido e único
✅ Campos obrigatórios

Produtos:

✅ Valor positivo
✅ Estoque não negativo
✅ Descrição obrigatória

Pedidos:

✅ Cliente deve existir
✅ Produtos devem existir
✅ Estoque suficiente
✅ Só exclui pedidos "pendentes"

🔧 Comandos Úteis

# Ver logs do PostgreSQL
docker-compose logs postgres

# Acessar banco via psql
docker-compose exec postgres psql -U admin -d sales_db

# Reiniciar containers
docker-compose restart

# Parar containers
docker-compose down

# Limpar volumes (cuidado!)
docker-compose down -v

🐛 Solução de Problemas

Erro de conexão com o banco:

bash
# Verificar se PostgreSQL está rodando
docker ps

# Reiniciar o container
docker-compose restart postgres

Erro de porta já em uso:
bash
# Mudar a porta no .env
PORT=3001

Erro de autenticação JWT:

Verifique se JWT_SECRET está configurado
Gere um novo token fazendo login novamente

📞 Suporte

Se encontrar problemas:

Verifique se todos os containers estão rodando
Confirme as variáveis de ambiente
Execute os testes para verificar a integridade
Consulte os logs com docker-compose logs

📝 Licença

Este projeto é para fins educacionais e de demonstração.

✨ Desenvolvido com Node.js, Express e PostgreSQL