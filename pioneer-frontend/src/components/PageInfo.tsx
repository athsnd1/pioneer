

type Props = {
    prevPage: string;
    currentPage: string;
    pageTitle: string;
    pageDesc: string;
}

export default function PageInfo ({ prevPage, currentPage, pageTitle, pageDesc }: Props ) {


  return (
    <div className="flex flex-col items-start gap-1 ml-4 mb-8">

        <div className="flex items-center gap-1">

            <span className="text-xs text-gray-500 font-sora">{prevPage}</span>
            <span className="text-gray-500 text-xs font-sora">/</span>
            <span className="text-gray-700 text-xs font-sora">{currentPage}</span>

        </div>

        <h1 className="text-2xl text-main font-semibold font-bric">{pageTitle}</h1>

        <h3 className="text-sm text-gray-500 font-medium font-sora">{pageDesc}</h3>
    </div>
  )
}
