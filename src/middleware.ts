import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import  getOrCreateDB from './models/server/dbSetUp'
import getOrCreateStrage from "./models/server/storageSetup";


export async function middleware(request: NextRequest){

    await Promise.all([
        getOrCreateDB(),
        getOrCreateStrage()
    ]) 
    return NextResponse.next()
}

export const config = {
    /*
        Dont want to run that middleware 
        - api
        - _next/static
        - _next/image
        - favicon.com
    */
    macher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)"
    ],
}










































