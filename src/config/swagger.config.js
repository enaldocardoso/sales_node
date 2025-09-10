import swaggerJSDoc from 'swagger-jsdoc';
import { config } from './env.config.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sales System API',
      version: '1.0.0',
      description: 'API completa para sistema de vendas com Node.js e PostgreSQL',
      contact: {
        name: 'Suporte API',
        email: 'suporte@empresa.com'
      },
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      }
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}/api`,
        description: 'Servidor de Desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT no formato: Bearer <token>'
        }
      },
      schemas: {
        Client: {
          type: 'object',
          required: ['cpf', 'nome', 'email'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do cliente',
              example: 1
            },
            data_inclusao: {
              type: 'string',
              format: 'date-time',
              description: 'Data de inclusão do cliente',
              example: '2024-01-15T10:30:00.000Z'
            },
            cpf: {
              type: 'string',
              description: 'CPF do cliente (11 dígitos)',
              example: '52998224725'
            },
            nome: {
              type: 'string',
              description: 'Nome completo do cliente',
              example: 'João Silva'
            },
            telefone: {
              type: 'string',
              description: 'Telefone do cliente',
              example: '11999999999'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'E-mail do cliente',
              example: 'joao@email.com'
            },
            cep: {
              type: 'string',
              description: 'CEP do cliente (8 dígitos)',
              example: '01234567'
            },
            municipio: {
              type: 'string',
              description: 'Município do cliente',
              example: 'São Paulo'
            },
            estado: {
              type: 'string',
              description: 'Estado do cliente (2 caracteres)',
              example: 'SP'
            },
            endereco: {
              type: 'string',
              description: 'Endereço do cliente',
              example: 'Rua das Flores'
            },
            numero: {
              type: 'string',
              description: 'Número do endereço',
              example: '123'
            },
            complemento: {
              type: 'string',
              description: 'Complemento do endereço',
              example: 'Apto 45'
            }
          }
        },
        Product: {
          type: 'object',
          required: ['descricao', 'valor'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do produto',
              example: 1
            },
            descricao: {
              type: 'string',
              description: 'Descrição do produto',
              example: 'Notebook Dell Inspiron 15'
            },
            valor: {
              type: 'number',
              format: 'float',
              description: 'Valor do produto',
              example: 2899.90
            },
            quantidade_estoque: {
              type: 'integer',
              description: 'Quantidade em estoque',
              example: 25
            }
          }
        },
        Order: {
          type: 'object',
          required: ['id_cliente', 'items'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do pedido',
              example: 1
            },
            data_inclusao: {
              type: 'string',
              format: 'date-time',
              description: 'Data de inclusão do pedido',
              example: '2024-01-15T10:30:00.000Z'
            },
            id_cliente: {
              type: 'integer',
              description: 'ID do cliente',
              example: 1
            },
            valor_total: {
              type: 'number',
              format: 'float',
              description: 'Valor total do pedido',
              example: 5799.80
            },
            status: {
              type: 'string',
              description: 'Status do pedido',
              enum: ['pendente', 'processando', 'concluido', 'cancelado'],
              example: 'pendente'
            },
            items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/OrderItem'
              }
            }
          }
        },
        OrderItem: {
          type: 'object',
          required: ['id_produto', 'valor_produto', 'quantidade'],
          properties: {
            id_produto: {
              type: 'integer',
              description: 'ID do produto',
              example: 1
            },
            valor_produto: {
              type: 'number',
              format: 'float',
              description: 'Valor unitário do produto',
              example: 2899.90
            },
            quantidade: {
              type: 'integer',
              description: 'Quantidade do produto',
              example: 2
            }
          }
        },
        User: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'Nome de usuário',
              example: 'admin'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'E-mail do usuário',
              example: 'admin@email.com'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Senha do usuário',
              example: 'senha123'
            }
          }
        },
        Auth: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'E-mail do usuário',
              example: 'admin@email.com'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Senha do usuário',
              example: 'senha123'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error'
            },
            message: {
              type: 'string',
              example: 'Mensagem de erro descritiva'
            },
            errors: {
              type: 'array',
              items: {
                type: 'string'
              },
              example: ['Erro de validação 1', 'Erro de validação 2']
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'success'
            },
            message: {
              type: 'string',
              example: 'Operação realizada com sucesso'
            },
            id: {
              type: 'integer',
              example: 1
            }
          }
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Token de acesso não fornecido ou inválido',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                status: 'error',
                message: 'Token de acesso necessário'
              }
            }
          }
        },
        ValidationError: {
          description: 'Erro de validação dos dados',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                status: 'error',
                message: 'Erro de validação',
                errors: ['CPF inválido', 'E-mail inválido']
              }
            }
          }
        },
        NotFoundError: {
          description: 'Recurso não encontrado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                status: 'error',
                message: 'Cliente não encontrado'
              }
            }
          }
        }
      }
    },
    security: [
      {
        BearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'] // caminho para os arquivos com anotações
};

export const swaggerSpec = swaggerJSDoc(options);