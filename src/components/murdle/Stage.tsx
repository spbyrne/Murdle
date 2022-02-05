import * as React from 'react'
import { Healthbar } from './Healthbar'

export const Stage = ({ wrongLetters = '' }) => {
  const [displayedWrongLetters, setDisplayedWrongLetters] = React.useState(0)

  React.useEffect(() => {
    let animateInterval = setInterval(() => {
      if (wrongLetters.length > displayedWrongLetters) {
        setDisplayedWrongLetters(
          (displayedWrongLetters) => displayedWrongLetters + 1
        )
      }
    }, 500)
    return () => clearInterval(animateInterval)
  }, [wrongLetters, displayedWrongLetters])

  const transition = 'transition-all ease-out duration-[500ms]'
  const order = {
    base: 0,
    post: 1,
    'top-beam': 2,
    noose: 3,
    head: 4,
    torso: 5,
    'left-arm': 6,
    'right-arm': 7,
    'left-leg': 8,
    'right-leg': 9,
    dead: 9,
  }

  return (
    <div className="sticky top-4 grow-0 shrink-0 w-[40%] max-w-[12rem] mx-auto p-1 mb-2 pointer-events-none">
      <svg
        className="w-full h-auto"
        viewBox="0 0 160 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          id="top-beam"
          className={`${transition} ${
            displayedWrongLetters > order.dead
              ? 'opacity-100'
              : displayedWrongLetters > order['top-beam']
              ? 'opacity-100'
              : 'opacity-0 rotate-45'
          }`}
        >
          <rect
            x="89.1959"
            y="13.5355"
            width="53.2598"
            height="5"
            transform="rotate(135 89.1959 13.5355)"
            fill="#282424"
          />
          <rect x="41" y="2" width="91" height="15" fill="#312C2C" />
        </g>
        <g
          id="post"
          className={`origin-bottom ${transition} ${
            displayedWrongLetters > order.dead
              ? 'opacity-100'
              : displayedWrongLetters > order.post
              ? 'opacity-100'
              : 'opacity-0 -rotate-45'
          }`}
        >
          <rect
            x="51.1959"
            y="158.536"
            width="53.2598"
            height="5"
            transform="rotate(135 51.1959 158.536)"
            fill="#282424"
          />
          <rect
            width="53.2598"
            height="5"
            transform="matrix(0.707107 0.707107 0.707107 -0.707107 50 158.536)"
            fill="#282424"
          />
          <rect
            x="58"
            width="200"
            height="15"
            transform="rotate(90 58 0)"
            fill="#312C2C"
          />
        </g>
        <path
          id="torso"
          className={`${transition} ${
            displayedWrongLetters > order.dead
              ? 'opacity-100 translate-y-[1%]'
              : displayedWrongLetters > order.torso
              ? 'opacity-100'
              : 'opacity-0 -translate-y-[10%]'
          }`}
          d="M109.655 70.6333C109.849 67.4679 112.473 65 115.644 65H130.356C133.527 65 136.151 67.4679 136.345 70.6333L138.61 107.633C138.822 111.085 136.079 114 132.621 114H113.379C109.921 114 107.178 111.085 107.39 107.633L109.655 70.6333Z"
          fill="#3F3F45"
        />
        <g
          id="base"
          className={`${transition} ${
            displayedWrongLetters > order.dead
              ? 'opacity-100'
              : displayedWrongLetters > order.base
              ? 'opacity-100'
              : 'opacity-0 translate-y-full'
          }`}
        >
          <rect
            x="15"
            y="183"
            width="17"
            height="15"
            transform="rotate(90 15 183)"
            fill="#312C2C"
          />
          <rect
            x="101"
            y="183"
            width="17"
            height="15"
            transform="rotate(90 101 183)"
            fill="#312C2C"
          />
          <rect y="183" width="101" height="15" fill="#312C2C" />
        </g>
        <g
          id="right-arm"
          className={`origin-top ${transition} ${
            displayedWrongLetters > order.dead
              ? 'opacity-100 translate-x-[9%] -translate-y-[4%] rotate-[10deg]'
              : displayedWrongLetters > order['right-arm']
              ? 'opacity-100'
              : 'opacity-0 -rotate-[10deg]'
          }`}
        >
          <path
            d="M154.88 108.306C155.515 111.011 154.343 113.6 152.262 114.088C150.181 114.576 149.135 112.205 148.5 109.5C147.865 106.795 147.883 104.78 149.963 104.292C152.044 103.804 154.246 105.601 154.88 108.306Z"
            fill="#717179"
          />
          <path
            d="M128.592 74.138C126.722 71.2536 127.727 67.3864 130.765 65.7778V65.7778C133.535 64.3114 136.968 65.2855 138.554 67.988L145.948 80.5801C148.183 84.3871 149.96 88.445 151.242 92.6694L155.258 105.9C155.397 106.358 155.192 106.85 154.769 107.074L148.527 110.379C148.002 110.657 147.351 110.418 147.13 109.866L141.734 96.3611C140.382 92.977 138.703 89.733 136.72 86.6753L128.592 74.138Z"
            fill="#3F3F45"
          />
        </g>
        <g
          id="left-arm"
          className={`origin-top ${transition} ${
            displayedWrongLetters > order.dead
              ? 'opacity-100 -translate-x-[8%] translate-y-[4%] -rotate-[10deg]'
              : displayedWrongLetters > order['left-arm']
              ? 'opacity-100'
              : 'opacity-0 rotate-[10deg]'
          }`}
        >
          <path
            d="M90.5973 108.306C89.9626 111.011 91.1348 113.6 93.2157 114.088C95.2966 114.576 96.498 112.779 97.1328 110.074C97.7676 107.369 97.5953 104.78 95.5144 104.292C93.4336 103.804 91.2321 105.601 90.5973 108.306Z"
            fill="#717179"
          />
          <path
            d="M116.886 74.138C118.756 71.2536 117.751 67.3864 114.713 65.7778V65.7778C111.943 64.3114 108.51 65.2855 106.923 67.988L99.5301 80.5801C97.2949 84.3871 95.5177 88.445 94.2356 92.6694L90.2199 105.9C90.0809 106.358 90.2858 106.85 90.7088 107.074L96.9508 110.379C97.4762 110.657 98.1268 110.418 98.3474 109.866L103.744 96.3611C105.096 92.977 106.775 89.733 108.758 86.6753L116.886 74.138Z"
            fill="#3F3F45"
          />
        </g>
        <g
          id="noose"
          className={`${transition} ${
            displayedWrongLetters > order.dead
              ? 'opacity-100'
              : displayedWrongLetters > order.noose
              ? 'opacity-100'
              : 'opacity-0'
          }`}
        >
          <rect
            x="123.588"
            y="1.05719"
            width="17.4889"
            height="3"
            transform="rotate(98.6213 123.588 1.05719)"
            fill="#544C4C"
          />
          <g
            id="noose-hanging"
            className={`origin-top ${transition} ${
              displayedWrongLetters > order.dead
                ? ''
                : displayedWrongLetters > order.noose
                ? ''
                : 'rotate-[20deg]'
            }`}
          >
            <rect
              x="124"
              y="17"
              width="33"
              height="3"
              transform="rotate(90 124 17)"
              fill="#544C4C"
            />
            <rect
              x="125"
              y="42"
              width="8"
              height="5"
              transform="rotate(90 125 42)"
              fill="#544C4C"
            />
            <ellipse
              cx="123"
              cy="61"
              rx="8"
              ry="11"
              stroke="#544C4C"
              stroke-width="2"
            />
          </g>
        </g>
        <g
          id="right-leg"
          className={`origin-top ${transition} ${
            displayedWrongLetters > order.dead
              ? 'opacity-100 translate-x-[5%] -translate-y-[2%] rotate-[5deg]'
              : displayedWrongLetters > order['right-leg']
              ? 'opacity-100'
              : 'opacity-0 -translate-x-[7%] -translate-y-[4%] -rotate-[5deg]'
          }`}
        >
          <path
            d="M140.582 148.796C144.193 150.802 147.404 156.019 141.786 156.421C136.167 156.822 134.562 154.815 133.759 150.401C132.956 145.986 134.935 147.088 136.605 146.696C138.275 146.304 140.072 146.624 140.582 148.796Z"
            fill="#717179"
          />
          <path
            d="M124.1 108.221C123.499 104.872 125.801 101.694 129.171 101.22L131.683 100.867C135.053 100.394 138.141 102.814 138.487 106.199L142.794 148.364C142.849 148.898 142.471 149.381 141.939 149.456L132.705 150.753C132.173 150.828 131.677 150.469 131.582 149.94L124.1 108.221Z"
            fill="#3F3F45"
          />
        </g>
        <g
          id="left-leg"
          className={`origin-top ${transition} ${
            displayedWrongLetters > order.dead
              ? 'opacity-100 -translate-x-[5%] translate-y-[3%] -rotate-[5deg]'
              : displayedWrongLetters > order['left-leg']
              ? 'opacity-100'
              : 'opacity-0 translate-x-[7%] -translate-y-[4%] rotate-[5deg]'
          }`}
        >
          <path
            d="M105.669 148.796C102.057 150.802 98.8462 156.019 104.465 156.421C110.083 156.822 111.688 154.815 112.491 150.401C113.294 145.986 111.316 147.088 109.645 146.696C107.975 146.304 106.178 146.624 105.669 148.796Z"
            fill="#717179"
          />
          <path
            d="M121.854 108.253C122.478 104.893 120.174 101.69 116.79 101.215L114.281 100.862C110.925 100.391 107.845 102.79 107.481 106.159L102.964 147.971C102.906 148.508 103.284 148.994 103.819 149.069L113.053 150.367C113.582 150.441 114.077 150.085 114.175 149.559L121.854 108.253Z"
            fill="#3F3F45"
          />
        </g>
        <g
          id="head"
          className={`origin-center ${transition} ${
            displayedWrongLetters > order.dead
              ? 'opacity-100 rotate-[4deg]'
              : displayedWrongLetters > order.head
              ? 'opacity-100'
              : 'opacity-0 -translate-y-[10%]'
          }`}
        >
          <path
            d="M136 54.5C136.5 66 130.508 71 122.5 71C114.492 71 108.5 65.5 109 54.5C109.5 43.5 114.492 38 122.5 38C130.508 38 135.5 43 136 54.5Z"
            fill="#717179"
          />
          <g
            id="living-face"
            className={`${transition} ${
              displayedWrongLetters > order.dead ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <rect
              x="116.895"
              y="60.7047"
              width="12.0675"
              height="2.11081"
              transform="rotate(-7.5522 116.895 60.7047)"
              fill="#5A5A5D"
            />
            <circle cx="126.75" cy="50.75" r="1.75" fill="#3F3F45" />
            <circle cx="118" cy="51" r="2" fill="#3F3F45" />
          </g>
          <g
            id="dead-face"
            className={`${transition} ${
              displayedWrongLetters > order.dead ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <path
              d="M116.895 60.7047L117.144 60.6302C120.94 59.4921 124.897 58.9816 128.858 59.1187V59.1187L129.135 61.2112V61.2112C125.174 61.0741 121.218 61.5846 117.421 62.7227L117.173 62.7972L116.895 60.7047Z"
              fill="#5A5A5D"
            />
            <rect
              x="115.598"
              y="50.5953"
              width="4.93513"
              height="1.31998"
              transform="rotate(-7.5522 115.598 50.5953)"
              fill="#3F3F45"
            />
            <rect
              x="118.791"
              y="48.4577"
              width="4.93513"
              height="1.31998"
              transform="rotate(90 118.791 48.4577)"
              fill="#3F3F45"
            />
            <rect
              x="124.669"
              y="50.5599"
              width="4.26032"
              height="1.31998"
              transform="rotate(-7.5522 124.669 50.5599)"
              fill="#3F3F45"
            />
            <rect
              x="126.781"
              y="53.1626"
              width="4.26032"
              height="1.31998"
              transform="rotate(-105 126.781 53.1626)"
              fill="#3F3F45"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}
