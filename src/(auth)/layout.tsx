import { useAuthStore } from "@/store/Auth"
import { useRouter } from "next/router"
import React from "react"

const Layout = ({children}: {children: React.ReactNode}) => 
{
    //just asking the session is there or not session is allready here than there is no sense to having a user in register or login
    const {session} = useAuthStore()
    const router = useRouter()
    
    React.useEffect(() => {
        if(session){
            router.push("/")
        }
    },[session, router])

    if (session) {
        return null 
    }

    return (
        <div className="">
            <div className="">
                {children}
            </div>
        </div>
    )
}


export default Layout