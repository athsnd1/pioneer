import { Helmet } from "react-helmet-async";
import { BsPeople } from "react-icons/bs";
import { HiOutlineBookOpen, HiOutlineClock, HiOutlineDocumentText } from "react-icons/hi";
import { HiOutlinePlayCircle } from "react-icons/hi2";
import { useReducer } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Footer from "../components/Footer";
import PageInfo from "../components/PageInfo";


type State = {
  date: string;
  hours: number | "";
  visits: number | "";
  studies: number | "";
  videos: number | "";
  books: number | "";
  comment: string;
}

type Action = { type: "set_date"; date: string } | 
              { type: "set_hours"; hours: number | "" } |
              { type: "set_visits"; visits: number | "" } |
              { type: "set_studies"; studies: number | "" } |
              { type: "set_videos"; videos: number | "" } |
              { type: "set_books"; books: number | "" } |
              { type: "set_comment"; comment: string } |
              { type: "reset" }

const initialState: State = {
    date: "",
    hours: "",
    visits: "",
    studies: "",
    videos: "",
    books: "",
    comment: ""
  }

function reducer (state: State, action: Action): State {

  switch (action.type) {
    case "set_date":
      return {...state, date: action.date};
    
    case "set_hours":
      return {...state, hours: action.hours};

    case "set_visits":
      return {...state, visits: action.visits};

    case "set_studies":
      return {...state, studies: action.studies};

    case "set_videos":
      return {...state, videos: action.videos};

    case"set_books":
      return {...state, books: action.books};
    
    case "set_comment":
      return {...state, comment: action.comment};
    
    case "reset":
      return initialState;

    default:
      return state;
  }
  

}

export default function NewReportPage() {

  const [state, dispatch] = useReducer(reducer, initialState);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    {
      mutationFn: async (report: State) => {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/report/create`, report, { withCredentials: true });
        return response.data;
      },

      onSuccess: () => { 
        dispatch({ type: "reset" });
        toast.success("Report successfully created"); 

        queryClient.invalidateQueries({
          queryKey: ["reports"],
        });

        queryClient.invalidateQueries({
          queryKey: ["reports-stats"],
        });

        queryClient.invalidateQueries({
          queryKey: ["monthly-stats"],
        });
      },

      onError: (error) => {
        if(axios.isAxiosError(error)) {
          toast.error(error.response?.data.message);
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    }

  )

  async function createReport (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
     
    mutation.mutate(state);
  };


  return (
    <div className="bg-gray-100 h-dvh overflow-y-auto pt-4">

      <Helmet>

        <title>Pioneer | Create New Report</title>

        <meta name="description" content="Create a new report" />

      </Helmet>

      <PageInfo prevPage="Dashboard" currentPage="Create Report" pageTitle="Create New Report" pageDesc="Fill out the form below to create a new report"/>

      <div className="font-normal text-xl font-[family-name:var(--bric)] ml-4 mt-6 mb-4 text-blue">Create a New Report</div>
    
      <form onSubmit={createReport} className="ml-4 w-full h-max pr-8 flex flex-col items-center justify-center mb-10">

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 border-1 border-gray-400 rounded-lg p-4 pb-6">

            <div className="flex flex-col gap-0.5 w-full">
              <label className="text-lg font-[family-name:var(--bric)] ">Pick a Date</label>
              
              <div className="flex items-center justify-between p-2 rounded-xl h-10 w-full border-1 border-gray-400 focus-within:border-main shadow-sm bg-[var(--card-color)]">
                <input type="text" placeholder="Select a date" onFocus={(e) => {e.target.type = "date"}} onBlur={(e) => {if(!e.target.value) e.target.type="text"}} value={state.date} onChange={(e) => {dispatch({type: "set_date", date: e.target.value})}} className="outline-0 border-0 h-full w-full font-[family-name:var(--sora)] text-blue" required/>
              </div>
            </div>

             <div className="flex flex-col gap-0.5 w-full">
              <label className="text-lg font-[family-name:var(--bric)] ">Hours</label>
              
              <div className="flex items-center justify-between gap-1 p-2 rounded-xl h-10 w-full border-1 border-gray-400 focus-within:border-main shadow-sm bg-[var(--card-color)]">
                <HiOutlineClock className="text-gray-500"/>
                <input type="number" value={state.hours} onChange={(e) => {dispatch({type: "set_hours", hours: e.target.value === "" ? "" : Number(e.target.value)})}} className="outline-0 border-0 h-full w-full font-[family-name:var(--sora)] text-blue" placeholder="Enter number of hours" required/>
              </div>
            </div>


            <div className="flex flex-col gap-0.5 w-full">
              <label className="text-lg font-[family-name:var(--bric)] ">Return Visits</label>
              
              <div className="flex items-center justify-between gap-1 p-2 rounded-xl h-10 w-full border-1 border-gray-400 focus-within:border-main shadow-sm bg-[var(--card-color)]">
                <BsPeople className="text-gray-500"/>
                <input type="number" value={state.visits} onChange={(e) => {dispatch({type: "set_visits", visits: e.target.value === "" ? "" : Number(e.target.value)})}} className="outline-0 border-0 h-full w-full font-[family-name:var(--sora)] text-blue" placeholder="Enter number of visits" required/>
              </div>
            </div>

            <div className="flex flex-col gap-0.5 w-full">
              <label className="text-lg font-[family-name:var(--bric)] ">Bible Studies</label>
              
              <div className="flex items-center justify-between gap-1 p-2 rounded-xl h-10 w-full border-1 border-gray-400 focus-within:border-main shadow-sm bg-[var(--card-color)]">
                <HiOutlineBookOpen className="text-gray-500"/>
                <input type="number" value={state.studies} onChange={(e) => {dispatch({type: "set_studies", studies: e.target.value === "" ? "" : Number(e.target.value)})}} className="outline-0 border-0 h-full w-full font-[family-name:var(--sora)] text-blue" placeholder="Enter number of studies" required/>
              </div>
            </div>

            <div className="flex flex-col gap-0.5 w-full">
              <label className="text-lg font-[family-name:var(--bric)] ">Videos</label>
              
              <div className="flex items-center justify-between gap-1 p-2 rounded-xl h-10 w-full border-1 border-gray-400 focus-within:border-main shadow-sm bg-[var(--card-color)]">
                <HiOutlinePlayCircle className="text-gray-500"/>
                <input type="number" value={state.videos} onChange={(e) => {dispatch({type: "set_videos", videos: e.target.value === "" ? "" : Number(e.target.value)})}} className="outline-0 border-0 h-full w-full font-[family-name:var(--sora)] text-blue" placeholder="Enter number of videos" required/>
              </div>
            </div>

            <div className="flex flex-col gap-0.5 w-full">
              <label className="text-lg font-[family-name:var(--bric)] ">Books</label>
              
              <div className="flex items-center justify-between gap-1 p-2 rounded-xl h-10 w-full border-1 border-gray-400 focus-within:border-main shadow-sm bg-[var(--card-color)]">
                <HiOutlineDocumentText className="text-gray-500"/>
                <input type="number" value={state.books} onChange={(e) => {dispatch({type: "set_books", books: Number(e.target.value) || 0})}} className="outline-0 border-0 h-full w-full font-[family-name:var(--sora)] text-blue" placeholder="Enter number of books" required/>
              </div>
            </div>

            <div className="flex flex-col gap-0.5 w-full">
              <label className="text-lg font-[family-name:var(--bric)] ">Leave a Comment</label>
              
              <div className="flex items-center justify-between gap-1 p-2 rounded-xl h-20 w-full border-1 border-gray-400 focus-within:border-main shadow-sm bg-[var(--card-color)]">
                <textarea value={state.comment} onChange={(e) => {dispatch({type: "set_comment", comment: e.target.value})}} className="outline-0 border-0 h-full w-full font-[family-name:var(--sora)] text-blue" placeholder="Leave a remark..."/>
              </div>
            </div>

        </div>

        <button type="submit" disabled={mutation.isPending} className={`bg-main rounded-full p-3 mt-5 font-[family-name:var(--bric)] text-white text-lg flex items-center justify-center w-45 self-center ${mutation.isPending ? "cursor-not-allowed" : "cursor-pointer"} hover:opacity-85`}>{ mutation.isPending ? "Creating Report..." : "Create Report"}</button>

      </form>

      <Footer />

    </div>
  )
}
