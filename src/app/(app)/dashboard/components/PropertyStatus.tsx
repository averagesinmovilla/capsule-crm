"use client"

import { GeneralizedPieChart } from "@/app/(app)/dashboard/components/GeneralizedPieChart";
import * as React from "react";
import { PropertyService } from "@/services/property.service";
import {SkeletonCard} from "@/components/SkeletonCard";

export function PropertyStatus() {
    const [data, setData] = React.useState<Record<string, number> | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const propertyService = new PropertyService();
                const propertyStatusRes = await propertyService.statsStatus();
                setData(propertyStatusRes.data);
            } catch (error) {
                console.error("Error fetching property status data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Solo se ejecuta una vez, al montar el componente

    if (loading) {
        return <SkeletonCard/>;
    }

    if (!data) {
        return <div>No data available</div>;
    }

    console.log(data)

    return (
        <GeneralizedPieChart
            data={data}
            keyName="status"
            valueName="count"
            chartTitle="Property Stats"
            chartDescription="Distribution by Status"
        />
    );
}
