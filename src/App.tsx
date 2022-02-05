import { RiBarChart2Fill } from 'react-icons/ri'
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import {
  GAME_TITLE,
  WIN_MESSAGES,
  GAME_COPIED_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
  CORRECT_WORD_MESSAGE,
} from './constants/strings'
import { isWordInWordList, isWinningWord, solution } from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'
import { FaInfoCircle, FaSkull } from 'react-icons/fa'

import './App.css'
import { Stage } from './components/murdle/Stage'

const ALERT_TIME_MS = 3000

function App() {
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [wrongLetters, setWrongLetters] = useState('')
  const [successAlert, setSuccessAlert] = useState('')
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.wrongLetters && loaded.wrongLetters.length > 9 && !gameWasWon) {
      setIsGameLost(true)
    }
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    const wrongLetters = guesses
      .join('')
      .split('')
      .filter((word) => !solution.includes(word))
      .filter(function (item, pos, self) {
        return self.indexOf(item) === pos
      })
      .join('')
    setWrongLetters(wrongLetters)
    saveGameStateToLocalStorage({ guesses, solution, wrongLetters })
  }, [guesses])

  useEffect(() => {
    if (wrongLetters.length > 9) {
      setIsGameLost(true)
    }
  }, [wrongLetters])

  useEffect(() => {
    if (isGameWon) {
      setSuccessAlert(
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      )
      setTimeout(() => {
        setSuccessAlert('')
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS * 1.5)
    }
    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS * 1.5)
    }
  }, [isGameWon, isGameLost])

  const onChar = (value: string) => {
    if (
      wrongLetters.length < 10 &&
      currentGuess.length < 5 &&
      !isGameLost &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (wrongLetters.length > 9 || isGameWon || isGameLost) {
      return
    }
    if (!(currentGuess.length === 5)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }

    const winningWord = isWinningWord(currentGuess)

    if (currentGuess.length === 5 && !isGameWon) {
      setGuesses([currentGuess, ...guesses])
      setCurrentGuess('')

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, false, guesses.length))
        return setIsGameWon(true)
      }

      const wrongLetters = [...guesses, currentGuess]
        .join('')
        .split('')
        .filter((word) => !solution.includes(word))
        .filter(function (item, pos, self) {
          return self.indexOf(item) === pos
        })
        .join('')

      if (wrongLetters.length > 9) {
        setStats(addStatsForCompletedGame(stats, true, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }

  return (
    <div className="fixed overflow-y-auto bg-black top-0 left-0 w-full h-full mx-auto sm:px-6 lg:px-8 flex flex-col justify-between font-mono font-extrabold">
      <div className="sticky top-0 flex-grow-0 flex gap-3 w-full max-w-prose mx-auto items-center p-4 -mb-6">
        <button
          className="bg-transparent cursor-pointer border-0 outline-none flex items-center opacity-30 hover:opacity-70 active:opacity-100 transition ease-out duration-150"
          onClick={() => setIsAboutModalOpen(true)}
        >
          <FaSkull className="text-zinc-200 w-6 h-6 mr-2" />
          <h1 className="text-base font-bold text-zinc-400 tracking-widest">
            {GAME_TITLE}
          </h1>
        </button>
        <span className="flex-1"></span>
        <button
          className="bg-transparent cursor-pointer border-0 outline-none opacity-30 hover:opacity-70 active:opacity-100 transition ease-out duration-150"
          onClick={() => setIsInfoModalOpen(true)}
        >
          <FaInfoCircle className="h-6 w-6 text-zinc-400" />
        </button>
        <button
          className="bg-transparent cursor-pointer border-0 outline-none opacity-30 hover:opacity-70 active:opacity-100 transition ease-out duration-150"
          onClick={() => setIsStatsModalOpen(true)}
        >
          <RiBarChart2Fill className="h-6 w-6 text-zinc-400" />
        </button>
      </div>
      <Stage wrongLetters={wrongLetters} />
      <Grid
        dead={wrongLetters.length > 9}
        guesses={guesses}
        currentGuess={currentGuess}
        showNewLine={!isGameWon && !isGameLost}
        wrongLetters={wrongLetters}
      />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
        wrongLetters={guesses
          .join('')
          .split('')
          .filter((word) => !solution.includes(word))
          .filter(function (item, pos, self) {
            return self.indexOf(item) === pos
          })}
        hide={isGameLost || isGameWon}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        gameStats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        handleShare={() => {
          setSuccessAlert(GAME_COPIED_MESSAGE)
          return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
        }}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />
      <Alert message={NOT_ENOUGH_LETTERS_MESSAGE} isOpen={isNotEnoughLetters} />
      <Alert
        message={WORD_NOT_FOUND_MESSAGE}
        isOpen={isWordNotFoundAlertOpen}
      />
      <Alert message={CORRECT_WORD_MESSAGE(solution)} isOpen={isGameLost} />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />
    </div>
  )
}

export default App
