
type Props = {
    title: string;
    value: number;
}

export default function StatCard({ title = "Stat", value = 0 }: Props) {

  const newValue = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);

  return (
    <div className="p-4 rounded-xl bg-[var(--card-color)] font-[family-name:var(--sora)] flex flex-col gap-2 items-center justify-center w-full border-1 border-gray-300">

        <div className="font-bold text-blue text-3xl">

          {newValue}

        </div>

        <span className="font-normal text-md text-blue text-center"> { title } </span>

    </div>
  )
}
