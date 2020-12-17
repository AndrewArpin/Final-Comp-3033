import { Tweet } from "./models/tweets";

export const resolvers = {
    // my query 
    Query:{
        donaldTweets: () => Tweet.find()
    },
    // create record
    Mutation: {
        createTweet: async(_, {text, isRetweet, device , favourites, retweets, date}) => {
            const tweet = new Tweet({
                text,
                isRetweet,
                device ,
                favourites,
                retweets,
                date
            });
            await tweet.save();
            return tweet;
        }
    }
}