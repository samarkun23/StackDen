import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
//these library require me from zustand side    

import {AppwriteException, ID, Models} from 'appwrite'
import { account } from "@/models/client/config";


export interface UserPrefs {
    reputation: number
}

interface IAuthStore {
    //what all the data will come up this inc variables and the methods
    session: Models.Session | null;
    jwt: string | null;
    user: Models.User<UserPrefs> | null
    hydrated: boolean

    setHydrated(): void;
    verfiySession(): Promise<void>;
    //desing login 
    login(
        email: string,
        password: string,
    ): Promise<{success: boolean; error?: AppwriteException | null}>
}





















