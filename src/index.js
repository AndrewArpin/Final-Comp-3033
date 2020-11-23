import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer, gql} from 'apollo-server-express';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

var path = '../views/';

const Server = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  server.applyMiddleware({ app });

  await mongoose.connect("mongodb+srv://andrewarpin:Waxer75123@cluster0.2njwl.mongodb.net/Donald?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {useNewUrlParser: true})

  app.set('view engine', 'pug')

  app.get('/', (req, res) => {
    res.render(path + 'index')
  });

  app.listen({port: 3000}, ()=> {
    console.log('Server is running at: localhost:3000')
  })
}

Server();

