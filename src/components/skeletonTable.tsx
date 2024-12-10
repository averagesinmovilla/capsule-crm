import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonTable({ columns = 4, rows = 5 }) {
    const rowArray = Array.from({ length: rows });
    const columnArray = Array.from({ length: columns });

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columnArray.map((_, colIndex) => (
                        <TableHead key={`header-${colIndex}`} className={colIndex === columns - 1 ? "text-right" : ""}>
                            <Skeleton className="h-4 w-[100px]" />
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {rowArray.map((_, rowIndex) => (
                    <TableRow key={`row-${rowIndex}`}>
                        {columnArray.map((_, colIndex) => (
                            <TableCell
                                key={`cell-${rowIndex}-${colIndex}`}
                                className={colIndex === columns - 1 ? "text-right" : ""}
                            >
                                <Skeleton className="h-4 w-[100px]" />
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
