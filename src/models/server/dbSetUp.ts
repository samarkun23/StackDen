import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comments.collection";
import createQuestionCollection from "./quetions.collection";
import createVoteCollection from "./vote.collection";

import { databases } from "./config";

export default async function getOrCreateDB() {
    try {
        await databases.get(db)
        console.log("Database connected") 
    } catch (error) {
        try {
            // creating the db
            await databases.create(db, db) 
            console.log("database created")
            //creating the collections
            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createCommentCollection(),
                createVoteCollection() ,

            ])
            console.log("Collection created successfully")
            console.log("Database connected")
        } catch (error) {
            console.log("Error creating databases or collection", error) 
        } 
    }
    return databases 
}


























