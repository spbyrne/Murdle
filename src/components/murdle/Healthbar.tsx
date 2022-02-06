import * as React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { FaSkull } from 'react-icons/fa'

export const Healthbar = ({ wrongLetters = 0 }) => {
  return (
    <div className="z-[500] bg-black/50 w-[80%] sm:w-[75%] max-w-[24rem] md:max-w-[30rem] mx-auto flex flex-col justify-start">
      <div
        className={`flex flex-row-reverse w-full gap-[2%] py-2 justify-between`}
      >
        {Array.from(Array(wrongLetters).keys()).map(() => {
          return (
            <FaSkull
              className={`pop-in-animation w-[85%] mx-[0.75%] h-auto text-zinc-800`}
            />
          )
        })}
        {Array.from(Array(Math.max(0, 10 - wrongLetters)).keys()).map(
          (index) => {
            return (
              <AiFillHeart
                className={`pop-in-animation w-full h-auto text-rose-800 `}
                style={{ animationDelay: `${1.2 - index * 0.1}s` }}
              />
            )
          }
        )}
      </div>
    </div>
  )
}
