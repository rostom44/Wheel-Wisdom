const AbstractSeeder = require("./AbstractSeeder");

class TagSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "tag", truncate: true });
  }

  run() {
    // Generate and insert fake data into the 'tag' table
    const fakeTags = [
      { id: 1, name: "car" },
      { id: 2, name: "turbo" },
      { id: 3, name: "Audi" },
      { id: 4, name: "engine" },
      { id: 5, name: "drift" },
      { id: 6, name: "sport" },
      { id: 7, name: "electric" },
      { id: 8, name: "supercar" },
      { id: 9, name: "sport car" },
      { id: 10, name: "tips" },
      { id: 11, name: "tuning" },
      { id: 12, name: "performance" },
      { id: 13, name: "luxury" },
      { id: 14, name: "safety" },
      { id: 15, name: "suspension" },
      { id: 16, name: "wheels" },
      { id: 17, name: "roadster" },
    ];

    // Insert each tag into the 'tag' table
    fakeTags.forEach((fakeTag) => {
      this.insert(fakeTag);
    });
  }
}

module.exports = TagSeeder;
