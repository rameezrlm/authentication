const express = require("express");
const registerUser = require('../controllers/registerUser')
const logInUser = require('../controllers/logInUser')
const saveContact = require('../controllers/saveContact')
const showContact = require('../controllers/showContact')
const routes = express.Router();

routes.post("/register", registerUser);
routes.post("/login",logInUser);
routes.post("/save",saveContact);
routes.get("/show",showContact);
module.exports = routes;
