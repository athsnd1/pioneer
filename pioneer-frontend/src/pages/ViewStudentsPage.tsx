import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Footer from "#components/Footer";
import { Helmet } from "react-helmet-async";
import PageInfo from "#components/PageInfo";
import Loading from "#components/Loading";
import { useState } from "react";
import { getStudents } from "@/api/getStudents";
import toast from "react-hot-toast";
import axios from "axios";
import type { Student } from "@/types/Student";
import NotCreated from "#components/NotCreated";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import StudentCard from "#components/StudentCard";
import ConfirmDeleteModal from "#components/ConfirmDeleteModal";
import StudentInfoModal from "#components/StudentInfoModal";
import { HiOutlineExclamationCircle } from "react-icons/hi";


export default function ViewStudentsPage() {

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [showStudent, setShowStudent] = useState< Student | null>(null);

  const { data: students, isLoading, error: studentsError } = useQuery<Student[]>({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({

      mutationFn: async (id: string) => {

          await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/students/delete/${id}`, { withCredentials: true });

      },
      onSuccess: () => {
          toast.success("Student removed successfully");

          queryClient.invalidateQueries({
              queryKey: ["students"]
          });
      },
      onError: (error) => {
          if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
            toast.error(error.response?.data?.message ?? error.message);
          } else {
            console.error(error);
          }
      }
  });

  

  if(isLoading) {
    return(
      <Loading />
    )
  }

  return (
    <div className="bg-gray-100 h-dvh overflow-y-auto pt-4 pr-8">

      <Helmet>

          <title>Pioneer | View Students</title>

          <meta name="description" content="View all your Bible Students" />

      </Helmet>

      <PageInfo prevPage="Dashboard" currentPage="View Students" pageTitle="View Students" pageDesc="View all your Bible Students."/>

      <div className="font-normal text-xl font-[family-name:var(--bric)] ml-4 text-blue mb-3">View Students</div>

      {
        studentsError ? 
        (
          <NotCreated
            Icon={HiOutlineExclamationCircle}
            errorText="Error getting students"
          />
        ) : students && students.length > 0  ?
        
        (<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center w-full h-max py-6 px-4 mb-30 bg-white ml-4 rounded-xl shadow-sm border-1 border-gray-300">

          {
            students.map((student) => (
            <StudentCard
              key={student.id}
              name={student.name}
              address={student.address}
              phone={student.phone}
              onDelete={() => {setSelectedStudent(student)}}
              onShow={() => {setShowStudent(student)}}
              studentId={student.id!}
            />
          ))
          }
          
        </div>) :

          (<NotCreated
            Icon={HiOutlineClipboardDocumentList}
            errorText="You haven't added any students yet."
          />)
      }

      { selectedStudent && <ConfirmDeleteModal onClose={() => {setSelectedStudent(null)}} 
      onRemoveReport={() => { console.log(selectedStudent.id); deleteMutation.mutate(selectedStudent.id!); }} text="Are you sure you want to remove this student?"/> }

      { showStudent && <StudentInfoModal student={showStudent} onClose={() => {setShowStudent(null)}}/> }

      <Footer />

    </div>
  )
}
