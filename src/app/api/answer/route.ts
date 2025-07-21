import { answerCollection, db } from "@/models/name";
import { databases} from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";


export async function POST(req : NextRequest){
    try {
        const {questionId , answer , autherId} = await req.json()

        const response = await databases.createDocument(db, answerCollection, ID.unique(), {
            content: answer,
            autherId: autherId,
            questionId: questionId
        })

        // Increase auther reputation
       

    } catch (error:any) {
        return NextResponse.json(
            {
                error: error?.message || "Error creating answer"
            },
            {
                status: error?.status || error?.code || 500
            } 
        ) 
    }
}