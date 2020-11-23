import { gql } from 'apollo-server-express';

export const typeDefs = gql`

type Query {
    donaldTweets: [Tweet!]!
}

type Tweet{
    id: ID!
    text: String!
    isRetweet: String!
    device: String!
    favourites: String!
    retweets: String!
    date: String!
}



`;