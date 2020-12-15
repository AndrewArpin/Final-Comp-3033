import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer, gql} from 'apollo-server-express';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys')
var path = '../views/';
const cookieSession = require('cookie-session');
//const auth = require('./profile')

const Server = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  server.applyMiddleware({ app });

  await mongoose.connect("mongodb+srv://andrewarpin:Waxer75123@cluster0.2njwl.mongodb.net/Donald?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {useNewUrlParser: true})

  app.use(express.static('views'));
  app.set('view engine', 'pug');
  app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  }));


  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/', (req, res) => {
    res.render(path + 'index', {user: req.user});
  });

  app.get('/google', passport.authenticate('google', {
    scope: ['profile']
  }));

 app.get('/auth/google/redirect', passport.authenticate('google'), (req,res) => {
   res.redirect('/');
 })

  app.listen({port: 3000}, ()=> {
    console.log('Server is running at: localhost:3000');
  });

  app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
    console.log('logged out');
  });
  

}

Server();

