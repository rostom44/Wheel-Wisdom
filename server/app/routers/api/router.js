const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const userRouter = require("./User/router");
const postRouter = require("./post/router");

router.use("/user", userRouter);
router.use("/post", postRouter);

/* ************************************************************************* */

module.exports = router;
