import type { MonthlyStats } from "@/types/MonthlyStats";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from "recharts";

type Props = {
    monthlyData: MonthlyStats[]
}

export default function MonthlyChart({ monthlyData }: Props) {


    const chartConfig = {
        hours: {
            label: "Hours",
            color: "#2563eb",
        },
        visits: {
            label: "Return Visits",
            color: "#22c55e",
        },
        studies: {
            label: "Bible Studies",
            color: "#eab308",
        },
        videos: {
            label: "Videos",
            color: "#9333ea",
        },
        books: {
            label: "Placements",
            color: "#ef4444",
        },
    };

    const MAX_MONTHS = 12;

    const maxStats = monthlyData?.slice(-MAX_MONTHS);

  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full">
        <LineChart data={maxStats}>

            <CartesianGrid vertical={false} />

            <XAxis dataKey="month" />

            <YAxis />

            <ChartTooltip content={<ChartTooltipContent />} />

            <Legend wrapperStyle={{
                fontSize: "14px",
                fontFamily: "var(--sora)",
                color: "#374151",
                transform: "translate(30px, 20px)",
            }}/>

            <Line
                dataKey="hours"
                stroke={chartConfig.hours.color}
                strokeWidth={3}
            />

            <Line
                dataKey="visits"
                stroke={chartConfig.visits.color}
            />

            <Line
                dataKey="studies"
                stroke={chartConfig.studies.color}
            />

            <Line
                dataKey="videos"
                stroke={chartConfig.videos.color}
            />

            <Line
                dataKey="books"
                stroke={chartConfig.books.color}
            />

        </LineChart>
    </ChartContainer>
  )
}
