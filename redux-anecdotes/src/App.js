import React from 'react';


class App extends React.Component {

  vote = (id) => (event) => {
    this.props.store.dispatch({
      type: 'VOTE',
      data: { id }
    })
  }

  addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    this.props.store.dispatch({
      type: 'NEW',
      data: {content}
    })
  }

  sortList(a, b) {
    return b.votes - a.votes
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort(this.sortList).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="content" /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default App