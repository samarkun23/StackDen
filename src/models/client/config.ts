import env from "@/app/emv";
import { Client, Account , Avatars, Databases, Storage} from "appwrite";

const client = new Client()
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId); // Your project ID

const databases = new Databases(client)
const account = new Account(client);
const avatars = new Avatars(client);
const stroage = new Storage(client);


export {client, databases, account,avatars,stroage}

