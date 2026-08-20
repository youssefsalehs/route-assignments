const express = require("express");

const initializeData = require("../controllers/intializer.controller");

const initRouter = express.Router();

initRouter.route("/").post(initializeData);
module.exports = initRouter;
