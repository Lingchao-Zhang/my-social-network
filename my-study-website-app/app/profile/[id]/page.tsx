import { ProfilePage } from "@/components"
import { getProjectsByUser } from "@/lib/actions"
import { ParamsType, UserProfile } from "@/types"

const UserProfile = async ({params: { id }, searchParams: { session }}: ParamsType) => {
    const result = await getProjectsByUser(id) as {user?: UserProfile}
    const userSession = session ? JSON.parse(session) : {}

    return(
        result?.user ?
        <ProfilePage 
         user={result?.user}
         currentUser={userSession}
         />
         :
        <></>
    )
}

export default UserProfile