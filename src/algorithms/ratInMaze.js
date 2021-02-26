const mouseAndCheese = (startRow, startCol, nodesState, changeState, speed) => {
  let nodes = []
  let dp = []
  for(let i=0; i<13; i++){
    let tempNodes = [], tempDp = []
    for(let j=0; j<20; j++){
      tempNodes.push({...nodesState[i][j]})
      tempDp.push(true);
    }
    nodes.push(tempNodes)
    dp.push(tempDp);
  }
  nodes[startRow][startCol].type = "."

  let animationFrames = [];
  findPath(nodes, animationFrames, startRow, startCol, dp);
  animate(changeState, animationFrames, speed);
  return (animationFrames.length-1) * speed + 10;
};

const findPath = (nodes, animationFrames, row, col, dp) => {
  if (
    row > -1 &&
    row < 13 &&
    col > -1 &&
    col < 20 &&
    nodes[row][col].type !== "w" &&
    nodes[row][col].visited === false
  ) {
    if (nodes[row][col].type === "c") {
      animationFrames.push([row, col, "c"]);
      return true;
    }
    if(dp[row][col] !== true) return false;

    if (nodes[row][col].type === ".") {
      animationFrames.push([row, col, "."]);
      nodes[row][col].visited = true;

      if (findPath(nodes, animationFrames, row - 1, col, dp)) return true;
      if (findPath(nodes, animationFrames, row + 1, col, dp)) return true;
      if (findPath(nodes, animationFrames, row, col + 1, dp)) return true;
      if (findPath(nodes, animationFrames, row, col - 1, dp)) return true;
    }
    animationFrames.push([row, col, "u"]);
    nodes[row][col].visited = false;

    return dp[row][col] = false;
  }
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

export default mouseAndCheese;
