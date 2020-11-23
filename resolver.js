
import { Tweets } from "./models/tweets";

export const resolver = {
    Query:{
        tweet:()=>Tweets.find()
    }
}
