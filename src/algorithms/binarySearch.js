const binarySearch = (targetRow, targetCol, nodesState, changeState, speed) => {
    let nodes = []
    for(let i=0; i<13; i++){
      let tempNodes = [], tempDp = []
      for(let j=0; j<20; j++){
        tempNodes.push({...nodesState[i][j]})
      }
      nodes.push(tempNodes)
    }
  
    let animationFrames = [];
    findPath(nodes, animationFrames, startRow, startCol, dp);
    animate(changeState, animationFrames, speed);
    return (animationFrames.length-1) * speed + 10;
  };
  
  
  
  const findPath = (nodes, animationFrames, row, col, dp) => {
    
  };
  
  const animate = (changeState, animationFrames, speed) => {
    // console.log("animation", animationFrames)
    for(let i=1; i<animationFrames.length; i++){
      const [row, col, nodeState] = animationFrames[i];
      setTimeout(() => {
        if(nodeState === "."){
          changeState(row, col, "s", true)
        }
        else if(nodeState === "u"){
          changeState(row, col, ".", true)
        }
      }, (i*speed));
    }
  }
  
  export default binarySearch;
  