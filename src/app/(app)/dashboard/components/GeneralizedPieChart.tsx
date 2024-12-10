"use client"

import * as React from "react"
import {Label, Pie, PieChart} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {useCallback} from "react";

type GeneralizedPieChartType = {
    keyName?: string;
    valueName?: string;
    chartTitle?: string;
    chartDescription?: string;
    data: Record<string, number>;
}


export function GeneralizedPieChart({
    keyName = "key",
    valueName = "value",
    chartTitle = "Chart",
    chartDescription = "Distribution of data",
    data,
}: GeneralizedPieChartType) {
    const [chartData, setChartData] = React.useState<any[]>([])
    const [totalValues, setTotalValues] = React.useState<number>(0)
    const colorGenerator = useCallback((index: number) => `hsl(${index * 60 % 360}, 80%, 70%)`, []);

    React.useEffect(() => {
        const transformedData = Object.keys(data).map((key, index) => ({
            [keyName]: key,
            [valueName]: data[key],
            fill: colorGenerator(index),
        }));

        setChartData(transformedData)
        setTotalValues(
            transformedData.reduce((acc, curr) => acc + (curr[valueName] as number), 0)
        )
    }, [data, keyName, valueName, colorGenerator])

    const chartConfig = {
        [valueName]: {
            label: "Values",
        },
        ...chartData.reduce((config, item, index) => {
            const key = item[keyName];
            config[key] = {label: key, color: item.fill};
            return config;
        }, {}),
    };

    return (
        <Card className="flex flex-col min-w-[300px]">
            <CardHeader className="items-center pb-0">
                <CardTitle>{chartTitle}</CardTitle>
                <CardDescription>{chartDescription}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel/>}
                        />
                        <Pie
                            data={chartData}
                            dataKey={valueName}
                            nameKey={keyName}
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({viewBox}) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalValues.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
