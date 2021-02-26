import React, { Component } from "react";
import Node from "../components/Node";
import { Flex, Center } from "@chakra-ui/react";
import Controls from "../components/Controls";
import getRandomGround from "../algorithms/Ground";
import ratInMaze from "../algorithms/ratInMaze";
import breathFirstSearch from "../algorithms/breathFirstSearch";
import binarySearch from "../algorithms/binarySearch";

export class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [[]],
      toolActive: "none", //hammer, wall, mouse, cheese
      speed: 100,
      startRow: 0, //if startRow === -1 => Start Pos not set
      startCol: 0,
      endRow: 8, //if endRow === -1 => End Pos not set
      endCol: 12,
      isAnimationRunning: false,
    };
  }

  handleNodeState = (row, col, type, visited) => {
    console.log(row, col, visited, type);

    let newState = [...this.state.nodes];
    if (type === "m") {
      if (this.state.startRow > -1) {
        const { startRow, startCol } = this.state;
        newState[startRow][startCol] = {
          ...newState[startRow][startCol],
          type: ".",
          visited: false,
        };
      }
      newState[row][col] = { ...newState[row][col], type, visited };
      this.setState({ nodes: newState, startRow: row, startCol: col });
    } else if (type === "c") {
      if (this.state.endRow > -1) {
        const { endRow, endCol } = this.state;
        newState[endRow][endCol] = {
          ...newState[endRow][endCol],
          type: ".",
          visited: false,
        };
      }
      newState[row][col] = { ...newState[row][col], type, visited };
      this.setState({ nodes: newState, endRow: row, endCol: col });
    } else {
      //if current node = "c" or "m" make -1 in state
      if(newState[row][col].type === "m")
        this.setState({startRow: -1, startCol: -1})
      else if(newState[row][col].type === "c")
        this.setState({endRow: -1, endCol: -1})
      newState[row][col] = { ...newState[row][col], type, visited };
      this.setState({ nodes: newState });
    }
  };

  handleControls = (control, value = "") => {
    if (control === "randomGround") this.handleGround();
    else if (control === "clearGround") this.handleGround(true);
    else {
      this.setState({
        [control]: value,
      });
    }
  };

  runAnimation = () => {
    const algorithm = this.props.algorithm;
    console.log(this.state.speed, algorithm);
    const { nodes, startRow, startCol, endRow, endCol, speed } = this.state;
    if (startRow > -1 && startCol > -1 && endRow > -1 && endCol > -1) {
      this.setState({
        isAnimationRunning: true,
      });
      let time = 0;
      if (algorithm === "Rat In Maze")
        time = ratInMaze(
          startRow,
          startCol,
          nodes,
          this.handleNodeState,
          speed
        );
      else if (algorithm === "Breath First Search")
        time = breathFirstSearch(
          startRow,
          startCol,
          nodes,
          this.handleNodeState,
          speed
        );
      else if (algorithm === "Dijestra")
        time = ratInMaze(
          startRow,
          startCol,
          nodes,
          this.handleNodeState,
          speed
        );
      else if (algorithm === "Binary Search")
        time = binarySearch(
          endRow,
          endCol,
          this.handleNodeState,
          speed
        );
      setTimeout(() => {
        this.setState({
          isAnimationRunning: false,
          toolActive: "none",
        });
      }, time);
    }
  };

  handleGround = (clearGround = false) => {
    const { rows, columns } = this.props.gridDimentions;
    const randomGround = getRandomGround();
    let nodes = [];

    for (let row = 0; row < rows; row++) {
      let temp = [];
      for (let col = 0; col < columns; col++) {
        const node = {
          row,
          col,
          visited: false,
          type: randomGround[row][col],
        };
        if (clearGround === true) node.type = ".";
        else if (node.type === "m")
          this.setState({ startRow: row, startCol: col });
        else if (node.type === "c") this.setState({ endRow: row, endCol: col });
        temp.push(node);
      }
      nodes.push(temp);
    }
    this.setState({ nodes });
    if (clearGround === true)
      this.setState({ startRow: -1, startCol: -1, endRow: -1, endCol: -1 });
  };

  componentDidMount() {
    this.handleGround();
  }

  render() {
    const nodes = this.state.nodes;
    // console.log("Grid", nodes)
    return (
      <Flex wrap="wrap-reverse" justify="space-around">
        <Center m="3em">
          <Flex direction="column">
            {this.state.nodes.map((row, rowIndex) => (
              <Flex justify="center" key={rowIndex}>
                {row.map((col, colIndex) => (
                  <Node
                    key={`${rowIndex + " " + colIndex}`}
                    nodeState={nodes[rowIndex][colIndex]}
                    handleNodeState={this.handleNodeState}
                    isAnimationRunning={this.state.isAnimationRunning}
                    toolActive={this.state.toolActive}
                    algorithm={this.props.algorithm}
                  />
                ))}
              </Flex>
            ))}
          </Flex>
        </Center>
        <Controls
          handleControls={this.handleControls}
          setAlgorithm={this.props.setAlgorithm}
          runAnimation={this.runAnimation}
          isAnimationRunning={this.state.isAnimationRunning}
          handleGround={this.handleGround}
        />
      </Flex>
    );
  }
}

export default Grid;
