const mongoose = require("mongoose");

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'socialnetwork-api'
    }
)
    .then(() => {
        console.log('📂 Database  connection is ready...');
    })
    .catch((err) => {
        console.log(err);
    })

module.exports = mongoose.connection;
