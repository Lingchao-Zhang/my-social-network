"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { deleteProject, fetchToken } from '@/lib/actions'
import { ProjectActionsType } from '@/types'
import { createQueryString } from '@/utils'

const ProjectActions = ({ projectId, currentUser }: ProjectActionsType) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    
    const handleDeleteProject = async () => {
        setIsDeleting(true)
        
        const { token } = await fetchToken();

        try {
            await deleteProject(projectId, token);
            alert('You have successfully deleted the project!')
            router.back();
        } catch (error) {
            throw error
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <>
            <Link href={`/edit-project/${projectId}?${createQueryString('session', JSON.stringify(currentUser))}`} className="flexCenter edit-action_btn">
                <Image src="/pencil.svg" width={15} height={15} alt="edit" />
            </Link>

            <button
                type="button"
                disabled={isDeleting}
                className={`flexCenter delete-action_btn ${isDeleting ? "bg-gray" : "bg-primary-purple"}`}
                onClick={handleDeleteProject}
            >
                <Image src="/trash.svg" width={15} height={15} alt="delete" />
            </button>
        </>
    )
}

export default ProjectActions