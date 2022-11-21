import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'
import { GAME_TITLE } from '../constants/strings'

export const shareStatus = (
  guesses: string[],
  wrongLetters: string,
  lost: boolean
) => {
  navigator.clipboard.writeText(
    `💀${GAME_TITLE} #${solutionIndex} ${
      lost ? 'X/' + guesses.length : '- ' + guesses.length
    }\n\n` + generateEmojiGrid(guesses, wrongLetters)
  )
}

export const generateLivesEmoji = (wrongLetters: string) => {
  const livesLost = wrongLetters.length
  const livesLeft = 10 - livesLost

  const livesArray = new Array(livesLeft)
    .fill('❤️')
    .concat(new Array(livesLost).fill('💀'))
  livesArray.splice(5, 0, '\n')
  return livesArray.join('')
}

export const generateEmojiGrid = (guesses: string[], wrongLetters: string) => {
  const array = guesses
    .slice()
    .reverse()
    .map((guess) => {
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

  array.push(generateLivesEmoji(wrongLetters))

  return array.reverse().join('\n')
}
