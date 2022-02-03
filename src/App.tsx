import { InformationCircleIcon, ChartBarIcon } from '@heroicons/react/outline'
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
import { FaSkull } from 'react-icons/fa'
import { AiOutlineFrown } from 'react-icons/ai'

import './App.css'

const ALERT_TIME_MS = 2000

function App() {
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const isDarkMode = true
  const [wrongLetters, setWrongLetters] = useState(0)
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
    if (loaded.guesses.length === 6 && !gameWasWon) {
      setIsGameLost(true)
    }
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    const numberOfWrongLetters = guesses
      .join('')
      .split('')
      .filter((word) => !solution.includes(word))
      .filter(function (item, pos, self) {
        return self.indexOf(item) == pos
      })
      .join('')
    setWrongLetters(numberOfWrongLetters.length)
  }, [guesses])

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      setSuccessAlert(
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      )
      setTimeout(() => {
        setSuccessAlert('')
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
  }, [isGameWon, isGameLost])

  const onChar = (value: string) => {
    if (currentGuess.length < 5 && guesses.length < 6 && !isGameWon) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
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

    if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === 5) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }

  return (
    <div className="fixed bg-[#171313] top-0 left-0 w-screen h-screen mx-auto sm:px-6 lg:px-8 flex flex-col justify-between font-mono font-extrabold">
      <div className="flex-grow-0 flex gap-1 w-full max-w-prose mx-auto items-center p-4 -mb-6">
        <FaSkull className="text-gray-400 w-6 h-6 mr-2" />
        <h1 className="text-xl grow font-bold text-gray-600 tracking-widest">
          {GAME_TITLE}
        </h1>
        <InformationCircleIcon
          className="h-6 w-6 cursor-pointer stroke-white opacity-50 hover:opacity-100 transition ease-out duration-150"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <ChartBarIcon
          className="h-6 w-6 cursor-pointer stroke-white opacity-50 hover:opacity-100 transition ease-out duration-150"
          onClick={() => setIsStatsModalOpen(true)}
        />
      </div>
      <div className="flex-1">
        <Stage wrongLetters={wrongLetters} />
        <Grid guesses={guesses} currentGuess={currentGuess} />
      </div>
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
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

const Stage = ({ wrongLetters = 0 }) => {
  return (
    <div className="relative w-[80%] max-w-sm mx-auto p-1 pointer-events-none">
      {/* post */}
      <div
        className={`relative left-[36%] w-[2.5%] h-0 bg-zinc-700 ${
          wrongLetters > 0 ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ paddingBottom: '30%' }}
      ></div>
      {/* top  */}
      {wrongLetters > 1 && (
        <div
          className="absolute origin-top-left left-[36%] top-[7%] -rotate-90 w-[2.5%] h-0 bg-zinc-700 z-10"
          style={{ paddingBottom: '17%' }}
        ></div>
      )}
      {/* noose */}
      {wrongLetters > 2 && (
        <div className="absolute top-0 left-[50%] w-full h-full origin-top">
          <div
            className="absolute top-0 left-0 w-[1.5%] -translate-x-1/2 h-0 bg-zinc-600"
            style={{ paddingBottom: '7%' }}
          ></div>
          <div
            className="absolute top-[20%] left-0 w-[6%] -translate-x-1/2 h-0 rounded-full border-4 border-zinc-600 bg-zinc-900"
            style={{ paddingBottom: '4%' }}
          ></div>
        </div>
      )}
      {/* head */}
      {wrongLetters > 3 && (
        <div
          className="absolute overflow-hidden top-[11%] left-[50%] w-[9%] -translate-x-1/2 h-0 rounded-full bg-zinc-500"
          style={{ paddingBottom: '8%' }}
        >
          <AiOutlineFrown className="w-[140%] h-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-600" />
        </div>
      )}
    </div>
  )
}

export default App
