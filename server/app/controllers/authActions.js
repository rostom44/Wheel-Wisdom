// File: controllers/authActions.js
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

// eslint-disable-next-line consistent-return
const login = async (req, res, next) => {
  try {
    const user = await tables.user.readByEmail(req.body.email);

    if (user === null) {
      return res.sendStatus(422);
    }

    const verified = await argon2.verify(user.password, req.body.password);

    if (verified) {
      delete user.password;
      const token = jwt.sign({ sub: user.id }, process.env.APP_SECRET, {
        expiresIn: "1h",
      });

      res
        .cookie("access_token", token, {
          httpOnly: true,
          sameSite: "Lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: 3600000,
        })
        .json({ user });
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
};
