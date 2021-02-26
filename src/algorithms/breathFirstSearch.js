const breathFirstSearch = (
  startRow,
  startCol,
  nodesState,
  changeState,
  speed
) => {
  let nodes = [];

  for (let i = 0; i < 13; i++) {
    let tempNodes = [];
    for (let j = 0; j < 20; j++) {
      tempNodes.push({ ...nodesState[i][j] });
    }
    nodes.push(tempNodes);
  }

  let animationFrames = [];
  let parent = {}; //can be used as hash
  findPath(startRow, startCol, nodes, animationFrames, parent);
  animate(changeState, animationFrames, parent, speed, startRow, startCol);
  return (animationFrames.length - 1) * speed + 10;
};

const findPath = (startRow, startCol, nodes, animationFrames, parent) => {
  let queue = [nodes[startRow][startCol]];
  parent[`${startRow} ${startCol}`] = [-1, -1];
  nodes[startRow][startCol].visited = true;

  while (queue.length !== 0) {
    let { row, col, type } = queue.shift();
    animationFrames.push([row, col, type]);

    const possibleRows = [-1, 0, 1, 0],
      possibleCols = [0, 1, 0, -1];

    for (let i = 0; i < 4; i++) {
      let connectedRow = row + possibleRows[i];
      let connectedCol = col + possibleCols[i];
      if (
        connectedRow > -1 &&
        connectedRow < 13 &&
        connectedCol > -1 &&
        connectedCol < 20 &&
        nodes[connectedRow][connectedCol].visited === false
      ) {
        if (nodes[connectedRow][connectedCol].type === ".") {
          parent[`${connectedRow} ${connectedCol}`] = [row, col];
          queue.push(nodes[connectedRow][connectedCol]);
          nodes[connectedRow][connectedCol].visited = true;
          animationFrames.push([connectedRow, connectedCol, "."]);
        } else if (nodes[connectedRow][connectedCol].type === "c") {
          parent[`${connectedRow} ${connectedCol}`] = [row, col];
          animationFrames.push([connectedRow, connectedCol, "c"]);
          nodes[connectedRow][connectedCol].visited = true;
          return parent;
        }
      }
    }
  }
  return parent;
};

const animate = (
  changeState,
  animationFrames,
  parent,
  speed,
  startRow,
  startCol
) => {
  // console.log("animation", animationFrames)
  for (let i = 1; i < animationFrames.length; i++) {
    const [row, col, type] = animationFrames[i];
    setTimeout(() => {
      if (type === ".") {
        changeState(row, col, ".", true);
      } else if (type === "c") {
        //display the path
        let [parentRow, parentCol] = parent[`${row} ${col}`];
        while (!(parentRow === startRow && parentCol === startCol)) {
          changeState(parentRow, parentCol, "s", true);
          [parentRow, parentCol] = parent[`${parentRow} ${parentCol}`];
        }
        return;
      }
    }, i * speed);
  }
};

export default breathFirstSearch;
