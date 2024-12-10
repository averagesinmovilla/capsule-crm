"use client"

import { GeneralizedPieChart } from "@/app/(app)/dashboard/components/GeneralizedPieChart";
import * as React from "react";
import { PropertyService } from "@/services/property.service";
import {GeneralizedBarChart} from "@/app/(app)/dashboard/components/GeneralizedBarChart";
import {SkeletonCard} from "@/components/SkeletonCard";

export function PropertyTypes() {
    const [data, setData] = React.useState<any[] | null>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const propertyService = new PropertyService();
                const propertyStatusRes = await propertyService.statsTypes();
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

    return (
        <GeneralizedBarChart
            data={data}
            keyName="types"
            valueName="count"
            chartTitle="Property types"
            chartDescription="Distribution by types"
        />
    );
}
