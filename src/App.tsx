import { useState } from 'react'
import { Birdboard } from './components/Birdboard';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div className='Panel leftPanel'>
          <p><em>space</em> key to jump up</p> 
          <p><em>ECS</em> to pause, <em>r</em> to restart. </p>
          <p></p>
          <p>move the protein to DNA to make loops</p>
          <p>make 10 loops to get your gift!</p>
      </div>
      <div className='Panel'>
        
        <Birdboard  />
      </div>
      
    </div>
  )
}

export default App
