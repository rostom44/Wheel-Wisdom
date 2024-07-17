const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all posts from the database
    const posts = await tables.post.readAll();

    // Respond with the posts in JSON format
    res.json(posts);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific post from the database based on the provided ID
    const post = await tables.post.read(req.params.id);

    // If the post is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the post in JSON format
    if (post == null) {
      res.sendStatus(404);
    } else {
      res.json(post);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const add = async (req, res, next) => {
  // Extract the user data from the request body
  const post = req.body;

  try {
    // Insert the user into the database
    const insertId = await tables.user.create(post);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
  } catch (err) {
    console.error("Error creating user:", err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
    next(err);
  }
};

module.exports = { browse, read, add };
