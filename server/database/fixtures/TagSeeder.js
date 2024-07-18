const AbstractSeeder = require("./AbstractSeeder");

class TagSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "tag", truncate: true });
  }

  run() {
    // Generate and insert fake data into the 'tag' table
    for (let i = 0; i < 10; i += 1) {
      // Adjust the number of tags as needed
      const fakeTag = {
        name: this.faker.word.adjective(), // Generate a fake tag name
      };

      // Insert the fakeTag data into the 'tag' table
      this.insert(fakeTag);
    }
  }
}

module.exports = TagSeeder;
