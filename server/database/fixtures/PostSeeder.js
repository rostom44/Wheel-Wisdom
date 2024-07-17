const fs = require("fs");
const path = require("path");
const AbstractSeeder = require("./AbstractSeeder");

const pics = path.join(__dirname, "../../public/images");

class PostSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "post", truncate: true });
  }

  async run() {
    try {
      // Fetch image files from the directory
      const imageFiles = fs.readdirSync(pics);

      // Generate and insert fake data into the 'post' table
      const posts = imageFiles.map((image) => ({
        title: this.faker.lorem.sentence(), // Generate a fake title
        publish_date: this.faker.date.past(), // Generate a fake past date
        content: this.faker.lorem.paragraphs(), // Generate fake paragraphs of content
        image: `images/${image}`,
      }));

      // Insert each post into the 'post' table
      posts.forEach((post) => {
        this.insert(post); // Utilize the insert method inherited from AbstractSeeder
      });

      // Wait for all insert operations to complete
      await Promise.all(this.promises);
    } catch (error) {
      console.error("Error in PostSeeder run:", error);
      throw error; // Propagate the error further if needed
    }
  }
}

module.exports = PostSeeder;
