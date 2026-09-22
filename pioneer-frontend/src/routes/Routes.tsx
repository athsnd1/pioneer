import { createBrowserRouter } from "react-router";
import { Suspense } from "react";
import ErrorPage from "../pages/ErrorPage.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import DashboardLayout from "../layouts/DashboardLayout.tsx";
import LoadingPage from "../pages/LoadingPage";

import {
    HomePage,
    LogsPage,
    LoginPage,
    RegisterPage,
    NewReportPage,
    EditPage,
    EditStudentPage,
    AddStudentPage,
    ViewStudentsPage,
    MonthlyStatsPage,
    ProvideEmail,
    CreateNewPassword
} from "./lazyPages"
import WelcomePage from "@/pages/WelcomePage.tsx";


const router = createBrowserRouter([

    {
        path: "/",
        element: <Suspense fallback={<LoadingPage />}><WelcomePage /></Suspense>,
        errorElement: <ErrorPage />
    },
    {
        path: "/dashboard",
        element: (<ProtectedRoute>
                    <DashboardLayout />
                </ProtectedRoute>),
        children: [
                    {
                        index: true,
                        element: <Suspense fallback={<LoadingPage />}><HomePage /></Suspense>
                    },
                    {
                        path: "logs",
                        element: <Suspense fallback={<LoadingPage />}><LogsPage /></Suspense>
                    },
                    {
                        path: "create",
                        element: <Suspense fallback={<LoadingPage />}><NewReportPage /></Suspense>
                    },
                    {
                        path: "edit/:id",
                        element: <Suspense fallback={<LoadingPage />}><EditPage /></Suspense>,
                        errorElement: <ErrorPage />
                    },
                    {
                        path: "edit-student/:id",
                        element: <Suspense fallback={<LoadingPage />}><EditStudentPage /></Suspense>,
                        errorElement: <ErrorPage />
                    },
                    {
                        path: "add-student",
                        element: <Suspense fallback={<LoadingPage />}> <AddStudentPage /> </Suspense>,
                        errorElement: <ErrorPage />
                    },
                    {
                        path: "students",
                        element: <Suspense fallback={<LoadingPage />}> <ViewStudentsPage /> </Suspense>,
                        errorElement: <ErrorPage />
                    },
                    {
                        path: "monthly-stats",
                        element: <Suspense fallback={<LoadingPage />}> <MonthlyStatsPage /> </Suspense>,
                        errorElement: <ErrorPage />
                    }
                ],
        errorElement: <ErrorPage />
    },

    {
        path: "/login",
        element: <Suspense fallback={<LoadingPage />}><LoginPage /></Suspense>,
        errorElement: <ErrorPage />
    },

    {
        path: "/register",
        element: <Suspense fallback={<LoadingPage />}><RegisterPage /></Suspense>,
        errorElement: <ErrorPage />
    },
    {
        path: "/forgot-password",
        element: <Suspense fallback={<LoadingPage />}><ProvideEmail /></Suspense>,
        errorElement: <ErrorPage />
    },
    {
        path: "/reset-password",
        element: <Suspense fallback={<LoadingPage />}><CreateNewPassword /></Suspense>,
        errorElement: <ErrorPage />
    },

]);

export default router;