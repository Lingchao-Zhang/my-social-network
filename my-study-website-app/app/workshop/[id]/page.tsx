import { ProjectCard } from "@/components"
import { getProjectsByUser } from "@/lib/actions"
import { ParamsType, ProjectInterface, UserProfile } from "@/types"

const UserWorkShop = async ({params: { id }, searchParams: { session }}: ParamsType) => {

    const result = await getProjectsByUser(id) as {user?: UserProfile}
    const projects = result?.user?.projects.edges ? result.user.projects.edges : []
    const userSession = session ? JSON.parse(session) : {}

    return(
        projects.length === 0 ?
        <></>
        :
        <section className="projects-grid">
            {
                projects.map(({ node }: { node: ProjectInterface}) => (
                    <ProjectCard 
                     key={node.id}
                     id={node.id}
                     title={node.title}
                     image={node.image}
                     userId={node.createdBy.id}
                     userName={node.createdBy.name}
                     avatarUrl={node.createdBy.avatarUrl}
                     currentUser={userSession}
                     />
                ))
            }
        </section>
    )
}

export default UserWorkShop