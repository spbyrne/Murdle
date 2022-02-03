import { ReactNode } from 'react'
import classnames from 'classnames'
import { KeyValue } from '../../lib/keyboard'
import { CharStatus } from '../../lib/statuses'

type Props = {
  children?: ReactNode
  value: KeyValue
  width?: number
  status?: CharStatus
  onClick: (value: KeyValue) => void
}

export const Key = ({ children, status, value, onClick }: Props) => {
  const classes = classnames(
    'flex-1 flex items-center justify-center rounded font-bold cursor-pointer select-none origin-bottom hover:scale-105 transition-all ease-out duration-150 px-2 py-1.5 sm:py-2 sm:px-3 lg:px-[1.125rem] lg:py-[1rem]',
    {
      'text-sm sm:text-lg': value.length < 3,
      'text-[10px] sm:text-xs': value.length > 2,
      'bg-zinc-600 text-white hover:text-zinc-50 hover:bg-zinc-700 active:bg-zinc-800':
        !status,
      'bg-gradient-to-t from-zinc-800 to-zinc-900 text-zinc-600':
        status === 'absent',
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

  return (
    <div
      className="p-[2px] sm:p-1 flex items-stretch"
      style={{ perspective: '100px' }}
    >
      <button
        className={classes}
        onClick={handleClick}
        style={{
          transform: status === 'absent' ? 'rotate3d(1,0,0,45deg)' : 'none',
        }}
      >
        {value}
      </button>
    </div>
  )
}
