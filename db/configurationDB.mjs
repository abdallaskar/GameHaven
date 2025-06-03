import mongoose from "mongoose";


const connectMongoDB = async (MONGODB_URI) => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}



export default connectMongoDB;