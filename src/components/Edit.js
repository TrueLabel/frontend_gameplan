import {useState} from 'react'

const Edit = (props) => {
    const [game, setGame] = useState({...props.game})

  const handleChange = (event) => {
    setGame({...game, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleUpdate(game)
  }


  return (
    <>
      <details>
        <summary>Edit Game</summary>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" value={game.title} onChange={handleChange} />
          <br />
          <br />
          <label htmlFor="length">Length in Hours: </label>
          <input type="number" name="length" value={game.length} onChange={handleChange}/>
          <br />
          <br />
          <label htmlFor="main_power">Metacritic Rating: </label>
          <input type="number" name="rating" value={game.rating} onChange={handleChange} />
          <br />
          <br />
          <input type="submit"/>
        </form>
      </details>
    </>
  )
}

export default Edit