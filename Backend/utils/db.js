import mongoose from "mongoose";

const connectDB = async() =>{
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('mongodb connected..')
  }catch (error) {
  console.log(error);
  return res.status(500).json({
    message: "Server error",
    success: false
  });
}
}
export default connectDB