'use client'
import { Modal, ProjectForm } from "@/components"
import { getProjectById } from "@/lib/actions"
import { ParamsType, ProjectInterface } from "@/types"
import { redirect } from "next/navigation"

const EditProject = async ({params: { id }, searchParams:{ session }}: ParamsType) => {
    const result = await getProjectById(id) as { project?: ProjectInterface }
    const project = result.project ? result.project : undefined
    const userSession = session ? JSON.parse(session) : {}
    if(!userSession?.user){
        redirect('/')
    }
    return(
        <div>
            <Modal>
                <h3 className="modal-head-text">Edit the Project</h3>

                <ProjectForm 
                 type="edit"
                 session={userSession} 
                 project={project}/>
            </Modal>
        </div>
    )
}

export default EditProject