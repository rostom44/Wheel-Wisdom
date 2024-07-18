const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { browse, read, add } = require("../../../controllers/UserActions");
const { login } = require("../../../controllers/authActions");
const { hashPassword } = require("../../../services/auth");
// const { verifyCookie } = require("../../../services/auth");

// Route to get a list of items
router.get("/", browse);

// Route to get a specific item by ID
router.get("/:id", read);

// Route to add a new item
router.post("/", hashPassword, add);

// Route to login
router.post("/login", login);

/* ************************************************************************* */

module.exports = router;
