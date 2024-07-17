const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const userRouter = require("./User/router");

router.use("/user", userRouter);

/* ************************************************************************* */

module.exports = router;
