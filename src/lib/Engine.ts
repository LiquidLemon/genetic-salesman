import { maxBy, bind, random, cloneDeep } from 'lodash'

import Route, { Point } from './Route'

export default class Engine<Problem, Solution> {
  population: Solution[]
  public mutations: ((solution: Solution) => Solution)[]

  constructor(
    protected problem: Problem,
    protected populationSize: number,
    protected Solution: new (problem: Problem) => Solution,
    protected fitness: (solution: Solution) => number,
  ) {
    this.population = Array.from({ length: populationSize }, _ => new Solution(problem))
    this.mutations = []
  }

  get bestSolution(): Solution {
    return maxBy(this.population, this.fitness)
  }

  nextEpoch() {
    // selection
    const { population, fitness, mutations } = this

    let newPopulation = Array.from({ length: this.populationSize },  _ => {
      const a = population[random(this.populationSize - 1, false)]
      const b = population[random(this.populationSize - 1, false)]
      return fitness(a) > fitness(b) ? cloneDeep(a) : cloneDeep(b)
    })

    // mutation
    const mutationChance = 0.1

    newPopulation = newPopulation.map(solution =>
      mutations
        .filter(_ => random() < mutationChance)
        .reduce((s, m) => m(s), solution)
    )

    this.population = newPopulation
  }
}

const circle = (points: number, radius: number): Point[] => 
  Array.from({ length: points }, (_, i) => [
    Math.sin(2 * Math.PI * i / points) * radius + radius,
    Math.cos(2 * Math.PI * i / points) * radius + radius
  ] as Point)

export const SalesmanEngine = (nPoints: number, population: number): Engine<Point[], Route> => {

/*   const points: Point[] = Array.from(
    { length: nPoints },
    _ => [random(10, 490, false), random(10, 490, false)] as Point
  ) */
  const points = circle(nPoints, 240)

  const engine = new Engine(
    points,
    population,
    Route,
    x => -x.length()
  )

  engine.mutations.push(r => {
    const { steps } = r
    const a = random(steps.length - 1, false)
    const b = random(steps.length - 1, false)
    const tmp = steps[a]
    steps[a] = steps[b]
    steps[b] = tmp
    return r
  })

  engine.mutations.push(r => {
    const { steps } = r
    let a = random(steps.length - 1, false)
    let b = random(steps.length - 1, false)

    if (a > b) {
      [a, b] = [b, a]
    }

    steps.splice(a, b - a, ...steps.slice(a, b).reverse())
    return r
  })

  return engine
}
