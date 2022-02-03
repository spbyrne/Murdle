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
    'flex items-center justify-center rounded m-1 font-bold cursor-pointer select-none transition-all ease-out duration-150 p-[1.125rem]',
    {
      'text-lg': value.length < 3,
      'text-xs': value.length > 2,
      'bg-zinc-600 text-white hover:text-zinc-50 hover:bg-zinc-700 active:bg-zinc-800':
        !status,
      'bg-zinc-800 text-zinc-500': status === 'absent',
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
    <button className={classes} onClick={handleClick}>
      {value}
    </button>
  )
}
