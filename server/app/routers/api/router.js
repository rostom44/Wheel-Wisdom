const express = require("express");
const path = require("path");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const userRouter = require("./User/router");
const postRouter = require("./post/router");
const tagRouter = require("./tag/router");

router.use(
  "/images",
  express.static(path.join(__dirname, "../../../public/assets/images"))
);
router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/tag", tagRouter);

/* ************************************************************************* */

module.exports = router;
