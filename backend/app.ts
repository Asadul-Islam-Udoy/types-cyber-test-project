import express from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import GlobalErrorHanler from './errors/GlobalErrorHandler';
import UserRouter from "./routers/UserRouter";

/// create object
const app = express();


///access .env file path
dotenv.config({path:'.env'});


///middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

///custom hanlers
app.use(GlobalErrorHanler);



///router middleware
app.use('/api/users',UserRouter);


export default app;