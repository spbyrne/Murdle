import { Healthbar } from '../murdle/Healthbar'
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
    <div className="sticky top-0 bg-gradient-to-t from-black via-black to-black/50 flex-1 w-[90%] sm:w-[75%] max-w-[24rem] md:max-w-[30rem] mx-auto flex flex-col justify-start mb-4">
      <Healthbar wrongLetters={wrongLetters.length} />
      {showNewLine && <CurrentRow dead={dead} guess={currentGuess} />}
      {guesses.map((guess, i) => (
        <CompletedRow index={i} guess={guess} wrongLetters={wrongLetters} />
      ))}
    </div>
  )
}
