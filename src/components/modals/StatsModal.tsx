import Countdown from 'react-countdown'
import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import { tomorrow } from '../../lib/words'
import { BaseModal } from './BaseModal'
import {
  STATISTICS_TITLE,
  GUESS_DISTRIBUTION_TEXT,
  NEW_WORD_TEXT,
  SHARE_TEXT,
} from '../../constants/strings'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[]
  wrongLetters: string
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  handleShare: () => void
}

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  wrongLetters,
  gameStats,
  isGameLost,
  isGameWon,
  handleShare,
}: Props) => {
  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
      </BaseModal>
    )
  }
  return (
    <BaseModal
      title={STATISTICS_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <StatBar gameStats={gameStats} />
      <h4 className="text-lg leading-6 font-medium text-zinc-900 dark:text-zinc-100">
        {GUESS_DISTRIBUTION_TEXT}
      </h4>
      <Histogram gameStats={gameStats} />
      {(isGameLost || isGameWon) && (
        <div className="mt-5 sm:mt-6 flex gap-6 justify-between items-center dark:text-white">
          <div className="flex-1 whitespace-nowrap">
            <h5>{NEW_WORD_TEXT}</h5>
            <Countdown
              className="text-lg font-medium text-zinc-900 dark:text-zinc-100"
              date={tomorrow}
              daysInHours={true}
            />
          </div>
          <button
            type="button"
            className="w-full rounded-md border border-transparent shadow-sm px-4 py-3 bg-rose-700 text-base font-medium text-white hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:text-sm"
            onClick={() => {
              shareStatus(guesses, wrongLetters, isGameLost)
              handleShare()
            }}
          >
            {SHARE_TEXT}
          </button>
        </div>
      )}
    </BaseModal>
  )
}
