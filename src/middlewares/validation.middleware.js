import { Validators } from '../utils/validators.js';

export const validateClient = (req, res, next) => {
  const { cpf, telefone, cep, email, ...rest } = req.body;

  const errors = [];

  // Validar CPF
  if (cpf && !Validators.validateCPF(cpf)) {
    errors.push('CPF inválido');
  }

  // Validar telefone
  if (telefone && !Validators.validatePhone(telefone)) {
    errors.push('Telefone inválido. Use o formato (11) 99999-9999');
  }

  // Validar CEP
  if (cep && !Validators.validateCEP(cep)) {
    errors.push('CEP inválido. Deve conter 8 dígitos');
  }

  // Validar e-mail
  if (email && !Validators.validateEmail(email)) {
    errors.push('E-mail inválido');
  }

  // Campos obrigatórios
  const requiredFields = ['cpf', 'nome', 'email'];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      errors.push(`Campo ${field} é obrigatório`);
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Erro de validação',
      errors
    });
  }

  // Formatar campos antes de salvar
  if (cpf) req.body.cpf = Validators.formatCPF(cpf);
  if (telefone) req.body.telefone = Validators.formatPhone(telefone);
  if (cep) req.body.cep = Validators.formatCEP(cep);

  next();
};