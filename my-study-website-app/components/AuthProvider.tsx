"use client"
import { Provider, Providers } from "@/types"
import { getProviders, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const AuthProvider = () => {
    const router = useRouter()
    const [providers, setProviders] = useState<Providers | null>(null)
    const fetchProviders = async () => {
        const newProviders = await getProviders()
        setProviders(newProviders)
    }
    
    useEffect(() => {
        fetchProviders()
    },[])
    return(
        <>
        <div className="flex justify-center items-center text-center gap-4">
            <button onClick={() => router.push('/UserSignIn')} className="bg-violet-400 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded">
                Sign In
            </button>
            <button onClick={() => router.push('/UserSignUp')} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Sign Up
            </button>
        </div>
        {
            providers ? 
            (<div>
                {
                    Object.values(providers).map((provider: Provider) => (
                        <button key={provider.id} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                                onClick={() => signIn(provider.id)}>
                        Sign In using {provider.id}
                        </button>
                    ))
                }
            </div>)
            :
            <></>
        }
    </>
    )
}

export default AuthProvider
