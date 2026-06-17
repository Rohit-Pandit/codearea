import mongoose from "mongoose";


const connectDB = async () => {

    try{
      const conn = await mongoose.connect(process.env.MONGO_URI)
      console.log('Connected to MongoDB');
    }
    catch(e){
        console.error('Error connecting to MongoDB:', e);
    }

}
export default connectDB;