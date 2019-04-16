import { maxBy, bind, random } from 'lodash'

import Route, { Point } from './Route'

export default class Engine<Problem, Solution> {
  population: Solution[]

  constructor(
    protected problem: Problem,
    protected populationSize: number,
    protected Solution: new (problem: Problem) => Solution,
    protected fitness: (problem: Problem, solution: Solution) => number,
  ) {
    this.population = Array.from({ length: populationSize }, _ => new Solution(problem))
  }

  get bestSolution(): Solution {
    return maxBy(this.population, this.fitness.bind(null, this.problem))
  }
}

export const SalesmanEngine = (nPoints: number, population: number) => {

  const points: Point[] = Array.from(
    { length: nPoints },
    _ => [random(10, 490, false), random(10, 490, false)]
  )

  return new Engine(
    points,
    population,
    Route,
    (_, x) => -x.length()
  )
}
