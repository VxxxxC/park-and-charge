import express from 'express';
import axios from 'axios';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config({debug:true});
// console.log(process.env)

const carParkInfo = express.Router();

carParkInfo.get('/', async (req, res, next) => {
    console.log({ 'GET': 'Frontend get request received!' })

    const dbName = "carPark";
    const collectionName = "carParkInfo";

    const uri : any = process.env.MONGODB_URI;
//     console.log({uri})
    const mongoClient = new MongoClient(uri, { monitorCommands: true });

    const db = mongoClient.db(dbName);
    const collectionData = db.collection(collectionName);
    // console.log({ collectionData })
    const data = collectionData.find()

    const result: any = [];
    await data.forEach((item) => result.push(item))

    // console.log(result)


    // console.log("disconnecting mongoDB...")
    await mongoClient.close();
    // console.log("mongodb disconnected!")
    res.json({ res: result })
})

export default carParkInfo;