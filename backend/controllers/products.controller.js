// const InvestmentProduct = require('../models/investmentProduct.model');
// const productDescriptionAI = require('../utils/productDescriptionAI');
// const recommendationAI = require('../utils/recommendationAI');

// exports.createProduct = async (req, res) => {
//   try {
//     // Admin check to be done via middleware (not shown here)
//     const {
//       name,
//       investment_type,
//       tenure_months,
//       annual_yield,
//       risk_level,
//       min_investment,
//       max_investment
//     } = req.body;

//     // Auto-generate description from fields
//     const description = await productDescriptionAI.generate({
//       name,
//       investment_type,
//       tenure_months,
//       annual_yield,
//       risk_level
//     });

//     const product = new InvestmentProduct({
//       name,
//       investment_type,
//       tenure_months,
//       annual_yield,
//       risk_level,
//       min_investment,
//       max_investment,
//       description
//     });

//     await product.save();
//     res.status(201).json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.updateProduct = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const updateFields = req.body;

//     // Re-generate description if important fields change
//     const fieldsForDesc = ['name', 'investment_type', 'tenure_months', 'annual_yield', 'risk_level'];
//     if (fieldsForDesc.some(f => f in updateFields)) {
//       updateFields.description = await productDescriptionAI.generate(updateFields);
//     }

//     const product = await InvestmentProduct.findByIdAndUpdate(productId, updateFields, { new: true });
//     if (!product) return res.status(404).json({ message: 'Product not found' });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.deleteProduct = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     await InvestmentProduct.findByIdAndDelete(productId);
//     res.json({ message: 'Product deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getProducts = async (req, res) => {
//   try {
//     const products = await InvestmentProduct.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.recommendProducts = async (req, res) => {
//   try {
//     const user = req.user; // From auth middleware after verifying JWT
//     const products = await InvestmentProduct.find();
//     const recommended = await recommendationAI.suggest(products, user.risk_appetite);
//     res.json(recommended);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
const InvestmentProduct = require('../models/investmentProduct.model');

exports.createProduct = async (req, res) => {
  try {
    const product = await InvestmentProduct.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const [updated] = await InvestmentProduct.update(req.body, { where: { id: productId } });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    const updatedProduct = await InvestmentProduct.findByPk(productId);
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deleted = await InvestmentProduct.destroy({ where: { id: productId } });
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await InvestmentProduct.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
