import mongoose from "mongoose"
export const Tweets = mongoose.model("Tweets",{text: String, 
    isRetweet: String, 
    device:String, 
    favorites:String, 
    retweets:String, 
    date:String});
