import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'

type Props = {
  value?: string
  status?: CharStatus
}

export const Cell = ({ value, status }: Props) => {
  const classes = classnames(
    'w-full aspect-square flex-1 flex items-center justify-center m-1 text-3xl md:text-4xl font-bold rounded text-white',
    {
      'bg-zinc-800/50': !status && !value,
      'bg-zinc-800': value && !status,
      'bg-zinc-700 text-zinc-400': status === 'absent',
      'bg-green-600 text-white': status === 'correct',
      'bg-amber-400 text-zinc-700': status === 'present',
      'cell-animation': !!value,
    }
  )

  return <div className={classes}>{value}</div>
}
