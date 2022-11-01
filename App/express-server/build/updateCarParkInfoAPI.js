"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const mongodb_1 = require("mongodb");
const dotenv = __importStar(require("dotenv"));
dotenv.config({ debug: true });
// console.log(process.env)
const updateAPI = express_1.default.Router();
function updateDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get('https://api.data.gov.hk/v1/carpark-info-vacancy?data=info&lang=zh_TW');
        //console.log(response);
        const data = response.data.results;
        //console.log(data)
        const dbName = "carPark";
        const collectionName = "carParkInfo";
        const uri = process.env.MONGODB_URI;
        const mongoClient = new mongodb_1.MongoClient(uri, { monitorCommands: true });
        const db = mongoClient.db(dbName);
        const collectionData = yield db.listCollections().toArray();
        // console.log({ collectionData })
        if (collectionData.length > 0) {
            const existCollectionName = collectionData[0].name;
            // console.log({ existCollectionName });
            const checkCollectionExist = (existCollectionName == collectionName);
            // console.log({ checkCollectionExist })
            try {
                // console.log("connect mongoDB successfully!");
                if (checkCollectionExist) {
                    const db = mongoClient.db("carPark");
                    const collection = db.collection('carParkInfo');
                    const result = yield collection.drop();
                    // console.log("collection drop successfully!");
                }
                const db = mongoClient.db("carPark");
                const collection = db.collection('carParkInfo');
                const result = yield collection.insertMany(data);
                console.log(`inserted data : ${result.insertedCount}`);
            }
            finally {
                // console.log("disconnecting mongoDB...")
                yield mongoClient.close();
                // console.log("mongodb disconnected!")
            }
        }
        else {
            try {
                // console.log("connect mongoDB successfully!");
                const db = mongoClient.db("carPark");
                const collection = db.collection('carParkInfo');
                const result = yield collection.insertMany(data);
                console.log(`inserted data : ${result.insertedCount}`);
            }
            finally {
                // console.log("disconnecting mongoDB...")
                yield mongoClient.close();
                // console.log("mongodb disconnected!")
            }
        }
    });
}
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    yield updateDatabase();
    const time = new Date().toLocaleString();
    console.log(`Lastest database update time: ${time}`);
}), (1000 * 60) * 15);
exports.default = updateAPI;
