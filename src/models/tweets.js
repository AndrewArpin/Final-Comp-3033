import mongoose from 'mongoose';

// tweet model
export const Tweet = mongoose.model("Tweet", { 
    text: String, 
    isRetweet: String, 
    device: String, 
    favourites: String, 
    retweets: String, 
    date: String});