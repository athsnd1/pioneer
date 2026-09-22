import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import PageInfo from "../components/PageInfo";
import NotCreated from "@/components/NotCreated";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "#components/ui/table";
import axios from "axios";
import type { MonthlyStats } from "@/types/MonthlyStats";

export default function MonthlyStatsPage() {

  const { data: monthlyData, isLoading, error: dataError } = useQuery({
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
    <div className="bg-gray-100 flex flex-col h-dvh pr-8 pt-4">

      <Helmet>

        <title>Pioneer | Monthly Stats</title>

        <meta name="description" content="Review your monthly stats" />
        
      </Helmet>

      <PageInfo prevPage="Dashboard" currentPage="Monthly Stats" pageTitle="Monthly Stats" pageDesc="Revisit your monthly report stats."/>
      
      <div className="font-normal text-xl font-[family-name:var(--bric)] ml-4 text-blue mb-3">Monthly Stats</div>
      
      {
              dataError ? (
                <NotCreated
                  Icon={HiOutlineClipboardDocumentList}
                  errorText="Error fetching monthly report data"
                />
              ) : monthlyData && monthlyData.length > 0 ?
              
              (
              <div className="overflow-x-auto w-full max-h-screen overflow-y-auto mt-4 ml-4 bg-white rounded-md shadow-sm border-1 border-gray-300 mb-20">
              
                <Table>

                  <TableHeader className="bg-gray-100">

                    <TableRow className="font-sora [&_th:not(:last-child)]:border-r-2 [&_th:not(:last-child)]:border-gray-300">
                      <TableHead className="whitespace-nowrap text-gray-600 text-sm font-medium p-2 pl-4">Date</TableHead>
                      <TableHead className="text-gray-600 text-sm font-medium p-2 pl-4">Hours</TableHead>
                      <TableHead className="text-gray-600 text-sm font-medium p-2 pl-4">Return Visits</TableHead>
                      <TableHead className="text-gray-600 text-sm font-medium p-2 pl-4">Bible Studies</TableHead>
                      <TableHead className="text-gray-600 text-sm font-medium p-2 pl-4">Videos</TableHead>
                      <TableHead className="text-gray-600 text-sm font-medium p-2 pl-4">Placements</TableHead>
                    </TableRow>

                  </TableHeader>

                  <TableBody className="[&_tr:not(:last-child)]:border-b [&_tr:not(:last-child)]:border-gray-200">

                    {
                      monthlyData.map((data: MonthlyStats, index: number) => (
                        <TableRow key={index} className="hover:bg-gray-100 transition-colors duration-200 font-sora">
                          <TableCell className="text-gray-800 text-sm font-medium p- pl-4">{data.month} </TableCell>
                          <TableCell className="text-gray-800 text-lg font-medium p- pl-4">{data.hours} </TableCell>
                          <TableCell className="text-gray-800 text-lg font-medium p- pl-4">{data.visits} </TableCell>
                          <TableCell className="text-gray-800 text-lg font-medium p- pl-4">{data.studies} </TableCell>
                          <TableCell className="text-gray-800 text-lg font-medium p- pl-4">{data.videos} </TableCell>
                          <TableCell className="text-gray-800 text-lg font-medium p- pl-4">{data.books} </TableCell>
                        </TableRow>
                      ))
                    }

                  </TableBody>

                </Table>
          </div>) :
                (<NotCreated
                  Icon={HiOutlineClipboardDocumentList}
                  errorText="You haven't created any reports yet. Create your first report to see your monthly stats."
                />)
            }

      <Footer />
      
    </div>
  )
}
