import { Categories, Pagination, ProjectCard } from "@/components"
import { fetchAllProjects, getProjectsByCategory } from "@/lib/actions"
import { HomeSearchParamsType, ProjectInterface, ProjectSearch } from "@/types"

const Home = async ({ searchParams: {session, category, endCursor} }: HomeSearchParamsType) => {
  let projectsData
  if(!category){
    projectsData = await fetchAllProjects(endCursor) as ProjectSearch
  }  else {
    projectsData = await getProjectsByCategory(category, endCursor) as ProjectSearch
  }

  const projectsToDisplay = projectsData?.projectSearch?.edges || []
  const userSession = session ? JSON.parse(session) : {}
  const projectsPageInfo = projectsData?.projectSearch?.pageInfo

  return (
    projectsToDisplay.length === 0 ? 
      <section className='flex-start flex-col paddings mb-16'>
        <Categories />
        <p className="no-result-text text0center">No projects found, go create some first.</p>
      </section>
      :
      <section className='flex-start flex-col paddings mb-16'>
        <Categories />
        <section className="projects-grid">
          {
            projectsToDisplay.map(({ node }: { node: ProjectInterface}) => (
              <ProjectCard 
               key={node.id}
               id={node.id}
               image={node.image}
               title={node.title}
               userId={node.createdBy.id}
               userName={node.createdBy.name}
               avatarUrl={node.createdBy.avatarUrl}
               currentUser={userSession}
              />
            ))
          }
        </section>
        <Pagination 
         startCursor={projectsPageInfo.startCursor}
         endCursor={projectsPageInfo.endCursor}
         hasPreviousPage={projectsPageInfo.hasPreviousPage}
         hasNextPage={projectsPageInfo.hasNextPage}
         />
      </section>
  )
}

export default Home