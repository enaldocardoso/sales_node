import validator from 'validator';

export class Validators {
  static validateCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');
    
    // Verifica se tem 11 dígitos
    if (cpf.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Validação do dígito verificador
    let sum = 0;
    let remainder;
    
    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
  }

  static validatePhone(phone) {
    // Remove caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Valida números brasileiros: (11) 99999-9999 ou 11999999999
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  }

  static validateCEP(cep) {
    // Remove caracteres não numéricos
    const cleanCEP = cep.replace(/\D/g, '');
    
    // CEP deve ter 8 dígitos
    return cleanCEP.length === 8;
  }

  static validateEmail(email) {
    return validator.isEmail(email);
  }

  static formatCPF(cpf) {
    return cpf.replace(/\D/g, '');
  }

  static formatPhone(phone) {
    return phone.replace(/\D/g, '');
  }

  static formatCEP(cep) {
    return cep.replace(/\D/g, '');
  }
}