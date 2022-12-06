import React, { useCallback, useEffect, useRef, useState } from 'react'
// import { useSnake } from './useSnake';
// import { useWalls } from './useWalls';

// import {usePathfinding} from './usePathfinding';
import { useWindowSize } from '../hooks/useWindowSize';
import { useBird } from './useBird';
import { useDNAs } from './useDNAs';

import ifIntersect from '../utils/ifIntersect'

import classes from './Birdboard.module.css'

interface Props {
}

export const Birdboard = (props: Props) => {

  const boardSize = 100;
  const updateInterval = 50;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const size = useWindowSize();
  const canvasSize = Math.floor((Math.min(size.width, size.height) - 100) / boardSize) * 100;

  const pixelSize = canvasSize / boardSize;


  const [gameOver, setGameOver] = useState(false);
  const [updating, setIsUpdating] = useState(true);
  const [score, setScore] = useState(0);

  const {
    bird, cleanBird, drawBird, resetBird, updateBird, ctlKeydownHdl, birdX
  } = useBird(boardSize, canvasRef, pixelSize)

  const {
    dnas, loopedDna, velocity, setLoopedDna, drawDNA, resetDna, updateDnas, setVelocity
  } = useDNAs(boardSize, canvasRef, pixelSize)

  const restartGameHdl = useCallback(() => {
    resetBird();
    resetDna();
    setScore(0);
    setGameOver(false);
    setIsUpdating(true);
  }, [resetBird])

  useEffect(() => {
    
    drawDNA(canvasRef, dnas, loopedDna, pixelSize, velocity, true);
    drawBird(canvasRef, bird, pixelSize, cleanBird);
  })
  useEffect(() => {
    const interval = setInterval(() => {

      if (updating && !gameOver) {
        const A = [birdX, bird] as [number, number];
        const B = [birdX, bird + 2] as [number, number];
        setLoopedDna(prev => {
          const newLoops = prev.map((looped, idx) => {
            if (looped) return true;
            const C = [dnas[idx][0] - 2, dnas[idx][1]] as [number, number];
            const D = [dnas[idx][0] + 7, dnas[idx][1]] as [number, number];
            // console.log(A,B,C,D)
            ifIntersect([A, B], [C, D]) && console.log("touch!!")
            return ifIntersect([A, B], [C, D])
          })
          const score = newLoops.filter((value) => value).length;
          setScore(score)
          if (score == 5) setVelocity(2);
          if (score == 10) setGameOver(true);
          return newLoops;
        })

        updateBird(boardSize);
        updateDnas(boardSize);
      }
    }, updateInterval);
    return () => {
      clearInterval(interval);
    };
  }, [bird, dnas, velocity, updating, updateBird, setVelocity, setGameOver]);


  const keydownHdl = useCallback((e: KeyboardEvent) => {
    switch (e.key) {

      case "Escape":
        if (gameOver) {
          restartGameHdl()
        } else {
          setIsUpdating(prev => !prev);
        }
        break;
      case "r":
        restartGameHdl()
        break;
    }
  }, [gameOver, restartGameHdl])

  useEffect(() => {
    window.addEventListener('keydown', keydownHdl);

    return () => {
      window.removeEventListener('keydown', keydownHdl);
    };
  }, [keydownHdl])


  const canvasStyle = gameOver ? { border: '2px solid red' } : updating ? { border: '2px solid black' } : { border: '2px solid orange' }

  return (
    <div>
      <div>
      </div>
      <canvas id="snakeboard" ref={canvasRef} width={canvasSize} height={canvasSize} style={canvasStyle} />
      <p>score: <em>{score}</em> </p>

      {gameOver && score === 10 && (
        <div className={classes.gameoverbox}>
          <p style={{ color: "white", fontSize: '64px' }}>Congratulations!</p>
          <p style={{ color: "white", fontSize: '64px' }}>------------------------</p>
          <p style={{ color: "white", fontSize: '64px' }}>Your gift is in ****</p>
        </div>
      )}

    </div>

  )
}
