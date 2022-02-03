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
import { AiOutlineFrown } from 'react-icons/ai'

import './App.css'

const ALERT_TIME_MS = 3000

function App() {
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
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
    saveGameStateToLocalStorage({ guesses, solution })
    const numberOfWrongLetters = guesses
      .join('')
      .split('')
      .filter((word) => !solution.includes(word))
      .filter(function (item, pos, self) {
        return self.indexOf(item) === pos
      })
      .join('').length
    setWrongLetters(numberOfWrongLetters)
  }, [guesses])

  useEffect(() => {
    if (wrongLetters > 8) {
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
      }, ALERT_TIME_MS * 2)
    }
    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS * 2)
    }
  }, [isGameWon, isGameLost])

  const onChar = (value: string) => {
    if (
      wrongLetters < 9 &&
      currentGuess.length < 5 &&
      guesses.length < 6 &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (wrongLetters > 8 || isGameWon || isGameLost) {
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
        setStats(addStatsForCompletedGame(stats, false, guesses.length))
        return setIsGameWon(true)
      }

      const numberOfWrongLetters = [...guesses, currentGuess]
        .join('')
        .split('')
        .filter((word) => !solution.includes(word))
        .filter(function (item, pos, self) {
          return self.indexOf(item) === pos
        })
        .join('').length

      if (guesses.length === 5 || numberOfWrongLetters > 8) {
        setStats(addStatsForCompletedGame(stats, true, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }

  return (
    <div className="fixed overflow-y-auto bg-[#171313] top-0 left-0 w-full h-full mx-auto sm:px-6 lg:px-8 flex flex-col justify-between font-mono font-extrabold">
      <div className="flex-grow-0 flex gap-2 w-full max-w-prose mx-auto items-center p-4 -mb-6">
        <button
          className="bg-transparent cursor-pointer border-0 outline-none flex-1 flex items-center opacity-30 hover:opacity-70 active:opacity-100 transition ease-out duration-150"
          onClick={() => setIsAboutModalOpen(true)}
        >
          <FaSkull className="text-zinc-200 w-6 h-6 mr-1.5" />
          <h1 className="text-base font-bold text-zinc-400 tracking-widest">
            {GAME_TITLE}
          </h1>
        </button>
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
      <div className="flex-1">
        <Stage wrongLetters={wrongLetters} />
        <Grid
          dead={wrongLetters > 8}
          guesses={guesses}
          currentGuess={currentGuess}
        />
      </div>
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

const Stage = ({ wrongLetters = 0 }) => {
  const [displayedWrongLetters, setDisplayedWrongLetters] = useState(0)

  useEffect(() => {
    let animateInterval = setInterval(() => {
      if (wrongLetters > displayedWrongLetters) {
        setDisplayedWrongLetters(
          (displayedWrongLetters) => displayedWrongLetters + 1
        )
      }
    }, 500)
    return () => clearInterval(animateInterval)
  }, [wrongLetters, displayedWrongLetters])

  const transition = 'transition-all ease-in-out duration-[750ms]'
  return (
    <div className="relative w-[80%] max-w-sm mx-auto p-1 pointer-events-none">
      {/* post */}
      <div
        className={`relative left-[36%] w-[2.5%] h-0 bg-zinc-700 origin-bottom ${transition} ${
          displayedWrongLetters > 0
            ? 'opacity-100 rotate-0'
            : 'opacity-0 -rotate-90'
        }`}
        style={{ paddingBottom: '30%' }}
      ></div>
      {/* top  */}
      <div
        className={`absolute origin-top-left left-[36%] top-[7%] w-[2.5%] h-0 bg-zinc-700 z-20  ${transition} ${
          displayedWrongLetters > 1
            ? 'opacity-100 -rotate-90'
            : 'opacity-0 rotate-0'
        }`}
        style={{ paddingBottom: '17%' }}
      ></div>
      {/* noose */}
      <div
        className={`absolute top-0 left-[50%] w-full h-full origin-top-left z-10 ${transition} ${
          displayedWrongLetters > 2
            ? 'opacity-100 rotate-0'
            : 'opacity-0 -rotate-90'
        }`}
      >
        <div
          className="absolute top-0 left-0 w-[1.125%] -translate-x-1/2 h-0 bg-zinc-600"
          style={{ paddingBottom: '7%' }}
        ></div>
        <div
          className="absolute top-[20%] left-0 w-[6%] -translate-x-1/2 h-0 rounded-full border-4 border-zinc-600 bg-zinc-900"
          style={{ paddingBottom: '4%' }}
        ></div>
      </div>
      {/* head */}
      <div
        className={`absolute overflow-hidden top-[14.75%] left-[50%] w-[7%] -translate-x-1/2 h-0 rounded-full bg-zinc-500 z-20 ${transition} ${
          displayedWrongLetters > 3
            ? 'opacity-100 -translate-y-0'
            : 'opacity-0 -translate-y-1/2'
        }`}
        style={{ paddingBottom: '7%' }}
      >
        <AiOutlineFrown
          className={`w-[140%] h-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-600 ${transition} ${
            displayedWrongLetters > 8 ? '-rotate-45' : ''
          }`}
        />
      </div>
      {/* body */}
      <div
        className={`absolute overflow-hidden top-[30%] left-[50%] w-[7%] -translate-x-1/2 h-0 rounded-full bg-zinc-700 ${transition} ${
          displayedWrongLetters > 4
            ? 'opacity-100'
            : 'opacity-0 -translate-y-1/4 rotate-45deg'
        }`}
        style={{ paddingBottom: '10%' }}
      ></div>
      {/* left arm */}
      <div
        className={`absolute origin-top-right overflow-hidden top-[32%] left-[48%] w-[2.5%] -translate-x-1/2 h-0 rounded-full bg-zinc-700 ${transition} ${
          displayedWrongLetters > 8
            ? 'opacity-100 translate-y-[10%] rotate-[15deg]'
            : displayedWrongLetters > 5
            ? 'opacity-100 rotate-[35deg]'
            : 'opacity-0 rotate-90'
        }`}
        style={{ paddingBottom: '9%' }}
      ></div>
      {/* right arm */}
      <div
        className={`absolute origin-top-left overflow-hidden top-[32%] left-[52%] w-[2.5%] -translate-x-1/2 h-0 rounded-full bg-zinc-700 ${transition} ${
          displayedWrongLetters > 8
            ? 'opacity-100 translate-y-[10%] -rotate-[15deg]'
            : displayedWrongLetters > 6
            ? 'opacity-100 -rotate-[35deg]'
            : 'opacity-0 -rotate-90'
        }`}
        style={{ paddingBottom: '9%' }}
      ></div>
      {/* left leg */}
      <div
        className={`absolute origin-top-right overflow-hidden top-[57%] left-[49%] w-[3.25%] -translate-x-1/2 h-0 rounded-full bg-zinc-700 ${transition} ${
          displayedWrongLetters > 8
            ? 'opacity-100 rotate-[5deg]'
            : displayedWrongLetters > 7
            ? 'opacity-100 rotate-[25deg]'
            : 'opacity-0 rotate-45 -translate-y-1/4'
        }`}
        style={{ paddingBottom: '9%' }}
      ></div>
      {/* right leg */}
      <div
        className={`absolute origin-top-left overflow-hidden top-[57%] left-[51%] w-[3.25%] -translate-x-1/2 h-0 rounded-full bg-zinc-700 ${transition} ${
          displayedWrongLetters > 8
            ? 'opacity-100 -rotate-[5deg]'
            : 'opacity-0 -rotate-45 -translate-y-1/4'
        }`}
        style={{ paddingBottom: '9%' }}
      ></div>
    </div>
  )
}

export default App
