import { Permission } from "node-appwrite";
import { questionAttachmentBucket } from "../name";
import { storage } from "./config";

export default async function getOrCreateStrage() {
    try {
        await storage.getBucket(questionAttachmentBucket);
        console.log("Stroge Connected"); 
    } catch (error) {
        try {
            //try to create the storage
            await   storage.createBucket(
                questionAttachmentBucket,
                questionAttachmentBucket,
                [
                    Permission.create("users"),
                    Permission.read("any"),
                    Permission.read("users"),
                    Permission.update("users"),
                    Permission.delete("users")
                ],
                false,
                undefined,
                undefined,
                ["jpg", "png", "gif", "jpeg", "webp", "heic"]
            );
            console.log("Storage Created");
            console.log("Storage Connected")
        } catch (error) {
            console.log("Error creating storage:", error) 
        }
    } 
}



































