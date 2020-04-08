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

    this.engine = SalesmanEngine(10, 10)

    this.state = {
      best: this.engine.bestSolution
    }
  }

  render() {
    const route = this.state.best

    return (
      <div>
        <h1>Best route</h1>
        <CycleDisplay
          points={route.getPoints()}
          width={500} height={500} radius={5}
        />
        <button onClick={this.nextEpoch}>Next epoch</button>
        <p>Length: {route.length()}</p>
      </div>
    )
  }

  nextEpoch = () => {
    (async () => {
      for (let i = 0; i < 1000; i++) {
        this.engine.nextEpoch()
        this.setState({ best: this.engine.bestSolution }, () => console.log(this.engine))
      }
    })()
  }
}

export default App
