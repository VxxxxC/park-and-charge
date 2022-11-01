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
const mongodb_1 = require("mongodb");
const dotenv = __importStar(require("dotenv"));
dotenv.config({ debug: true });
// console.log(process.env)
const carParkInfo = express_1.default.Router();
carParkInfo.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ 'POST': 'Frontend post request received!' });
    const dbName = "carPark";
    const collectionName = "carParkInfo";
    const uri = process.env.MONGODB_URI;
    //     console.log({uri})
    const mongoClient = new mongodb_1.MongoClient(uri, { monitorCommands: true });
    const db = mongoClient.db(dbName);
    const collectionData = db.collection(collectionName);
    // console.log({ collectionData })
    const data = collectionData.find();
    const result = [];
    yield data.forEach((item) => result.push(item));
    // console.log(result)
    // console.log("disconnecting mongoDB...")
    yield mongoClient.close();
    // console.log("mongodb disconnected!")
    res.json({ res: result });
}));
exports.default = carParkInfo;
