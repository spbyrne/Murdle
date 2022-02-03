import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import classNames from 'classnames'

type Props = {
  isOpen: boolean
  message: string
  variant?: 'success' | 'warning'
}

export const Alert = ({ isOpen, message, variant = 'warning' }: Props) => {
  const classes = classNames(
    'fixed bottom-0 z-[1000] left-1/2 transform -translate-x-1/2 max-w-sm w-full shadow-lg rounded-t-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
    {
      'bg-rose-800': variant === 'warning',
      'bg-green-700': variant === 'success',
    }
  )

  return (
    <Transition
      show={isOpen}
      as={Fragment}
      enter="ease-out duration-300 transition"
      enterFrom="opacity-0 -translate-y-1/2"
      enterTo="opacity-100"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0 -translate-y-1/2"
    >
      <div className={classes}>
        <div className="p-4">
          <p className="text-lg md:text-xl text-center font-bold text-zinc-200">
            {message}
          </p>
        </div>
      </div>
    </Transition>
  )
}
