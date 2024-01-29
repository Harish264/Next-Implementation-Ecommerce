import mongoose  from "mongoose";

export const connect = async()=>{
    try {
        mongoose.connect(process.env.MONGO_URI)
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log("MondoDb connected Successfully")
        })
        connection.on('error',(err)=>{
            console.log('MongoDb connection error. Please make sure MongoDb is running',err);
            process.exit()
        })
    } catch (error) {
        console.log("Something goes wrong")
        console.log(error)
    }
}