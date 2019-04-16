import * as React from 'react'

import Engine, { SalesmanEngine } from '../lib/Engine'
import Route, { Point } from '../lib/Route'
import CycleDisplay from './CycleDisplay'

type State = {
  best: Route
}

class App extends React.Component<{}, State> {
  engine: Engine<Point[], Route>

  constructor(props: {}) {
    super(props)

    this.engine = SalesmanEngine(15, 50)

    this.state = {
      best: this.engine.bestSolution
    }
  }

  render() {
    return (
      <div>
        <h1>Best route</h1>
        <CycleDisplay
          points={this.state.best.getPoints()}
          width={500} height={500} radius={5}
        />
      </div>
    )
  }
}

export default App
