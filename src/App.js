import {useState, useEffect} from 'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'
import Delete from './components/Delete'

const App = () => {
  const [game, setGame] = useState([])
  

// Show Function
  const getGame = () => {
    axios
    .get('http://localhost:8000/api/game_api')
    .then(
      (response) => setGame(response.data),
      (err) => console.error(err)
    )
    .catch((error) => console.error(error))
  }

// Create Funtion
const handleCreate = (addGame) => {
  // let nextId = game[game.length - 1].id + 1
  axios.post('http://localhost:8000/api/game_api', addGame)
  .then((response) => {
    // addGame.id = nextId
    setGame([...game, response.data])
  })
}


// Delete Function
  const handleDelete = (deletedGame) => {
    axios
      .delete('http://localhost:8000/api/game_api/' + deletedGame.id)
      .then((response) => {
        setGame(game.filter(game => game.id !== deletedGame.id))
      })
  }

// Edit Function
const handleUpdate = (editGame) => {
  axios.put('http://localhost:8000/api/game_api/' + editGame.id, editGame)
  .then((response) => {
    setGame(game.map((game) => {
      return game.id !== editGame.id ? game : editGame
    }))
  })
}


    useEffect(() => {
      getGame()
    }, [])


// Total Hours

const [weeklyHours, setWeeklyHours] = useState(0);
const [totalWeeks, setTotalWeeks] = useState(0);

let totalHours = 0

for (let i = 0; i < game.length; i++ ) {
  totalHours = totalHours + game[i].length;
}

let weekHours = 0


const handleChange = (event) => {
  event.preventDefault()
  setWeeklyHours({[event.target.name]: event.target.value});
  console.log(weekHours)
}

// const totalSubmit = (event) => {
//   event.preventDefault();
//   setTotalWeeks(Math.floor(totalHours/{weeklyHours}));
//   console.log({totalWeeks})
// }

{/* <form onSubmit={totalSubmit}>
<label htmlFor="totalHours">Hours per Week: </label>
<input type="number" name="totalHours" value={0} onChange={handleChange} /> */}

// const handleChange = (event) => {
//   setGame({...game, [event.target.name]: event.target.value})
// }

// const handleSubmit = (event) => {
//   event.preventDefault()
//   props.handleUpdate(game)
// }



  
  return(
    <>
    <h1 className="text-lg font-medium leading-6 text-gray-900">GamePlan</h1>
    <div id='hoursbar'>
      <h3>Total Hours in Collection: {totalHours}</h3>
          <label htmlFor="weeklyHours">Hours per Week: </label>
          <input type="number" name="weeklyHours" onChange={handleChange} />
      <h3>Total Weeks: {{totalHours}/{weeklyHours}}</h3>
          
        
      {/* <h3> Total Weeks: {totalWeeks}</h3> */}
    </div>
  <Add handleCreate={handleCreate} />
  <div className="game md:grid md:grid-cols-3 md:gap-6 md:col-span-1 space-y-6 bg-white px-4 py-5 sm:p-6">
    {game.map((game) => {
      return (
        <div className="game" key={game.id}>
  <h4>Title: {game.title}</h4>
  <h5>Length in Hours: {game.length}</h5>
  <h5>Metacritic Rating: {game.rating}</h5>
  <Edit game={game} handleUpdate={handleUpdate} id={game.id} />
  {/* <Delete /> */}
  <button onClick={()=> {handleDelete(game)}} value={game.id}>
    <strong>X</strong>
  </button>
  <br/>
  <br/>
</div>
      )
    })}
  </div>
</>
  )
}

export default App;