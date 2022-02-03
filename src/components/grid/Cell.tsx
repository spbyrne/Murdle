import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'

type Props = {
  value?: string
  status?: CharStatus
  dead?: boolean
}

export const Cell = ({ dead = false, value, status }: Props) => {
  const classes = classnames(
    'w-full aspect-square flex-1 flex items-center justify-center m-[3px] sm:m-1 text-2xl sm:text-3xl font-bold rounded text-white',
    {
      'bg-rose-700': dead,
      'bg-zinc-800': !dead && !status && !value,
      'bg-zinc-700 text-zinc-50': !dead && value && !status,
      'bg-zinc-800 text-zinc-500': !dead && status === 'absent',
      'bg-green-600 text-white': !dead && status === 'correct',
      'bg-amber-400 text-zinc-700': !dead && status === 'present',
      'cell-animation': !!value,
    }
  )

  return <div className={classes}>{value}</div>
}
