import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import PageInfo from '#components/PageInfo';
import Footer from '#components/Footer';
import React, { useState } from "react";
import type { Student } from '@/types/Student';
import { BsHouseAdd } from 'react-icons/bs';
import { TbAddressBook } from 'react-icons/tb';
import { BiPhoneCall } from 'react-icons/bi';
import { HiClipboardList } from 'react-icons/hi';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function AddStudentPage() {

    const [studentData, setStudentData] = useState<Student>({ name: "", address: "", phone: "", details: "" });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const { name, value } = e.target;

        setStudentData((prev) => ({...prev, [name]: value}));

    };

    async function createStudent (student: Student) {

        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/students/add-student`, student, { withCredentials: true });

        return response.data;

    };

    const queryClient = useQueryClient();

    const studentMutation = useMutation({

        mutationFn: createStudent,


        onSuccess: () => {

            setStudentData({ name: "", address: "", phone: "", details: "" });

            toast.success("Student successfully added!");
            queryClient.invalidateQueries({
                queryKey: ["students"]
            });
        },

        onError: (error) => {
            toast.error("Failed to add new Student :(");
            console.error(error)
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        studentMutation.mutate(studentData);
    }

  return (
    <div className="bg-gray-100 h-dvh overflow-y-auto pt-4">
        <Helmet>

            <title>Pioneer | Add Student</title>

            <meta name="description" content="Add a new Student" />

        </Helmet>

        <PageInfo prevPage="Dashboard" currentPage="Add Student" pageTitle="Add Student" pageDesc="Add a new Student here."/>

        <div className="font-normal text-xl font-[family-name:var(--bric)] ml-4 mt-6 mb-4 text-blue">Add a New Student</div>

        <form onSubmit={handleSubmit} className="ml-4 w-full h-max pr-8 flex flex-col items-center justify-center mb-10">
        
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 border-1 border-gray-400 rounded-lg p-4 pb-6">
        
                     <div className="flex flex-col gap-0.5 w-full">
                      <label className="text-lg font-[family-name:var(--bric)] text-blue">Student Name</label>
                      
                      <div className="flex items-center justify-between gap-1 p-2 rounded-xl h-10 w-full border-1 border-gray-400 focus-within:border-main shadow-sm bg-[var(--card-color)]">
                        <TbAddressBook className="text-gray-500"/>
                        <input type="text" name="name" value={studentData?.name} onChange={handleInputChange} className="outline-0 border-0 h-full w-full font-[family-name:var(--sora)] text-blue" placeholder="What's the person's name?" required/>
                      </div>
                    </div>
        
                    <div className="flex flex-col gap-0.5 w-full">
                      <label className="text-lg font-[family-name:var(--bric)] text-blue">Student Address</label>
                      
                      <div className="flex items-center justify-between gap-1 p-2 rounded-xl h-10 w-full border-1 border-gray-400 focus-within:border-main shadow-sm bg-[var(--card-color)]">
                        <BsHouseAdd className="text-gray-500"/>
                        <input type="text" name="address" value={studentData?.address} onChange={handleInputChange} className="outline-0 border-0 h-full w-full font-[family-name:var(--sora)] text-blue" placeholder="Where does he or she live?" required/>
                      </div>
                    </div>

                    <div className="flex flex-col gap-0.5 w-full">
                      <label className="text-lg font-[family-name:var(--bric)] text-blue">Phone Number</label>
                      
                      <div className="flex items-center justify-between gap-1 p-2 rounded-xl h-10 w-full border-1 border-gray-400 focus-within:border-main shadow-sm bg-[var(--card-color)]">
                        <BiPhoneCall className="text-gray-500"/>
                        <input type="text" name="phone" value={studentData?.phone} onChange={handleInputChange} className="outline-0 border-0 h-full w-full font-[family-name:var(--sora)] text-blue" placeholder="What's the person's phone number?" required/>
                      </div>
                    </div>

                    <div className="flex flex-col gap-0.5 w-full">
                      <label className="text-lg font-[family-name:var(--bric)] text-blue">Details</label>
                      
                      <div className="flex items-start gap-1 p-2 rounded-xl w-full border-1 border-gray-400 focus-within:border-main shadow-sm bg-[var(--card-color)]">
                        <HiClipboardList className="text-gray-500"/>
                        <textarea name="details" value={studentData?.details} onChange={handleInputChange} className="outline-0 border-0 h-15 w-full font-[family-name:var(--sora)] text-blue" placeholder="Any extra info you want to add?" required/>
                      </div>
                    </div>
                    
                </div>
        
                <button type="submit" disabled={studentMutation.isPending} className={`bg-main rounded-full p-3 mt-5 font-[family-name:var(--bric)] text-white text-lg flex items-center justify-center w-45 self-center  hover:opacity-85 ${studentMutation.isPending ? "cursor-not-allowed" : "cursor-pointer"}`}>{ studentMutation.isPending ? "Adding Student..." : "Add Student"}</button>
        
              </form>

        <Footer />
        
    </div>
  )
}
