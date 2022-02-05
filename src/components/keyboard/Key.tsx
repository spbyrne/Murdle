import * as React from 'react'
import classnames from 'classnames'
import { KeyValue } from '../../lib/keyboard'
import { CharStatus } from '../../lib/statuses'
import { GiHastyGrave, GiLeak } from 'react-icons/gi'
import { RiKnifeBloodFill } from 'react-icons/ri'
import { FaSkullCrossbones } from 'react-icons/fa'

type Props = {
  children?: React.ReactNode
  value: KeyValue | any
  width?: number
  status?: CharStatus
  onClick?: (value: KeyValue) => void
}

export const Key = ({ children, status, value, onClick = () => {} }: Props) => {
  const classes = classnames(
    'rounded font-bold focus:outline-none focus:outline-4	focus:outline-rose-700 cursor-pointer select-none origin-bottom transition-all ease-out duration-150',
    {
      'text-sm sm:text-lg aspect-key w-full': value.length === 1,
      'text-[10px] sm:text-xs px-[2%] w-full': value.length > 1,
      'bg-zinc-700 text-white hover:text-zinc-50 hover:bg-zinc-600 active:bg-zinc-800':
        !status,
      'bg-zinc-800 text-zinc-300': status === 'absent',
      'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white':
        status === 'correct',
      'bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-zinc-800':
        status === 'present',
    }
  )

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  const DeathIcon = React.useMemo(() => {
    const options = [GiLeak, RiKnifeBloodFill, FaSkullCrossbones, GiHastyGrave]
    return options[Math.floor(Math.random() * options.length)]
  }, [])

  return (
    <button
      className={`relative group flex-1 flex items-center m-[2.5px] sm:m-1 justify-center hover:scale-105 ${classes}`}
      onClick={handleClick}
      style={{ perspective: '100px' }}
    >
      {status === 'absent' && (
        <DeathIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-auto opacity-70 group-hover:opacity-30 transition-all ease-out duration-150 text-red-700" />
      )}
      <span
        className={`relative z-10 ${status === 'absent' ? 'text-[1.3em]' : ''}`}
        style={{
          transform: status === 'absent' ? 'rotate3d(1,0,0.25,35deg)' : 'none',
        }}
      >
        {value}
      </span>
    </button>
  )
}
