const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all tags from the database
    const tags = await tables.tag.readAll();

    // Respond with the tags in JSON format
    res.json(tags);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific tag from the database based on the provided ID
    const tag = await tables.tag.read(req.params.id);

    // If the tag is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the tag in JSON format
    if (tag == null) {
      res.sendStatus(404);
    } else {
      res.json(tag);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const add = async (req, res, next) => {
  // Extract the user data from the request body
  const tag = req.body;

  try {
    // Insert the user into the database
    const insertId = await tables.user.create(tag);

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

const getPostsByTag = async (req, res, next) => {
  try {
    const posts = await tables.tag.getPostsByTag(req.params.id);
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

module.exports = { browse, read, add, getPostsByTag };
