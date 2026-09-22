import type { Stat } from '@/types/Stat';
import { PieChart, Pie, Legend } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Props = {
    stats: Stat;
}

export default function ReportPieChart({ stats }: Props) {

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
        { activity: "Hours", total: stats.totalHours, fill: "#2563eb" },
        { activity: "RVs", total: stats.totalVisits, fill: "#16a34a" },
        { activity: "BSts", total: stats.totalStudies, fill: "#eab308" },
        { activity: "Vids", total: stats.totalVideos, fill: "#9333ea" },
        { activity: "Books", total: stats.totalBooks, fill: "#ef4444" },
    ];


  return (
    <ChartContainer config={chartConfig} className="h-[400px] max-w-[300px]">
        <PieChart>
            <Pie
            data={chartData}
            dataKey="total"
            nameKey="activity"
            outerRadius={120}
            fill="fill"
            />

            <ChartTooltip
            content={<ChartTooltipContent />}
            
            />

            <Legend wrapperStyle={{
                fontSize: "14px",
                fontFamily: "var(--sora)",
            }}/>
        </PieChart>
    </ChartContainer>
  )
}
