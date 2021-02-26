import React from "react";
import wall from "../img/wall.svg";
import mouse from "../img/mouse.svg";
import cheese from "../img/cheese.jpg";
import steps from "../img/footprint.svg";
import { Center, Text } from "@chakra-ui/react";

function Node({
  nodeState,
  handleNodeState,
  toolActive,
  isAnimationRunning,
  algorithm,
}) {
  const { row, col, visited, type } = nodeState;
  const img =
    type === "."
      ? "none"
      : type === "w"
      ? wall
      : type === "s"
      ? steps
      : type === "m"
      ? mouse
      : cheese;
  const color = visited === true ? "rgb(92, 181, 92)" : "white";

  const handleClick = () => {
    if (toolActive !== "none") handleNodeState(row, col, toolActive, visited);
  };

  return (
    <Center
      h="30px"
      w="30px"
      m="2px"
      borderRadius="4px"
      border="1px solid rgb(161, 161, 161)"
      style={{ backgroundImage: `url(${img})`, backgroundColor: color }}
      onClick={handleClick}
      cursor="pointer"
    >
      <Text fontSize="x-small">
        {algorithm === "Binary Search" && type !== "c"
          ? `${row * 20 + col}`
          : ""}
      </Text>
    </Center>
  );
}

export default Node;
