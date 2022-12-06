import { useCallback, useEffect, useState } from 'react'

function getRandomInt(max:number) {
  return Math.floor(Math.random() * max);
}
const ten = [1,2,3,4,5,6,7,8,9,10];
const defaultDnas = ten.map(x => [getRandomInt(100),getRandomInt(100)])

const defaultParameters = {
  velocity: 1 ,
  dnaLength: 5,
  // dnas: [[10,10],[25,25],[70,60]] as [number, number][],
  dnas: defaultDnas as [number, number][],
  looped: ten.map(t => false),
  gameOver: false,
}
const dnaColor = '#000000';
const loopColor = '#cc0000';

const getFullDna = (dna:[number, number]): [number, number][] => [
  dna, 
  [dna[0]+1, dna[1]], 
  [dna[0]+2, dna[1]], 
  [dna[0]+3, dna[1]],
  [dna[0]+4, dna[1]],
  [dna[0]+5, dna[1]],
  [dna[0]+6, dna[1]],
  [dna[0]+7, dna[1]],
  [dna[0]+8, dna[1]],
]
const getLoopedDNA = (dna:[number, number]): [number, number][] => [
  dna, 
  [dna[0]+1, dna[1]], 
  [dna[0]+2, dna[1]],

  [dna[0]+3, dna[1]], 
  [dna[0]+4, dna[1]],
  [dna[0]+5, dna[1]],
  
  [dna[0]+4, dna[1]-1], 


  [dna[0]+3, dna[1]-2], 
  [dna[0]+5, dna[1]-2],

  [dna[0]+3, dna[1]-3], 
  [dna[0]+5, dna[1]-3],

  [dna[0]+4, dna[1]-4],

  [dna[0]+6, dna[1]],
  [dna[0]+7, dna[1]],
  [dna[0]+8, dna[1]],
]
const drawDNA = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  dnas: [number, number][],
  dnaLoops: boolean[],
  pixelSize: number,
  velocity: number,
  clear: boolean=false
) => {
  if (!canvasRef.current) return;
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  clear && ctx.clearRect(0, 0, canvas.width, canvas.height);

 

  dnas
  .map((dna, idx) => dnaLoops[idx]? getLoopedDNA(dna) : getFullDna(dna))
  .forEach((dna, idx) => dna.forEach(block => {
    ctx.fillStyle = dnaLoops[idx]? loopColor : dnaColor;
    ctx.fillRect(block[0] * pixelSize, block[1] * pixelSize, pixelSize, pixelSize)
  }))


  // blocksToRemove.forEach(block => {
  //   ctx.fillStyle = '#00ee00';
  //   ctx.fillRect(block[0] * pixelSize, block[1] * pixelSize, pixelSize, pixelSize)
  // })
  // dnas.forEach((dna, idx) =>{
  //   ctx.clearRect(block[0] * pixelSize, block[1] * pixelSize, pixelSize, pixelSize)
  // })
  
}

export const useDNAs = (boardSize: number, canvasRef: React.RefObject<HTMLCanvasElement>, pixelSize: number) => {
  const [velocity, setVelocity] = useState(defaultParameters.velocity);
  const [dnas, setDnas] = useState(defaultParameters.dnas);
  const [loopedDna, setLoopedDna] = useState(defaultParameters.looped)
  // const [canUp, setCanUp] = useState(false);

  const resetDna= useCallback(() => {
    setVelocity(defaultParameters.velocity);
    const defaultDnas = ten.map(x => [getRandomInt(100),getRandomInt(100)]) as [number, number][];
    setDnas(defaultDnas);
    setLoopedDna(defaultParameters.looped);
    setVelocity(1);
  }, [])

  

  // useEffect(() => {
  //   drawDNA(canvasRef, dnas, pixelSize);
  // })


  const updateDnas = useCallback((boardSize:number, stepsize: number = 1) => { //walls:[[number, number],[number, number]], 
    setDnas(prev => prev.map(dna=>dna[0]-velocity >= 0 ? [dna[0]-velocity, dna[1]] :  [boardSize+1+(dna[0]-velocity), dna[1]])
    )
  },[velocity])

  return { dnas, loopedDna, velocity, setLoopedDna, drawDNA, resetDna, updateDnas, setVelocity}


}