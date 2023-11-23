import { createProjectMutation, createUserMutation, getUserQuery } from "@/graphql"
import { ProjectFormInfo } from "@/types"
import { GraphQLClient } from "graphql-request"

const isProduction = process.env.NODE_ENV === 'production'
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql'
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : '0721'
const serverUrl = isProduction ? "" : 'http://localhost:3000'

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

const fetchToken = async () => {
    try{
        const response = await fetch(`${serverUrl}/api/auth/token`)
        return response.json()
    } catch(error){
        throw error
    }
}
const uploadImage = async (imagePath: string) => {
    try{
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: "POST",
            body: JSON.stringify({path: imagePath})
        })
        
        return response.json()
    } catch(error){
        throw error
    }
}
const createNewProject = async (form: ProjectFormInfo, creatorId: string, token: string) => {
    const imageUrl = await uploadImage(form.image)

    if(imageUrl.url){
        client.setHeader("Authorization", `Bearer ${token}`)

        const variables = {
            input: {
                ...form,
                image: imageUrl.url,
                createdBy:{
                    link: creatorId
                }
            }
        }
        const newProject = makeGraphQlRequest(createProjectMutation, variables)
        return newProject
    }
}
export {getUser, createUser, createNewProject, uploadImage, fetchToken}