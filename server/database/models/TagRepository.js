const AbstractRepository = require("./AbstractRepository");

class TagRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "post" as configuration
    super({ table: "tag" });
  }

  // The C of CRUD - Create operation

  async create(tag) {
    if (!tag.name || tag.name.trim() === "") {
      throw new Error("Tag name cannot be empty");
    }
    // Execute the SQL INSERT query to add a new tag to the "tag" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name) values (?)`,
      [tag.name]
    );

    // Return the ID of the newly inserted tag
    return result.insertId;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific post by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the post
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all posts from the "post" table, ordered by publish_date in descending order
    const [rows] = await this.database.query(
      `select * from ${this.table} ORDER BY name ASC`
    );

    // Return the array of posts
    return rows;
  }

  async linkPostTag(postId, tagId) {
    const [result] = await this.database.query(
      `INSERT INTO post_tags (post_id, tag_id) VALUES (?, ?)`,
      [postId, tagId]
    );

    return result.insertId;
  }

  async getPostsByTag(tagId) {
    const [rows] = await this.database.query(
      `SELECT p.id, p.title, p.content, p.publish_date 
       FROM post p 
       JOIN post_tags pt ON p.id = pt.post_id 
       WHERE pt.tag_id = ?`,
      [tagId]
    );

    return rows;
  }
}

module.exports = TagRepository;
