import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { Stat } from "@/types/Stat";

type Props = {
    stats: Stat;
}


export default function ReportFieldChart({ stats }: Props) {

    const chartConfig = {

        hours: {
            label: "Hours",
            color: "#2563eb",
        },
        visits: {
            label: "Return Visits",
            color: "#16a34a",
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

    const chartData = [
        {
            category: "Hours",
            value: stats.totalHours,
            color: "#2563eb",
        },
        {
            category: "RVs",
            value: stats.totalVisits,
            color: "#16a34a",
        },
        {
            category: "BSts",
            value: stats.totalStudies,
            color: "#eab308",
        },
        {
            category: "Vids",
            value: stats.totalVideos,
            color: "#9333ea",
        },
        {
            category: "Books",
            value: stats.totalBooks,
            color: "#ef4444",
        },
    ];


  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full">

        <BarChart data={chartData}>
            <CartesianGrid vertical={false} />

            <XAxis
                dataKey="category"
                tick={{
                    fontFamily: "var(--font-sora)",
                    fontSize: 12,
                    fill: "#475569",
                    fontWeight: 500,
                }}
            />

            <YAxis
                tick={{
                    fontFamily: "var(--font-sora)",
                    fontSize: 12,
                    fill: "#475569",
                }}
            />

            <ChartTooltip content={<ChartTooltipContent />}/>

            <Bar dataKey="value" radius={6}>
                {chartData.map((entry) => (
                <Cell key={entry.category} fill={entry.color} />
                ))}
            </Bar>
        </BarChart>

    </ChartContainer>
  )
}
