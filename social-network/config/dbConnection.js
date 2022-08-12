const mongoose = require("mongoose");

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017socialnetwork-api',
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
