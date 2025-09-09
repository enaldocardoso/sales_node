-- Limpar dados de teste
TRUNCATE TABLE clients, products, orders, order_items, users RESTART IDENTITY CASCADE;

-- Inserir usuário de teste
INSERT INTO users (username, email, password) VALUES 
('testuser', 'test@email.com', '$2a$12$K9Z5Kp1W5cQ7Q7Q7Q7Q7Q.O5eQ7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7Q7');

-- Inserir clientes de teste
INSERT INTO clients (cpf, nome, telefone, email, cep, municipio, estado, endereco, numero, complemento) VALUES 
('52998224725', 'Cliente Teste', '11999999999', 'cliente@teste.com', '01234567', 'São Paulo', 'SP', 'Rua Teste', '123', 'Apto 1'),
('12345678909', 'Outro Cliente', '11888888888', 'outro@teste.com', '01234568', 'Rio de Janeiro', 'RJ', 'Av. Teste', '456', 'Sala 2');

-- Inserir produtos de teste
INSERT INTO products (descricao, valor, quantidade_estoque) VALUES 
('Produto Teste 1', 100.00, 50),
('Produto Teste 2', 200.00, 30),
('Produto Teste 3', 300.00, 20);