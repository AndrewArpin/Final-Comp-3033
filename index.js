import mongoose from "mongoose";
import express from "express";
import { ApolloServer, gql} from "apollo-server-express";
import { resolver } from "./resolver";
import { typeDefs } from "./typeDefs";

const app = express();
const port = 3000;
var path = __dirname + '/views/'; 

app.set('view engine', 'pug')

const server = async () => {    
    const server = new ApolloServer({
        typeDefs,
        resolver
    })

    server.applyMiddleware({app});
    try{
        await mongoose.connect("mongodb+srv://andrewarpin:Waxer75123@cluster0.2njwl.mongodb.net/DonaldTrumpTweets?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {useNewUrlParser: true})
    }   
    catch(err){
        console.log(err)
    } 
    app.get('/', (req, res) => {
        res.render(path + 'index');        
    });

    app.listen({port: 3000}, ()=> {
        console.log('connected at port  http://localhost:3000')
    })
}

server();

