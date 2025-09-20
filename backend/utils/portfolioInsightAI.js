exports.generateInsights = async (investments) => {
  const totalAmount = investments.reduce((sum, inv) => sum + parseFloat(inv.amount), 0);
  const riskDistribution = {};

  investments.forEach(inv => {
    const risk = inv.InvestmentProduct.risk_level;
    riskDistribution[risk] = (riskDistribution[risk] || 0) + parseFloat(inv.amount);
  });

  Object.keys(riskDistribution).forEach(key => {
    riskDistribution[key] = ((riskDistribution[key] / totalAmount) * 100).toFixed(2) + '%';
  });

  return {
    totalInvested: totalAmount.toFixed(2),
    riskDistribution,
    recommendation: 'Consider diversifying your portfolio if risk is heavily skewed.'
  };
};
