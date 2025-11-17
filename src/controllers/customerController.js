// const Customer = require("../models/customer");

// // ✅ Get all customers
// const getAllCustomers = async (req, res) => {
//   try {
//     const customers = await Customer.find();
//     res.status(200).json(customers);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Delete a customer
// const deleteCustomer = async (req, res) => {
//   try {
//     await Customer.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Customer deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Update customer details
// const updateCustomer = async (req, res) => {
//   try {
//     const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Export all functions
// module.exports = { getAllCustomers, deleteCustomer, updateCustomer };
