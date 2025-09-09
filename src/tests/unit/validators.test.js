import { Validators } from '../../utils/validators.js';

describe('Validators', () => {
  describe('validateCPF', () => {
    test('Deve validar CPF correto', () => {
      expect(Validators.validateCPF('52998224725')).toBe(true);
      expect(Validators.validateCPF('529.982.247-25')).toBe(true);
    });

    test('Deve rejeitar CPF inválido', () => {
      expect(Validators.validateCPF('11111111111')).toBe(false);
      expect(Validators.validateCPF('123')).toBe(false);
      expect(Validators.validateCPF('')).toBe(false);
    });
  });

  describe('validatePhone', () => {
    test('Deve validar telefone correto', () => {
      expect(Validators.validatePhone('11999999999')).toBe(true);
      expect(Validators.validatePhone('(11) 99999-9999')).toBe(true);
    });

    test('Deve rejeitar telefone inválido', () => {
      expect(Validators.validatePhone('11')).toBe(false);
      expect(Validators.validatePhone('')).toBe(false);
    });
  });

  describe('validateCEP', () => {
    test('Deve validar CEP correto', () => {
      expect(Validators.validateCEP('01234567')).toBe(true);
      expect(Validators.validateCEP('01234-567')).toBe(true);
    });

    test('Deve rejeitar CEP inválido', () => {
      expect(Validators.validateCEP('123')).toBe(false);
      expect(Validators.validateCEP('')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    test('Deve validar email correto', () => {
      expect(Validators.validateEmail('test@email.com')).toBe(true);
    });

    test('Deve rejeitar email inválido', () => {
      expect(Validators.validateEmail('email-invalido')).toBe(false);
    });
  });
});