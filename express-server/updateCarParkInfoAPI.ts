import express from 'express';
import axios from 'axios';
import { MongoClient } from 'mongodb';

const updateAPI = express.Router();

async function updateDatabase() {
    const response = await axios.get('https://api.data.gov.hk/v1/carpark-info-vacancy?data=info&lang=zh_TW')
    //console.log(response);
    const data = response.data.results;
    //console.log(data)

    const dbName = "carPark";
    const collectionName = "carParkInfo";

    const uri = "mongodb+srv://m001-student:m001-student@sandbox.cgiqc.mongodb.net/?retryWrites=true&w=majority";
    const mongoClient = new MongoClient(uri, { monitorCommands: true });

    const db = mongoClient.db(dbName);
    const collectionData = await db.listCollections().toArray();
    // console.log({ collectionData })

    if (collectionData.length > 0) {
        const existCollectionName = collectionData[0].name
        // console.log({ existCollectionName });
        const checkCollectionExist = (existCollectionName == collectionName);
        // console.log({ checkCollectionExist })

        try {
            // console.log("connect mongoDB successfully!");

            if (checkCollectionExist) {
                const db = mongoClient.db("carPark");
                const collection = db.collection('carParkInfo');

                const result = await collection.drop();
                // console.log("collection drop successfully!");
            }

            const db = mongoClient.db("carPark");
            const collection = db.collection('carParkInfo');

            const result = await collection.insertMany(data)
            console.log(
                `inserted data : ${result.insertedCount}`
            );

        } finally {
            // console.log("disconnecting mongoDB...")
            await mongoClient.close();
            // console.log("mongodb disconnected!")
        }
    }
    else {
        try {
            // console.log("connect mongoDB successfully!");
            const db = mongoClient.db("carPark");
            const collection = db.collection('carParkInfo');

            const result = await collection.insertMany(data)
            console.log(
                `inserted data : ${result.insertedCount}`
            );

        }
        finally {
            // console.log("disconnecting mongoDB...")
            await mongoClient.close();
            // console.log("mongodb disconnected!")
        }
    }
}

setInterval(() => {
    updateDatabase()

    const time = new Date().toLocaleString()
    console.log(`Lastest update time: ${time}`)
}, (1000 * 60) * 5)

export default updateAPI