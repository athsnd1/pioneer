import { Helmet } from "react-helmet-async";
import StatCard from "../components/StatCard";
import ReportCard from "../components/ReportCard";
import { getReports } from "../api/getReports";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "../components/Loading";
import { getStats } from "../api/getStats";
import Footer from "../components/Footer";
import { useState } from "react";
import type { Report } from "../types/Report";
import toast from "react-hot-toast";
import axios from "axios";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import PageInfo from "../components/PageInfo";
import ReportInfoModal from "../components/ReportInfoModal";
import NotCreated from "@/components/NotCreated";
import { HiOutlineChartBar, HiOutlineClipboardDocumentList, HiOutlineExclamationCircle, HiOutlineEye, HiOutlineTrash } from "react-icons/hi2";
import { Table, 
TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import ReportPieChart from "#components/ReportPieChart";
import MonthlyChart from "#components/MonthlyChart";

export default function HomePage() {

  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const [showReport, setShowReport] = useState<Report | null>(null);

  const [viewType, setViewType] = useState<"card" | "table">("card");

  const { data: reports, isLoading, error: reportsError } = useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });

  const { data: stats, error: statsError } = useQuery({
    queryKey: ["reports-stats"],
    queryFn: getStats
  });

   const queryClient = useQueryClient();
  
  const deleteMutation = useMutation({
      mutationFn: async (id: string) => {

          await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/report/delete/${id}`, { withCredentials: true });

      },
      onSuccess: () => {
          toast.success("Report successfully deleted");

          queryClient.invalidateQueries({
              queryKey: ["reports"]
          });

          queryClient.invalidateQueries({
              queryKey: ["reports-stats"]
          });

          queryClient.invalidateQueries({
              queryKey: ["monthly-stats"]
          });
      }
  });

  const { data: monthlyData } = useQuery({
    queryKey: ["monthly-stats"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/report/monthly-stats`, { withCredentials: true });
      return response.data.monthlyData;
    },
  });

  if(isLoading) {
    return(
      <Loading />
    )
  }

  return (
    <div className="bg-gray-100 pt-4 pr-8 pb-8">

      <Helmet>

        <title>Pioneer | Home</title>

        <meta name="description" content="Your Pioneer report stats and summary" />

        <link rel="canonical" href="actual home page link" />

      </Helmet>

      <PageInfo prevPage="Dashboard" currentPage="Home" pageTitle="Home" pageDesc="View your report stats and previous reports."/>

      <div className="font-normal text-xl font-[family-name:var(--bric)] ml-4 mb-3 text-blue">Stats</div>

      {
        statsError ? (
          <NotCreated
            Icon={HiOutlineExclamationCircle}
            errorText="Error fetching stats"
          />
        ) : stats && Object.values(stats).some((v) => v !== 0) ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center w-full h-max py-6 px-4 bg-white rounded-xl shadow-sm ml-4 border-1 border-gray-300">
            <StatCard title="Total Reports" value={stats.totalReports} />
            <StatCard title="Hours" value={stats.totalHours} />
            <StatCard title="Return Visits" value={stats.totalVisits} />
            <StatCard title="Videos Shown" value={stats.totalVideos} />
            <StatCard title="Bible Studies" value={stats.totalStudies} />
            <StatCard title="Placements" value={stats.totalBooks} />
          </div>
        ) : (
          <NotCreated
            Icon={HiOutlineChartBar}
            errorText="Your ministry statistics will appear here after you create your first report."
          />
        )
      }

      <div className="ml-4 mt-15 text-blue font-bric text-xl font-normal mb-3">Analytics</div>

      {
        reportsError ? <NotCreated Icon={HiOutlineExclamationCircle} errorText="Failed to load reports" /> :

        reports && reports.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-14 sm:gap-6 justify-items-center w-full h-max py-6 px-4 mb-10 bg-white ml-4 rounded-xl shadow-sm">

            <div className="flex flex-col items-center gap-2 w-full -ml-10"> 
              <div className="text-blue font-sora text-md text-center">Monthly Report Data Trend</div>
              { stats && <MonthlyChart monthlyData={monthlyData}/> }
            </div>

            <div className="flex flex-col items-center gap-2"> 
              <div className="text-blue font-sora text-md text-center -mb-15 sm:mb-0">Report Data Breakdown</div>
              { stats && <ReportPieChart stats={stats} />}
            </div>

          </div>
        ) : 

        <NotCreated Icon={HiOutlineChartBar} errorText="Your report stats visualizations will appear here once you've created a report"/>
      }


      <div className=" ml-4 mt-15 mb-3 w-full flex items-center justify-between">
        <span className="font-normal text-xl font-[family-name:var(--bric)] text-blue">Recent Reports</span>

        <select onChange={(e) => setViewType(e.target.value as "card" | "table")} className="ml-4 bg-white/50 border-1 border-gray-300 rounded-md px-2 py-1 h-10 text-blue font-sora cursor-pointer">
          <option value="card">Card View</option>
          <option value="table">Table View</option>
        </select>
      </div>

      {
        reportsError ? (
          <NotCreated
            Icon={HiOutlineClipboardDocumentList}
            errorText="Error fetching reports"
          />
        ) : reports && reports.length > 0 ?
        
        viewType === "card" ? (<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center w-full h-max py-6 px-4 bg-white ml-4 rounded-xl shadow-sm border-1 border-gray-300 mb-20">

            {reports.map((report) => (
              <ReportCard key={report.id} id={report.id} hours={report.hours} visits={report.visits} studies={report.studies} videos={report.videos} books={report.books} date={report.date} onDelete={() => {setSelectedReport(report)}} onShow={() => {setShowReport(report)}}/>
            ))}  

          </div>) : (<div className="overflow-x-auto w-full mt-4 ml-4 bg-white rounded-md shadow-sm border-1 border-gray-300 mb-20">

          <Table>

            <TableHeader className="bg-gray-100">

              <TableRow className="font-sora [&_th:not(:last-child)]:border-r-2 [&_th:not(:last-child)]:border-gray-300">
                <TableHead className="whitespace-nowrap text-gray-600 text-sm font-medium p-2 pl-4">Date</TableHead>
                <TableHead className="text-gray-600 text-sm font-medium p-2 pl-4">Hours</TableHead>
                <TableHead className="text-gray-600 text-sm font-medium p-2 pl-4">Return Visits</TableHead>
                <TableHead className="text-gray-600 text-sm font-medium p-2 pl-4">Bible Studies</TableHead>
                <TableHead className="text-gray-600 text-sm font-medium p-2 pl-4">Videos</TableHead>
                <TableHead className="text-gray-600 text-sm font-medium p-2 pl-4">Placements</TableHead>
                <TableHead className="text-right text-gray-600 text-sm font-medium p-2 pl-4">Actions</TableHead>
              </TableRow>

            </TableHeader>

            <TableBody className="[&_tr:not(:last-child)]:border-b [&_tr:not(:last-child)]:border-gray-200">

              {reports?.map((report => (
                <TableRow key={report.id} className="hover:bg-gray-100 transition-colors duration-200 font-sora">
                  <TableCell className="text-gray-800 text-sm font-medium p-2 pl-4">{report.date}</TableCell>
                  <TableCell className="text-gray-800 text-lg font-medium p-2 pl-4">{report.hours}</TableCell>
                  <TableCell className="text-gray-800 text-lg font-medium p-2 pl-4">{report.visits}</TableCell>
                  <TableCell className="text-gray-800 text-lg font-medium p-2 pl-4">{report.studies}</TableCell>
                  <TableCell className="text-gray-800 text-lg font-medium p-2 pl-4">{report.videos}</TableCell>
                  <TableCell className="text-gray-800 text-lg font-medium p-2 pl-4">{report.books}</TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-2 p-2 pl-4">
                    <button onClick={() => {setShowReport(report)}}><HiOutlineEye className="text-blue-500 text-xl cursor-pointer hover:opacity-85"/></button>
                    <button onClick={() => {setSelectedReport(report)}}><HiOutlineTrash className="text-red-500 text-xl cursor-pointer hover:opacity-85"/></button>
                  </TableCell>
                </TableRow>
              )))}

            </TableBody>

          </Table>

        </div>)
         :
          (<NotCreated
            Icon={HiOutlineClipboardDocumentList}
            errorText="You haven't created any reports yet. Create your first report to see it here."
          />)
      }

      { selectedReport && <ConfirmDeleteModal onClose={() => {setSelectedReport(null)}} 
      onRemoveReport={() => { deleteMutation.mutate(selectedReport.id) }} /> }

      { showReport && <ReportInfoModal onClose={() => {setShowReport(null)}} report={showReport} /> }

      <Footer />

    </div>
  )
}
