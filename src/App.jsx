import React from 'react'
import Die from './Die.jsx'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {


 const [dice, setDice] = React.useState(allNewDice)
 const [tenzies, setTenzies] = React.useState(false)
 const [rollTotal, setRollTotal] = React.useState(0)
 const [rollRecord, setRollRecord] = React.useState(
       parseInt(localStorage.getItem("rollRecord")) || "-"
   )




 const diceElements = dice.map(die =>
   <Die
     value={die.value}
     key={die.id}
     isHeld={die.isHeld}
     holdDice={() => holdDice(die.id)}
   />)


 React.useEffect(() =>{
   const allHeld = dice.every(die => die.isHeld)
   const firstValue = dice[0].value
   const allSame = dice.every(die => die.value === firstValue)
   if (allHeld && allSame) {
     setTenzies(true)
     if (rollTotal < rollRecord) {
       setRollRecord(rollTotal);
       localStorage.setItem("rollRecord", rollTotal.toString())
   }
   }
 }, [dice])


 function allNewDice() {
   const newDice = []
   for (let i=0; i < 10; i++) {
     newDice.push({
       value: Math.ceil(Math.random() * 6),
       isHeld: false,
       id: nanoid()
     })
   }
   return newDice
 }


 function handleRoll() {
   if (tenzies === true) {
     setDice(allNewDice)
     setTenzies(false)
     setRollTotal(0)
   } else {
     setRollTotal(oldTotal => {
       return oldTotal += 1
     })
     setDice(prevDice => prevDice.map(die => {
     return die.isHeld === false ?
     {...die,
       id: nanoid(),
       value: Math.ceil(Math.random() * 6)} :
       die
    
   }))}
 }
  function resetGame() {
   setRollTotal(0)
   setDice(allNewDice())
 }


 function holdDice(id) {
   setDice(prevDice => prevDice.map(die => {
     return die.id === id ? {...die, isHeld: !die.isHeld} : die
   }))
 }


 return (
   <main>
           {tenzies && <Confetti />}
           <h1 className="title">Tenzies</h1>
           <p className="instructions">Roll until all dice are the same.
           Click each die to freeze it at its current value between rolls.</p>
           <div className="dice-container">
               {diceElements}
           </div>
           <div className="button-container">
               <button
                   className="roll-button"
                   onClick={handleRoll}
               >
                   {tenzies ? "New Game" : "Roll"}
               </button>
               <button
                   className="reset-game"
                   onClick={resetGame}
               >
               Reset Game
               </button>
           </div>
           <div className="roll-info-tracker">
               <div className="roll-tracker">
               Roll Total: {rollTotal}
               </div>
               <div className="roll-record">
               Roll Record: {rollRecord}
               </div>
           </div>
       </main>
 )
}


export default App