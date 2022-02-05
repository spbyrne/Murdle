import * as React from 'react'
import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'

type Props = {
  value?: string
  status?: CharStatus
  dead?: boolean | undefined
  current?: boolean
}

export const Cell = ({
  dead = false,
  current = false,
  value,
  status,
}: Props) => {
  const classes = classnames(
    'relative w-full aspect-square flex-1 flex items-center justify-center m-[3px] sm:m-1 text-2xl sm:text-3xl font-bold rounded text-white',
    {
      'bg-zinc-800': !status && !value,
      'bg-zinc-700 text-zinc-50': value && !status,
      'bg-zinc-900 text-zinc-600': status === 'absent',
      'bg-green-600 text-white': status === 'correct',
      'bg-amber-400 text-zinc-700': status === 'present',
      'cell-animation': !!value,
    }
  )

  // const DeathIcon = React.useMemo(() => {
  //   const options = [GiLeak, RiKnifeBloodFill, FaSkullCrossbones, GiHastyGrave]
  //   return options[Math.floor(Math.random() * options.length)]
  // }, [])

  return (
    <div className={classes}>
      {value}
      {current && (
        <div className="blink-animation absolute left-1/2 bottom-[18%] bg-zinc-600 rounded-full w-[45%] h-[5%] -translate-x-1/2"></div>
      )}
      {/* {dead && (
        <DeathIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-auto opacity-70 text-red-700" />
      )} */}
    </div>
  )
}
