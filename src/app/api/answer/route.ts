import { answerCollection, db } from "@/models/name";
import { databases, users} from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import {UserPrefs} from '@/store/Auth'

export async function POST(req : NextRequest){
    try {
        const {questionId , answer , autherId} = await req.json()

        const response = await databases.createDocument(db, answerCollection, ID.unique(), {
            content: answer,
            autherId: autherId,
            questionId: questionId
        })

        // Increase auther reputation || getPrefs its give you all the prefences that you will work on
        const perfs = await users.getPrefs<UserPrefs>(autherId) 
        await users.updatePrefs(autherId, {
            reputation: Number(perfs.reputation) + 1
        })

        return NextResponse.json(response, {
            status: 201
        })

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

//all the user may be delete their answer
export async function DELETE(req:NextRequest) {
    try {
        const {answerId} = await req.json()
        
        const answer = await databases.getDocument(db, answerCollection , answerId)        

        const response = await databases.deleteDocument(db, answerCollection, answerId)

        //decrease the reputation 
        
    } catch (error: any) {
       return NextResponse.json(
        {
            message: error?.message || "Error deleting the answer"
        },
        {
            status: error?.status || error?.code || 500
        }
       ) 
    } 
}





















