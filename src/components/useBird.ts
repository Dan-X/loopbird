import { useCallback, useEffect, useState } from 'react'

const defaultBird = {
  velocity: 2,
  x:50,
  y: 25,
  gameOver: false,
}
const birdColor = '#377eb8';
const drawBird = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  birdY: number,
  pixelSize: number,
  clear: boolean=false
) => {
  const bird = [defaultBird.x, birdY];
  if (!canvasRef.current) return;
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  clear && ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = birdColor;
  ctx.fillRect(bird[0] * pixelSize, (bird[1]-1) * pixelSize, pixelSize, pixelSize)
  ctx.fillRect(bird[0] * pixelSize, bird[1] * pixelSize, pixelSize, pixelSize)
  
}

export const useBird = (boardSize: number, canvasRef: React.RefObject<HTMLCanvasElement>, pixelSize: number) => {
  const [bird, setBird] = useState(defaultBird.y);
  // const [canUp, setCanUp] = useState(false);

  const resetBird= useCallback(() => {
    setBird(defaultBird.y);
  }, [])

  const ctlKeydownHdl = useCallback((e: KeyboardEvent) => {
    // if (!canUp) return;
    switch (e.key) {
      case "ArrowUp":
      case " ":
      case "w":
        setBird(prev => prev === 0 ? prev : prev-10)
        // setCanUp(false);
        break;
    }
  }, []) // canUp

  // useEffect(() => {
  //   drawBird(canvasRef, [defaultBird.x, bird], pixelSize);
  // })


  useEffect(() => {
    window.addEventListener('keydown', ctlKeydownHdl);

    return () => {
      window.removeEventListener('keydown', ctlKeydownHdl);
    };
  }, [ctlKeydownHdl])

  const updateBird = useCallback((boardSize:number, stepsize: number = 1) => { //walls:[[number, number],[number, number]], 
    
    setBird(prev => (prev+stepsize > boardSize) ? boardSize-1 : prev+stepsize)
  },[])

  return { bird, drawBird, resetBird, updateBird, ctlKeydownHdl, birdX: defaultBird.x}


}