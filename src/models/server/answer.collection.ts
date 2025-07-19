import {Permission} from 'node-appwrite'
import { db,answerCollection } from '../name'

import { databases } from './config'

export default async function createAnswerCollection() {
    await databases.createCollection(db, answerCollection, answerCollection,[
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        // Permission.write("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("answer collection is created");

    //creating attribute 
    await Promise.all([
        databases.createStringAttribute(db, answerCollection, "content", 10000, true),
        databases.createStringAttribute(db, answerCollection, "questionId", 50, true),
        databases.createStringAttribute(db, answerCollection, "authorId", 50, true),
    ]);
    console.log("Answer Attributes created")
}
























