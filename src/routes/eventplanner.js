const express = require("express");
const router = express.Router();
const {
  upload,       
  eventplan,
  showAllEvent,
  updateClient,
  sendEmailApproved,
  sendEmailRejected,
  homeDataPost,
  homeDataGet,
  updateHomePost,
  deletePost,
  addServices,
  getAllServices,
  deleteSeervices,
  updateService,
  getServiceById
} = require("../controllers/eventplan.js");

router.post("/event", eventplan);
router.get("/showAllEvent", showAllEvent);
router.put("/update/:id", updateClient);
router.post("/sendApproved/:id", sendEmailApproved);
router.post("/sendEmailRejected/:id", sendEmailRejected);
router.post("/homeScreen", upload.single("image"), homeDataPost);
router.get("/homeScreen", homeDataGet);
// PUT route for updating - must be before the generic routes to avoid conflicts
router.put("/homeScreen/:id", upload.single("image"), updateHomePost);
router.post("/deletePlan/:id", deletePost)
router.get("/getAllServices", getAllServices)
router.delete("/deleteSeervices/:id", deleteSeervices)
router.post("/addServices", upload.single("image"), addServices)
router.get("/services/:id", getServiceById)
router.put("/services/:id", upload.single("image"), updateService)

module.exports = router;
