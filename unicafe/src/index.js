import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './counterReducer'

const store = createStore(counterReducer)

const Statistiikka = () => {
    const good = store.getState().good
    const ok = store.getState().ok
    const bad = store.getState().bad
    const palautteita = good + ok + bad
    const keskiarvo = (good - bad) / palautteita
    const positiivisia = (good / palautteita) * 100
    console.log(store.getState())

    if (palautteita === 0) {
        return (
            <div>
                <h2>stataistiikka</h2>
                <div>ei yhtään palautetta annettu</div>
            </div>
        )
    }

    return (
        <div>
            <h2>statistiikka</h2>
            <table>
                <tbody>
                    <tr>
                        <td>hyvä</td>
                        <td>{good}</td>
                    </tr>
                    <tr>
                        <td>neutraali</td>
                        <td>{ok}</td>
                    </tr>
                    <tr>
                        <td>huono</td>
                        <td>{bad}</td>
                    </tr>
                    <tr>
                        <td>keskiarvo</td>
                        <td>{keskiarvo.toFixed(1)}</td>
                    </tr>
                    <tr>
                        <td>positiivisia</td>
                        <td>{positiivisia.toFixed(1)}%</td>
                    </tr>
                </tbody>
            </table>

            <button onClick={e => store.dispatch({ type: 'ZERO' })}>nollaa tilasto</button>
        </div >
    )
}

class App extends React.Component {
    klik = (nappi) => () => {

    }

    render() {
        return (
            <div>
                <h2>anna palautetta</h2>
                <button onClick={e => store.dispatch({ type: 'GOOD' })}>hyvä</button>
                <button onClick={e => store.dispatch({ type: 'OK' })}>neutraali</button>
                <button onClick={e => store.dispatch({ type: 'BAD' })}>huono</button>
                <Statistiikka />
            </div>
        )
    }
}

const render = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)