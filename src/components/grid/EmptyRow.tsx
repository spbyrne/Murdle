import { Cell } from './Cell'

export const EmptyRow = ({ dead = false }: { dead?: boolean }) => {
  const emptyCells = Array.from(Array(5))

  return (
    <div className="flex justify-center">
      {emptyCells.map((_, i) => (
        <Cell dead={dead} key={i} />
      ))}
    </div>
  )
}
