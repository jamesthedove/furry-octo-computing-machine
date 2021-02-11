const mongoose = require('mongoose');

module.exports = {
    async connect(uri = process.env.DATABASE_URI){
        await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'database connection error:'));
        db.once('open', function() {
           console.log('Connected to MongoDB');
        });

    }
}
