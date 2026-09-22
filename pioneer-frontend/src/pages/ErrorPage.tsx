import { isRouteErrorResponse, useRouteError } from "react-router"

export default function ErrorPage() {

    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return(
            <div className="bg-gray-100">
                <h1 className="p-4 font-[family-name:var(--sora)] text-2xl flex items-center justify-center text-red-600 mt-10">{ error.status }</h1>
                <p className="p-2 font-[family-name:var(--sora)] text-l flex items-center justify-center">{ error.statusText }</p>
            </div>
        )
    }

  return (
    <div className="bg-gray-100">
        <h1 className="p-4 font-[family-name:var(--sora)] text-2xl flex items-center justify-center text-red-600 mt-10">Something went wrong</h1>
        <p className="p-2 font-[family-name:var(--sora)] text-l flex items-center justify-center">{ error instanceof Error ? error.message : "Unknown Error" }</p>
    </div>
  )
}
