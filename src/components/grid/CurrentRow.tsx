import { Cell } from './Cell'

type Props = {
  guess: string
  dead?: boolean
}

export const CurrentRow = ({ dead = false, guess }: Props) => {
  const splitGuess = guess.split('')
  const emptyCells = Array.from(Array(5 - splitGuess.length))

  return (
    <div className="flex justify-center">
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell dead={dead} key={i} />
      ))}
    </div>
  )
}
