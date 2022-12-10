
import express from 'express';
import axios from 'axios';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config({debug:true});

const updateCarChargeAPI = express.Router(); 


export default updateCarChargeAPI;
