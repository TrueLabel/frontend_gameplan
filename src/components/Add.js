import React, {useState, useEffect} from 'react'

const Add = (props) => {
    let emptyGame = {name: '', age: '', main_power: '', team: ''}
    const [game, setGame] = useState(emptyGame)

    const handleChange = (event) => {
        setGame({ ...game, [event.target.name]: event.target.value })
      }
      
      const handleSubmit = (event) => {
        event.preventDefault()
        props.handleCreate(game)
        setGame(emptyGame)
      }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title: </label>
            <input type="text" name="title" value={game.title} onChange={handleChange} />
            <br />
            <br />
            <label htmlFor="length">Length in Hours: </label>
            <input type="number" name="length" value={game.length} onChange={handleChange} />
            <br />
            <br />
            <label htmlFor="rating">Metacritic Rating: </label>
            <input type="number" name="rating" value={game.rating} onChange={handleChange} />
            <br />
            <br />
            <input type="submit" />
        </form>
    </>
    )
}

export default Add