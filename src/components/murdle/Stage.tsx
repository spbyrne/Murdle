import * as React from 'react'

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

export const Stage = ({ wrongLetters = '' }) => {
  const [displayedWrongLetters, setDisplayedWrongLetters] = React.useState(0)

  const [displaySpeech, setDisplaySpeech] = React.useState(false)
  const speechText = React.useMemo(() => {
    return randomFromArray(['Oh No', 'Uh oh', 'Shoot', 'Darn'])
  }, [])

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

  React.useEffect(() => {
    if (displayedWrongLetters > order.head + 1) {
      setTimeout(() => {
        setDisplaySpeech(true)
        setTimeout(() => {
          setDisplaySpeech(false)
        }, 4000)
      }, Math.random() * 5000)
    }
  }, [displayedWrongLetters])

  return (
    <div className="sticky top-4 grow-0 shrink-0 w-[35%] sm:w-[40%] max-w-[12rem] mx-auto p-1 mb-2 pointer-events-none">
      <svg
        className="w-full h-auto overflow-visible"
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
            d="M136.969 54.5C137.505 66 131.083 71 122.5 71C113.917 71 107.495 65.5 108.031 54.5C108.567 43.5 113.917 38 122.5 38C131.083 38 136.433 43 136.969 54.5Z"
            fill="#717179"
          />
          <g
            id="living-face"
            className={`${transition} ${
              displayedWrongLetters > order.dead ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <path
              d="M116.493 60.7047L116.831 60.6222C120.903 59.6298 125.147 59.4586 129.314 60.1187V60.1187L129.612 62.2112V62.2112C125.346 61.5512 120.95 61.7596 116.79 62.7972V62.7972L116.493 60.7047Z"
              fill="#5A5A5D"
            />
            <circle cx="127" cy="51" r="2" fill="#3F3F45" />
            <circle cx="117.5" cy="51.5" r="2.5" fill="#3F3F45" />
          </g>
          <g
            id="dead-face"
            className={`${transition} ${
              displayedWrongLetters > order.dead ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <path
              d="M116.493 61.7047L117.781 60.6988C121.082 58.1198 125.684 57.8883 129.314 60.1187V60.1187L129.612 62.2112V62.2112C125.982 59.9808 121.38 60.2123 118.078 62.7913L116.79 63.7972L116.493 61.7047Z"
              fill="#5A5A5D"
            />
            <rect
              width="8.40461"
              height="2.10248"
              transform="matrix(0.992436 -0.122767 0.14068 0.990055 113.499 50.4005)"
              fill="#3F3F45"
            />
            <rect
              x="118.749"
              y="47"
              width="8"
              height="2.14352"
              transform="rotate(90 118.749 47)"
              fill="#3F3F45"
            />
            <rect
              width="6.49907"
              height="1.88331"
              transform="matrix(0.992436 -0.122767 0.14068 0.990055 123.823 50.4009)"
              fill="#3F3F45"
            />
            <rect
              width="6.10087"
              height="2.00711"
              transform="matrix(-0.276021 -0.961152 0.970141 -0.242543 127.049 54.1096)"
              fill="#3F3F45"
            />
          </g>
        </g>
        <g
          id="speech-bubble"
          className={`origin-center ${transition} ${
            displayedWrongLetters > order.dead
              ? 'opacity-0'
              : displaySpeech
              ? 'opacity-100'
              : 'opacity-0 -translate-x-[6%] scale-90 -translate-y-[1%] rotate-[5deg]'
          }`}
        >
          <path d="M151.5 46.5L144.5 57L158.5 55L151.5 46.5Z" fill="#a1a1aa" />
          <ellipse
            cx="168.5"
            cy="46.0061"
            rx="19.5"
            ry="12.5"
            transform="rotate(2.88601 168.5 46.0061)"
            fill="#a1a1aa"
          />
          <text
            x="154"
            y="50"
            fontFamily='ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
            transform="rotate(2.88601 168.5 46.0061)"
            fontSize="10"
            textAnchor="center"
            letterSpacing={-0.25}
            fill="#3F3F45"
          >
            {speechText}
          </text>
        </g>
      </svg>
    </div>
  )
}

export const randomFromArray = (array: any) => {
  return array[Math.floor(Math.random() * array.length)]
}
