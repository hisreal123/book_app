const mongoose = require('mongoose')

const connectDB = async () => {
    try
    {
        mongoose.set('strictQuery', false)
        const conn = await mongoose.connect(process.env.MONGODB_URI, {family:4});
        console.log(`Database connected ${conn.connection.host}`)
    }catch(error)
    {
        console.log();
        process.exit(1);
    }
}

module.exports = connectDB;