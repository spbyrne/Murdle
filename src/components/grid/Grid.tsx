import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'

type Props = {
  showNewLine: boolean
  guesses: string[]
  currentGuess: string
  dead?: boolean
  wrongLetters: string
}

export const Grid = ({
  showNewLine,
  dead = false,
  guesses,
  currentGuess,
  wrongLetters,
}: Props) => {
  return (
    <div className="relative bg-gradient-to-b from-black/50 to-black z-[500] flex-1 w-[80%] sm:w-[75%] max-w-[24rem] md:max-w-[30rem] mx-auto flex flex-col justify-start mb-4">
      {showNewLine && <CurrentRow dead={dead} guess={currentGuess} />}
      {guesses.slice(0, 7).map((guess, i) => (
        <CompletedRow index={i} guess={guess} wrongLetters={wrongLetters} />
      ))}
    </div>
  )
}
