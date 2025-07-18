import { Permission } from "node-appwrite";
import { db, voteCollection } from "../name";
import { databases } from "./config";

export default async function createVoteCollection() {
    //creating collection
    await databases.createCollection(db, voteCollection, voteCollection, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users")
    ]) 
    console.log("vote collection is created")

    //creating attribute 
    await Promise.all([
        databases.createEnumAttribute(db, voteCollection, 'type', ["question", "answer"], true),
        databases.createStringAttribute(db, voteCollection, "typeId", 50, true),
        databases.createEnumAttribute(
            db, 
            voteCollection,
            "voteStatus",
            ["upvote", "downvote"],
            true
        ),
        databases.createStringAttribute(db, voteCollection, "voteById", 50, true)
    ])
    console.log("vote collection is created")
}





































