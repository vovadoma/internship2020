import express, { Request, Response, NextFunction } from 'express';
import { authRouter, profileRouter } from "./src/router/";
import bodyParser from 'body-parser'
import models from "./src/models";
import { MONGO_DB_URI, MONGO_DB_NAME, PORT, HOST } from "./config/default.json"

const server = async () => {
    try {
        const app = express();
        await models.connect(MONGO_DB_URI, MONGO_DB_NAME);
        app.use((req: Request, res: Response, next: NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
            res.header(
                "Access-Control-Allow-Headers",
                "Content-Type, cache-control, pragma, Authorization"
            );
            next();
        })
        app.use(express.json());
        app.use(bodyParser.urlencoded({ extended: true }));    // Middleware for reading request body
        app.use('/static', express.static('uploads'));
        app.use("/api", authRouter, profileRouter)

        app.listen(PORT, HOST, () => {
            console.log(`server has been started on port: ${PORT}`);
        })
    }
    catch (e) {
        console.log("Server error: " + e.message);
        process.exit(1);
    }
}
server()
