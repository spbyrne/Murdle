import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'
import { GAME_TITLE } from '../constants/strings'

export const shareStatus = (guesses: string[], lost: boolean) => {
  navigator.clipboard.writeText(
    `💀${GAME_TITLE} ${solutionIndex} ${lost ? 'X' : guesses.length}/6\n\n` +
      generateEmojiGrid(guesses, lost)
  )
}

export const generateEmojiGrid = (guesses: string[], lost: boolean) => {
  const array = guesses.reverse().map((guess) => {
    const status = getGuessStatuses(guess)
    return guess
      .split('')
      .map((letter, i) => {
        switch (status[i]) {
          case 'correct':
            return '🟩'
          case 'present':
            return '🟨'
          default:
            return '⬛'
        }
      })
      .join('')
  })
  if (lost) {
    array.push('💀💀💀💀💀')
  }

  return array.reverse().join('\n')
}
