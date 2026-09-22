import { lazy } from "react";


export const LoginPage = lazy(() => import("../pages/LoginPage"));
export const RegisterPage = lazy(() => import("../pages/RegisterPage"));
export const HomePage = lazy(() => import("../pages/HomePage"));
export const LogsPage = lazy(() => import("../pages/LogsPage"));
export const NewReportPage = lazy(() => import("../pages/NewReportPage"));
export const EditPage = lazy(() => import("../pages/EditPage"));
export const ProvideEmail = lazy(() => import("../pages/ProvideEmail"));
export const CreateNewPassword = lazy(() => import("../pages/CreateNewPassword"));
export const AddStudentPage = lazy(() => import("../pages/AddStudentPage"));
export const ViewStudentsPage = lazy(() => import("../pages/ViewStudentsPage"));
export const MonthlyStatsPage = lazy(() => import("../pages/MonthlyStatsPage"));
export const EditStudentPage = lazy(() => import("../pages/EditStudentPage"));