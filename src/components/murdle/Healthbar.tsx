import * as React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { FaSkull } from 'react-icons/fa'

export const Healthbar = ({ wrongLetters = 0 }) => {
  return (
    <div
      className={`flex bg-black/50 flex-row-reverse w-full gap-3 px-1 py-2 justify-between`}
    >
      {Array.from(Array(wrongLetters).keys()).map(() => {
        return (
          <FaSkull
            className={`pop-in-animation w-[85%] mx-[0.75%] h-auto text-zinc-800`}
          />
        )
      })}
      {Array.from(Array(10 - wrongLetters).keys()).map(() => {
        return <AiFillHeart className={`w-full h-auto text-rose-800 `} />
      })}
    </div>
  )
}
