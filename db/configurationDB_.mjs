import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const URL = process.env.URL;

class MongoDB {
  constructor() {
    if (MongoDB.instance) {
      return MongoDB.instance;
    }
    MongoDB.instance = this;
    this.connected = false;
  }
  async connect() {
    if (this.connected) {
      console.log("Already connected");
      return;
    }
    try {
      await mongoose.connect(URL);
      this.connected = true;
      console.log("Connecting to Mongo db is a success");
    } catch (error) {
      console.log("Connecting to Mongo db is a failure");
      throw error;
    }
  }

  async disconnect(){
    if(!this.connected){
        console.log("Already disconnected");
        return;  
    }
    await mongoose.disconnect(); 
    this.connected  = false; 
    console.log("Disconnected from Mongo db")
  }
}; 

const mongoDB = new MongoDB(); 
export default mongoDB; 
