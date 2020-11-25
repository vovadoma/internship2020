import User from "./User";
import mongoose from "mongoose";

export default {
    connect: (uri: String, dbName: String) =>
        mongoose.connect(`${uri}/${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }),
    User,
};