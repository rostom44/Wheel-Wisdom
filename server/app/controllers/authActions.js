const tables = require("../../database/tables");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await tables.user.readByEmail(email);
    if (!user) {
      res.json({ error: "User not found" });
    } else if (user.password !== password) {
      res.json({ error: "Invalid password" });
    } else {
      res.json({ user });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
};
