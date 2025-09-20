exports.suggestProducts = (products, userRisk) => {
  const riskLevels = ['low', 'moderate', 'high'];
  const maxRiskIndex = riskLevels.indexOf(userRisk);

  const suitable = products.filter(p => riskLevels.indexOf(p.risk_level) <= maxRiskIndex);
  suitable.sort((a, b) => b.annual_yield - a.annual_yield);

  return suitable.slice(0, 3);
};
