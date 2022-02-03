import { KeyValue } from '../../lib/keyboard'
import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'
import { ENTER_TEXT, DELETE_TEXT } from '../../constants/strings'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[]
  hide: boolean
  wrongLetters?: string[] | undefined
}

const Keyrow = ({
  children,
  padding = '',
}: {
  children?: any
  padding?: string
}) => {
  return (
    <div className={`flex justify-center items-stretch ${padding}`}>
      {children}
    </div>
  )
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  guesses,
  wrongLetters,
  hide = false,
}: Props) => {
  const charStatuses = getStatuses(guesses)

  const onClick = (value: KeyValue) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
        const key = e.key.toUpperCase()
        if (key.length === 1 && key >= 'A' && key <= 'Z') {
          onChar(key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  if (hide) {
    return (
      <div className={`w-full max-w-prose mx-auto flex flex-col px-2 py-20`}>
        <Keyrow>
          {wrongLetters &&
            wrongLetters.map((letter) => {
              return <Key value={letter} status="absent" />
            })}
        </Keyrow>
      </div>
    )
  }

  return (
    <div
      className={`w-full max-w-prose mx-auto flex flex-col px-1 py-2 sm:p-2 md:p-4`}
    >
      <Keyrow>
        <Key value="Q" onClick={onClick} status={charStatuses['Q']} />
        <Key value="W" onClick={onClick} status={charStatuses['W']} />
        <Key value="E" onClick={onClick} status={charStatuses['E']} />
        <Key value="R" onClick={onClick} status={charStatuses['R']} />
        <Key value="T" onClick={onClick} status={charStatuses['T']} />
        <Key value="Y" onClick={onClick} status={charStatuses['Y']} />
        <Key value="U" onClick={onClick} status={charStatuses['U']} />
        <Key value="I" onClick={onClick} status={charStatuses['I']} />
        <Key value="O" onClick={onClick} status={charStatuses['O']} />
        <Key value="P" onClick={onClick} status={charStatuses['P']} />
      </Keyrow>
      <Keyrow padding="px-[5%]">
        <Key value="A" onClick={onClick} status={charStatuses['A']} />
        <Key value="S" onClick={onClick} status={charStatuses['S']} />
        <Key value="D" onClick={onClick} status={charStatuses['D']} />
        <Key value="F" onClick={onClick} status={charStatuses['F']} />
        <Key value="G" onClick={onClick} status={charStatuses['G']} />
        <Key value="H" onClick={onClick} status={charStatuses['H']} />
        <Key value="J" onClick={onClick} status={charStatuses['J']} />
        <Key value="K" onClick={onClick} status={charStatuses['K']} />
        <Key value="L" onClick={onClick} status={charStatuses['L']} />
      </Keyrow>
      <Keyrow padding="px-[1%]">
        <Key value="ENTER" onClick={onClick}>
          {ENTER_TEXT}
        </Key>
        <Key value="Z" onClick={onClick} status={charStatuses['Z']} />
        <Key value="X" onClick={onClick} status={charStatuses['X']} />
        <Key value="C" onClick={onClick} status={charStatuses['C']} />
        <Key value="V" onClick={onClick} status={charStatuses['V']} />
        <Key value="B" onClick={onClick} status={charStatuses['B']} />
        <Key value="N" onClick={onClick} status={charStatuses['N']} />
        <Key value="M" onClick={onClick} status={charStatuses['M']} />
        <Key value="DELETE" onClick={onClick}>
          {DELETE_TEXT}
        </Key>
      </Keyrow>
    </div>
  )
}
