import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
    return (
        <div className="grid grid-rows-5 sm:grid-cols-1 md:grid-cols-4 flex-grow">
            <div className="row-span-2 col-span-1 p-10">
                <Skeleton className="h-[250px] w-full rounded-xl" />
            </div>
            <div className="row-span-5 col-span-3 p-10">
                <Skeleton className="w-full h-full rounded-xl" />
            </div>
        </div>
    )
}
