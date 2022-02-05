import * as React from 'react'
import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'

type Props = {
  guess: string
  wrongLetters: string
  index: number
}

export const CompletedRow = ({ index, guess, wrongLetters = '' }: Props) => {
  const statuses = getGuessStatuses(guess)

  return (
    <div
      key={index}
      className="flex justify-center"
      style={{ opacity: 1 - 0.2 * index }}
    >
      {guess.split('').map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          // @ts-ignore
          dead={wrongLetters.includes(letter)}
        />
      ))}
    </div>
  )
}
