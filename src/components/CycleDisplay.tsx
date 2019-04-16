import * as React from 'react'

type Props = {
  points: [number, number][],
  width: number,
  height: number,
  radius: number
}

const CycleDisplay = ({ points, width, height, radius }: Props) => (
  <svg xmlns="https://www.w3.org/2000/svg"
    width={width}
    height={height}
  >
    {points.map((point, i) => {
      const a = point
      const b = points[(i+1) % points.length]
      return <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]}
                   stroke='red' strokeWidth={2} key={i}/>
    })}
    {points.map(([x, y], i) =>
      <circle cx={x} cy={y} r={radius} fill='green' key={i} />
    )}
  </svg>
)

export default CycleDisplay
