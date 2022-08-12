// add database connection
const db = require("./dbConnection");

const User = require('../models/User')
const Post = require('../models/Post')

db.once("open", async () => {

    await User.deleteMany();
    console.log("users seeded");

    await Post.deleteMany();
    console.log('Posts seeded');

    process.exit();
});
