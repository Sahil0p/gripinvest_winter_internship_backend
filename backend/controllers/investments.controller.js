// const Investment = require('../models/investment.model');
// const InvestmentProduct = require('../models/investmentProduct.model');
// const portfolioInsightAI = require('../utils/portfolioInsightAI');

// exports.invest = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { product_id, amount } = req.body;

//     const product = await InvestmentProduct.findById(product_id);
//     if (!product) return res.status(404).json({ message: 'Product not found' });

//     if (amount < product.min_investment ||
//         (product.max_investment && amount > product.max_investment)) {
//       return res.status(400).json({ message: 'Investment amount not within allowed limits' });
//     }

//     // TODO: Check user balance logic (mocking here)
//     // Fake balance check; Assume always enough balance

//     // Calculate expected return (simple interest approx)
//     const expected_return = (amount * product.annual_yield * (product.tenure_months / 12)) / 100;
//     const maturity_date = new Date();
//     maturity_date.setMonth(maturity_date.getMonth() + product.tenure_months);

//     const investment = new Investment({
//       user_id: userId,
//       product_id,
//       amount,
//       expected_return,
//       maturity_date
//     });

//     await investment.save();

//     res.status(201).json(investment);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getPortfolio = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const investments = await Investment.find({ user_id: userId }).populate('product_id');
//     // AI insights
//     const insights = await portfolioInsightAI.generate(investments);
//     res.json({ investments, insights });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
const Investment = require('../models/investment.model');
const InvestmentProduct = require('../models/investmentProduct.model');

exports.invest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id, amount } = req.body;

    const product = await InvestmentProduct.findByPk(product_id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Validate investment amount within product min/max
    if (amount < product.min_investment || (product.max_investment && amount > product.max_investment)) {
      return res.status(400).json({ message: 'Invalid investment amount' });
    }

    // Calculate expected return (simple interest)
    const expected_return = (amount * product.annual_yield * (product.tenure_months / 12)) / 100;
    const maturity_date = new Date();
    maturity_date.setMonth(maturity_date.getMonth() + product.tenure_months);

    const investment = await Investment.create({
      user_id: userId,
      product_id,
      amount,
      expected_return,
      maturity_date,
      status: 'active',
    });

    res.status(201).json(investment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPortfolio = async (req, res) => {
  try {
    const userId = req.user.id;

    const investments = await Investment.findAll({
      where: { user_id: userId },
      include: [{ model: InvestmentProduct }],
    });

    res.json({ investments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
