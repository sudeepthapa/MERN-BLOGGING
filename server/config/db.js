const mongoose = require('mongoose');


const connectToDatabase = ()=>{
    mongoose.connect(process.env.MONGO_URL, (err)=>{
        if(err){
            console.log(err)
            return
        }
        console.log("DB CONNECTED SUCCESSFULLY.");
    })
}

module.exports = connectToDatabase;