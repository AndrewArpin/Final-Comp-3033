import { Tweet } from "./models/tweets";

export const resolvers = {
    Query:{
        donaldTweets: () => Tweet.find()
    }

}