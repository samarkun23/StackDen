import { answerCollection, db, questionCollection, voteCollection } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";

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
            //docs exists so delete the existing vote and 

            // delete this first
            await databases.deleteDocuments(db, voteCollection, [res.documents[0].$id])

            //so you click on that now you remove your vote so we delete your repotations
            const QuestionOrAnswer = await databases.getDocument(
                db,
                type === "question" ? questionCollection : answerCollection, // so if the user click on the question so we grab the questionCollection and if you click on answer its grab the answer collection
                typeId
            );

            const autherPrefs = await users.getPrefs<UserPrefs>(QuestionOrAnswer.autherId)

            //now we change user repotations weather it's inc or dec
            await users.updatePrefs<UserPrefs>(QuestionOrAnswer.authorId, {
                //auther id so come we need to know how we update this
                reputation: res.documents[0].voteStatus === "upvoted" ? Number(autherPrefs.reputation) - 1 : Number(autherPrefs.reputation) + 1
            })
        }

        // means prev vote does not exits or vote status changes
        if (res.documents[0]?.voteStatus !== voteStatus) {
            //
            const doc = await databases.createDocument(db, voteCollection, ID.unique(), {
                type,
                typeId,
                voteStatus,
                votedById
            });
            // handle the repotation inc and dec
            
            const QuestionOrAnswer = await databases.getDocument(
                db,
                type === "question" ? questionCollection : answerCollection, // so if the user click on the question so we grab the questionCollection and if you click on answer its grab the answer collection
                typeId
            );
            const autherPrefs = await users.getPrefs<UserPrefs>(QuestionOrAnswer.autherId)

            //if vote was present 
            
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
                status: 200
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


































