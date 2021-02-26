const binarySearch = (targetRow, targetCol, changeState, speed) => {
  let animationFrames = [];
  findPath(animationFrames, targetRow, targetCol);
  animate(changeState, animationFrames, speed);
  return (animationFrames.length - 1) * speed + 10;
};

const findPath = (nodes, animationFrames, targetRow, targetCol) => {
  let startRow = 0,
    startCol = 0,
    endRow = 12,
    endCol = 19,
    start = startRow * 13 + startCol,
    end = endRow * 13 + endCol;
    
  while (start <= end) {
    let mid = start + (end - start) / 2,
      midRow = mid / 20,
      midCol = mid % 20;
    if (midRow === targetRow && midCol === targetCol) {
    } else if (midRow <= targetRow && midCol === targetCol) {
    } else {
    }
  }
};

const animate = (changeState, animationFrames, speed) => {};

export default binarySearch;
