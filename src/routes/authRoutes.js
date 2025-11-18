const express = require("express");
const router = express.Router();

const { login, register, registerCustomer, registerData, saveData ,testData} = require("../controllers/auth");
console.log("authRoutes loaded");
router.post("/register", register);
router.post("/register/customer", registerCustomer);
router.post("/login", login);
//router.post("/save-data", saveData);
router.post("/save-data", saveData);
router.get("/registerData",registerData)
//router.get("/test",testData)


// router.get("/test", (req, res) => {
//   res.json({ success: true, message: "Auth route is working!" });
// });


module.exports = router;


