import {Suspense} from "react"
import {SearchClient} from "@/components/SearchClient"

export default function SearchPage() {
    return (
        <Suspense fallback={null}>
            <SearchClient/>
        </Suspense>
    )
}