'use client'
import { Modal, ProjectForm } from "@/components"
import { redirect, useSearchParams } from "next/navigation"

const CreateProject = () => {
    const sessionParam = useSearchParams().get('session')
    const userSession = sessionParam ? JSON.parse(sessionParam) : {user: {}}

    if(!userSession?.user){
        redirect('/')
    }
    return(
        <div>
            <Modal>
                <h3 className="modal-head-text">Create a New Project</h3>

                <ProjectForm 
                 type="create"
                 session={userSession} />
            </Modal>
        </div>
    )
}

export default CreateProject