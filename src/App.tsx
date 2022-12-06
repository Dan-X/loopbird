import { useState } from 'react'
import { Birdboard } from './components/Birdboard';

import './App.css'

function App() {

  return (
    <div className="App">
      <div className='Panel leftPanel'>
          <h2>Make some loops!</h2>
          <p><em>space</em> key to jump up</p> 
          <p><em>ECS</em> to pause, <em>r</em> to restart. </p>
          <p></p>
          <p>move the protein on DNA to make loops</p>
          <p>make 10 loops to get your gift!</p>
      </div>
      <div className='Panel'>
        <Birdboard  />
      </div>
      
    </div>
  )
}

export default App
