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

//setup server 
const Server = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  //starts gql server (i think)
  server.applyMiddleware({ app });

  //connect to db
  await mongoose.connect("mongodb+srv://andrewarpin:Waxer75123@cluster0.2njwl.mongodb.net/Donald?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {useNewUrlParser: true})
  
 //allows for pictures to be rendered 
  app.use(express.static('views'));
   //sets view engine
  app.set('view engine', 'pug');
  
  //sets cookie
  app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  }));


  app.use(passport.initialize());
  app.use(passport.session());

  //home page
  app.get('/', (req, res) => {
    res.render(path + 'index', {user: req.user});
  });

  //sends to google singin
  app.get('/google', passport.authenticate('google', {
    scope: ['profile']
  }));

  //redirect if not logged in
 app.get('/auth/google/redirect', passport.authenticate('google'), (req,res) => {
   res.redirect('/');
 })

 //shows port 
  app.listen({port: 3000}, ()=> {
    console.log('Server is running at: localhost:3000');
  });

  //logout
  app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
    console.log('logged out');
  });
  

}
// start server and set up routes
Server();

