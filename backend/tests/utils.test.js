const otpUtil = require('../utils/otp');
const passwordStrengthAI = require('../utils/passwordStrengthAI');
const productDescriptionAI = require('../utils/productDescriptionAI');
const recommendationAI = require('../utils/recommendationAI');
const portfolioInsightAI = require('../utils/portfolioInsightAI');
const logSummaryAI = require('../utils/logSummaryAI');

describe('Utility Functions Tests', () => {

  test('OTP generation produces 6 digit numeric string', () => {
    const otp = otpUtil.generateOTP();
    expect(otp).toMatch(/^\d{6}$/);
  });

  test('Password strength checker identifies weak passwords', () => {
    const weakPass = 'abc';
    const result = passwordStrengthAI.check(weakPass);
    expect(result.strong).toBe(false);
    expect(result.suggestions.length).toBeGreaterThan(0);
  });

  test('Password strength checker passes strong password', () => {
    const strongPass = 'Abcd1234!';
    const result = passwordStrengthAI.check(strongPass);
    expect(result.strong).toBe(true);
  });

  test('Product description AI generates description string', async () => {
    const product = {
      name: 'Safe Bond',
      investment_type: 'bond',
      tenure_months: 24,
      annual_yield: 6.5,
      risk_level: 'low',
    };
    const desc = await productDescriptionAI.generate(product);
    expect(desc).toContain(product.name);
    expect(desc).toContain(product.investment_type);
  });

  test('Recommendation AI suggests top products filtered by risk', async () => {
    const products = [
      { risk_level: 'high', annual_yield: 8 },
      { risk_level: 'moderate', annual_yield: 5 },
      { risk_level: 'moderate', annual_yield: 7 },
      { risk_level: 'low', annual_yield: 3 }
    ];
    const suggestions = await recommendationAI.suggest(products, 'moderate');
    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions.every(p => p.risk_level === 'moderate')).toBe(true);
  });

  test('Portfolio insight AI returns structure with keys', async () => {
    const investments = [
      { amount: 1000, expected_return: 50, product_id: { risk_level: 'low' } },
      { amount: 2000, expected_return: 100, product_id: { risk_level: 'moderate' } }
    ];
    const insights = await portfolioInsightAI.generate(investments);
    expect(insights).toHaveProperty('totalInvestment');
    expect(insights).toHaveProperty('totalExpectedReturn');
    expect(insights).toHaveProperty('riskDistribution');
  });

  test('Log summary AI counts errors correctly', async () => {
    const logs = [
      { error_message: 'Error A' },
      { error_message: 'Error A' },
      { error_message: 'Error B' },
      { error_message: null },
      { error_message: 'Error C' }
    ];
    const summary = await logSummaryAI.summarize(logs);
    expect(summary).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ error_message: 'Error A', count: 2 }),
        expect.objectContaining({ error_message: 'Error B', count: 1 }),
        expect.objectContaining({ error_message: 'Error C', count: 1 }),
      ])
    );
  });

});
