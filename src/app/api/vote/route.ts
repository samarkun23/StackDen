import { db, voteCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function POST(request: NextRequest) {
    try {
        //grab the data
        const { votedById, voteStatus, type, typeId } = await request.json()

        //list document         
        const res = await databases.listDocuments(
            db, voteCollection, [
            Query.equal("type", type),
            Query.equal("typeId", typeId),
            Query.equal("votedById", votedById)
        ]
        )

        if (res.documents.length > 0) {
            //docs exists 
        }

        // means prev vote does not exits or vote status changes
        if (res.documents[0]?.voteStatus !== voteStatus) {
            //
        }

        const [upvotes, downvotes] = await Promise.all([
            databases.listDocuments(db, voteCollection, [
                Query.equal("type", type),
                Query.equal("typeId", typeId),
                Query.equal("voteStatus", "upvoted"),
                Query.equal("votedById", votedById),
                Query.limit(1),
            ]),
            databases.listDocuments(db, voteCollection, [
                Query.equal("type", type),
                Query.equal("typeId", typeId),
                Query.equal("voteStatus", "downvote"),
                Query.equal("votedById", votedById),
                Query.limit(1),
            ]),
        ])

        return NextResponse.json(
            {
                data: {
                    document: null, voteResult: upvotes.total = downvotes.total

                },
                message: "vote handle"
            },
            {
                status:200
            }
        )

    } catch (error: any) {
        return NextResponse.json(
            {
                error: error?.message || "Error in voting"
            },
            {
                status: error?.status || error?.code || 500
            }
        )
    }
}


































