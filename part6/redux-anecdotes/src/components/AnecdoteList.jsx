import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes, filter}) => {
    if (filter === null) {
      return anecdotes
    }
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter))
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(setNotification(`you voted ${anecdote.content}`))
  }

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  return (
    <>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>)
      }
    </>
  )
}

export default AnecdoteList