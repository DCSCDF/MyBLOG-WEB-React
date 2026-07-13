import { getFriendLinkListServer } from "@/lib/api/friend-link.server"
import LinksClient from "./LinksClient"

export default async function Links() {
    const initialFriendLinks = await getFriendLinkListServer({ currentPage: 1, pageSize: 50 })

    return <LinksClient initialFriendLinks={initialFriendLinks?.records || []} />
}
