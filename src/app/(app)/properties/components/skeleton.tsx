import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
    return (
        <div className="flex p-10">
            <div className="w-3/4 h-[calc(100vh-0px)] mr-5">
                <Skeleton className="w-full h-4/5 rounded-xl" />
            </div>
            <div className="w-1/4 h-[calc(100vh-0px)]">
                <Skeleton className="w-full h-2/5 rounded-xl" />
            </div>
        </div>
    )
}
