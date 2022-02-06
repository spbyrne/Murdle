import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="About" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-lg text-zinc-500 dark:text-zinc-300">
        <b>Murdle</b> is a simple adaptation of{' '}
        <a
          href="https://github.com/hannahcode/GAME"
          className="underline font-bold"
        >
          this fantastic open source word guessing game
        </a>
        , which is built with React, Typescript, and Tailwind.{' '}
        <a
          href="https://github.com/spbyrne/Murdle"
          className="underline font-bold"
        >
          View Murdle's source on GitHub.
        </a>
      </p>
    </BaseModal>
  )
}
