exports.generateDescription = async ({ name, type, tenure_months, annual_yield, risk_level }) => {
  return `The ${name} is a ${type} investment with a tenure of ${tenure_months} months, offering an annual yield of ${annual_yield}%, and has a ${risk_level} risk level.`;
};
