import { shuffle, range, sumBy, sum } from 'lodash'

export type Point = [number, number]

const distance = (a: Point, b: Point) => (
  Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2)
)

class Route {
  public steps: number[]
  constructor(
    public points: Point[]
  ) {
    this.steps = shuffle(range(points.length))
  }

  length(): number {
    const { steps, points } = this
    return sum(steps.map((step, i) => (
      distance(points[step], points[steps[(i+1) % points.length]])
    )));
  }

  getPoints(): Point[] {
    return this.steps.map(i => this.points[i])
  }
}

export default Route
