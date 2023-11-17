import { createUserMutation, getUserQuery } from "@/graphql"
import { GraphQLClient } from "graphql-request"

const isProduction = process.env.NODE_ENV === 'production'
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql'
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : '0721'

const client = new GraphQLClient(apiUrl)
const makeGraphQlRequest = async (query: string, variables = {}) => {
    try{
        const response = await client.request(query, variables)
        return response
    } catch(error){
        throw error
    }
}

const getUser = (email: string) => {
    client.setHeader('x-api-key', apiKey)
    const user = makeGraphQlRequest(getUserQuery, {email})
    return user
}

const createUser = (name: string, email: string, avatarUrl: string) => {
    client.setHeader('x-api-key', apiKey)
    const variables = {
        input: {
            name: name, 
            email: email, 
            avatarUrl: avatarUrl
        }
    }

    const newUser = makeGraphQlRequest(createUserMutation, variables)
    return newUser
}

export {getUser, createUser}