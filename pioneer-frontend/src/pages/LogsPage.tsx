import { Helmet } from "react-helmet-async";
import ReportCard from "../components/ReportCard";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getReports } from "../api/getReports";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import axios from "axios";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import type { Report } from "../types/Report";
import { useState } from "react";
import Footer from "../components/Footer";
import PageInfo from "../components/PageInfo";
import ReportInfoModal from "../components/ReportInfoModal";
import NotCreated from "@/components/NotCreated";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

export default function LogsPage() {

  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const [showReport, setShowReport] = useState<Report | null>(null);

  const { data: reports, isLoading, error: reportsError } = useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
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
      }
  });

  if(isLoading) {
    return(
      <Loading />
    )
  }

  return (
    <div className="bg-gray-100 flex flex-col pr-8 pt-4 h-dvh">

      <Helmet>

        <title>Pioneer | Logs</title>

        <meta name="description" content="View past reports" />
        
      </Helmet>

      <PageInfo prevPage="Dashboard" currentPage="Logs" pageTitle="Recent Reports" pageDesc="View and modify recent reports you've created."/>
      
      <div className="font-normal text-xl font-[family-name:var(--bric)] ml-4 text-blue mb-3">Recent Reports</div>
      
      {
              reportsError ? (
                
                <NotCreated
                  Icon={HiOutlineClipboardDocumentList}
                  errorText="Error fetching reports"
                />

              ) : reports && reports.length > 0 ?
              
              (<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center w-full h-max py-6 px-4 mb-30 bg-white ml-4 mr-6 rounded-xl shadow-sm border-1 border-gray-300">
      
                {reports.map((report) => (
                  <ReportCard key={report.id} id={report.id} hours={report.hours} visits={report.visits} studies={report.studies} videos={report.videos} books={report.books} date={report.date} onDelete={() => {setSelectedReport(report)}} onShow={() => {setShowReport(report)}}/>
                ))}  
                
            </div>) :
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
