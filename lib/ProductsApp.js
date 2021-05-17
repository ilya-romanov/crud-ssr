const mongoose = require('mongoose');
const log = console.log;

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })
        log('database is connected');
    } catch(e) { 
        log('An error occurred: ', e);
        process.exit(1);
    }
}

exports.connect = connect; 

