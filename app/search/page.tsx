import {Suspense} from "react"
import {SearchClient} from "@/components/SearchClient"

export default function SearchPage() {
    return (
        <Suspense fallback={
            <section className="mt-24 px-4 py-4 flex justify-center md:mx-8">
                <div className="flex flex-col max-w-4xl w-full ">
                    <div className="h-9 bg-muted rounded animate-pulse mb-4"/>
                    <div className="h-4 w-32 bg-muted rounded animate-pulse mb-6"/>
                    <div className="space-y-6">
                        {Array.from({length: 3}).map((_, i) => (
                            <div key={i} className="h-32 bg-muted rounded animate-pulse"/>
                        ))}
                    </div>
                </div>
            </section>
        }>
            <SearchClient/>
        </Suspense>
    )
}