import { allProjectsQuery, createProjectMutation, createUserMutation, deleteProjectMutation, getProjectByIdQuery, getProjectsOfUserQuery, getUserQuery, projectsQuery, updateProjectMutation } from "@/graphql"
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

const fetchAllProjects = (endCursor?: string) => {
    client.setHeader('x-api-key', apiKey)

    const allProjects = makeGraphQlRequest(allProjectsQuery, { endCursor })
    return allProjects
}

const getProjectsByCategory = (category?: string, endCursor?: string) => {
    client.setHeader('x-api-key', apiKey)

    const allProjects = makeGraphQlRequest(projectsQuery, { category, endCursor })
    return allProjects

}

const getProjectById = (id: string) => {
    client.setHeader('x-api-key',apiKey)

    const project = makeGraphQlRequest(getProjectByIdQuery ,{ id })
    return project
}

const getProjectsByUser = (id: string, last?: number) => {
    client.setHeader('x-api-key',apiKey)

    const projects = makeGraphQlRequest(getProjectsOfUserQuery, { id, last })
    return projects
}

const updateProject = async (form: ProjectFormInfo, id: string, token: string) => {
    client.setHeader("Authorization", `Bearer ${token}`)
    
    // first to check whether the image url is changed or not
    const isBase64DataURL = (value: string) => {
        const base64Regex = /^data:image\/[a-z]+;base64,/;
        return base64Regex.test(value);
      }
    
    let updatedForm = {...form}

    const isUploadingNewImage = isBase64DataURL(form.image)

    if(isUploadingNewImage){
        const imageUrl = await uploadImage(form.image)

        if(imageUrl.url){
            updatedForm = {
                ...updatedForm,
                image: imageUrl.url
            }
        }
    }

    const variables = {
        id: id,
        input: updatedForm
    }
    
    const updatedProject = makeGraphQlRequest(updateProjectMutation, variables)
    return updatedProject
    
}

const deleteProject = (id: string, token: string) => {
    client.setHeader("Authorization", `Bearer ${token}`)

    return makeGraphQlRequest(deleteProjectMutation, { id })
}

export { getUser, createUser, createNewProject, uploadImage, fetchToken, fetchAllProjects,
    getProjectsByCategory, getProjectById, getProjectsByUser, deleteProject, updateProject}