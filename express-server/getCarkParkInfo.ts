import express from 'express';
import axios from 'axios';
import { MongoClient } from 'mongodb';

const carParkInfo = express.Router();

carParkInfo.get('/', async (req, res, next) => {
    console.log({ 'GET': 'Frontend get request received!' })


    const dbName = "carPark";
    const collectionName = "carParkInfo";

    const uri = "mongodb+srv://m001-student:m001-student@sandbox.cgiqc.mongodb.net/?retryWrites=true&w=majority";
    const mongoClient = new MongoClient(uri, { monitorCommands: true });

    const db = mongoClient.db(dbName);
    const collectionData = db.collection(collectionName);
    // console.log({ collectionData })
    const data = collectionData.find()

    const result: any = [];
    await data.forEach((item) => result.push(item))

    // console.log(result)


    console.log("disconnecting mongoDB...")
    await mongoClient.close();
    console.log("mongodb disconnected!")
    res.json({ res: result })
})

export default carParkInfo;