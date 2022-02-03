type Props = {
  index: number
  size: number
  label: string
}

export const Progress = ({ index, size, label }: Props) => {
  return (
    <div className="flex gap-2 justify-left m-1 w-full">
      <div className="items-center justify-center w-2">{index + 1}</div>
      <div
        style={{ width: `${5 + size}%` }}
        className={`${
          size > 0 ? `bg-green-600` : `bg-zinc-800`
        } relative text-xs font-medium text-green-100 px-2 py-0.5 rounded-full`}
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {label}
        </span>
      </div>
    </div>
  )
}
