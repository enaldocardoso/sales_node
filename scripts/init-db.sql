-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    data_inclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100),
    cep VARCHAR(8),
    municipio VARCHAR(100),
    estado VARCHAR(2),
    endereco VARCHAR(200),
    numero VARCHAR(10),
    complemento VARCHAR(100)
);

-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(200) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    quantidade_estoque INTEGER NOT NULL DEFAULT 0
);

-- Tabela de Pedidos de Venda
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    data_inclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_cliente INTEGER REFERENCES clients(id),
    valor_total DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'processando', 'concluido', 'cancelado'))
);

-- Tabela de Itens do Pedido
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    id_pedido INTEGER REFERENCES orders(id),
    id_produto INTEGER REFERENCES products(id),
    valor_produto DECIMAL(10,2) NOT NULL,
    quantidade INTEGER NOT NULL
);