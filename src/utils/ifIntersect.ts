const ccw = (A:[number, number], B:[number, number], C:[number, number]) => {
  return (C[1]-A[1])*(B[0]-A[0]) > (B[1]-A[1])*(C[0]-A[0])
}


const ifIntersect = (l1:[[number, number],[number, number]], l2:[[number, number],[number, number]]) => {
  const A = l1[0];
  const B = l1[1];
  const C = l2[0];
  const D = l2[1];
  return ccw(A,C,D) != ccw(B,C,D) && ccw(A,B,C) != ccw(A,B,D)
}

export default ifIntersect;