import { getFriendLinkListServer } from "@/lib/api/friend-link.server"
import LinksClient from "./LinksClient"

export default async function Links() {
    const initialFriendLinks = await getFriendLinkListServer({ currentPage: 1, pageSize: 8 })

return <LinksClient 
        initialFriendLinks={initialFriendLinks?.records || []} 
totalPages={initialFriendLinks?.pages || 0}
        currentPage={initialFriendLinks?.current || 1}
        total={initialFriendLinks?.total || 0}
    />
}
