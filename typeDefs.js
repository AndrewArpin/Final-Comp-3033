import { gql } from 'apollo-server-express';

export const typeDefs = gql`
type Query {
    tweets: [Tweet!]!
}

type Tweet {
    id: ID!
    text: String!
    isRetweet: String!
    device:String!
    favorites:String!
    retweets:String!
    date:String!
}
`;