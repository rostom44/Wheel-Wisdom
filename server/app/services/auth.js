const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// Set the options for password hashing using the argon2 algorithm
// - type: The type of argon2 algorithm to use (argon2id in this case)
// - memoryCost: The memory cost, where the memory cost is the number of kibibytes of memory to use
// - timeCost: The time cost, where the time cost is the number of iterations to perform
// - parallelism: The degree of parallelism, where the degree of parallelism is the number of threads to use
const hashingOptions = {
  type: argon2.argon2id, // Use argon2id algorithm
  memoryCost: 19 * 2 ** 10, // Use 19 KiB of memory
  timeCost: 2, // Perform 2 iterations
  parallelism: 1, // Use 1 thread
};

const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
};

const verifyCookie = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.sendStatus(401).json({ error: "No token provided" });
    }
    req.auth = jwt.verify(token, process.env.APP_SECRET);
    return next();
  } catch (err) {
    return res.status(404).json({ error: "An error occurred" });
  }
};

module.exports = {
  hashPassword,
  verifyCookie,
};
