import { useAuthStore } from "@/store/Auth";
import { validateHeaderName } from "http";
import React from "react";

function RegisterPage() {
    const {createAccount, login} = useAuthStore()
    const [isLoading, setIsLoading] = React.useState(false)
    const [error , setError] = React.useState("")    

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //collect data
        const formData = new FormData(e.currentTarget)
        const firstName = formData.get("firstname")
        const lastName = formData.get("lastname") 
        const email = formData.get("email")
        const password = formData.get("password") 

        //validate
        if (!firstName || !lastName || !email || !password) {
            setError(() => "Please fill all the field") 
            return
        }

        //call the store
        setIsLoading(true)
        setError("")

        const response = await createAccount(
            `${firstName} ${lastName}`,
            email?.toString(),
            password?.toString()
        )
        
        if(response.error){
            setError(() => response.error!.message)
        }else{
            const loginResponse = await login(email?.toString(), password?.toString())
            if (loginResponse.error) {
                setError(() => loginResponse.error!.message) 
            }
        }

        setIsLoading(() => false)
    
    }

    return(
        <div>
            {error && (
                <p>{error}</p>
            )}

            <form onSubmit={handleSubmit}>
                
            </form>
        </div>
    )
}

export default RegisterPage










