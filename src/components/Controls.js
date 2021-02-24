import React, { useState } from "react";
import { IconButton, VStack, Button, Select, Flex } from "@chakra-ui/react";
import { FaHammer } from "react-icons/fa";
import { GiBrickWall } from "react-icons/gi";
import { GiCheeseWedge } from "react-icons/gi";
import { GiSeatedMouse } from "react-icons/gi";

function Controls({
  handleControls,
  setAlgorithm,
  runAnimation,
  isAnimationRunning,
}) {
  const handleClick = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    console.log(id, value);

    switch (id) {
      case "start":
        runAnimation();
        break;
      case "algorithm":
        if (value !== "") setAlgorithm(value);
        break;
      case "speed":
        if (value !== "") handleControls("speed", Number(value));
        break;
      case "clearGround":
        handleControls("clearGround");
        break;
      case "resetGround":
        handleControls("resetGround");
    }
  };

  const handleToolHammer = (event) => {
    // hammer = "." = clear node
    handleControls("toolActive", ".");
  };

  const handleToolWall = (event) => {
    handleControls("toolActive", "w");
  };

  const handleToolMouse = (event) => {
    handleControls("toolActive", "m");
  };

  const handleToolCheese = (event) => {
    handleControls("toolActive", "c");
  };

  return (
    <VStack m="3em" spacing={6} align="stretch">
      <Flex justify="space-between">
        <IconButton
          variant="outline"
          id="hammer"
          aria-label="hammer"
          colorScheme="red"
          size="lg"
          icon={<FaHammer />}
          onClick={handleToolHammer}
          disabled={isAnimationRunning}
        />
        <IconButton
          variant="outline"
          id="wall"
          aria-label="wall"
          colorScheme="teal"
          size="lg"
          onClick={handleToolWall}
          icon={<GiBrickWall />}
          disabled={isAnimationRunning}
        />
        <IconButton
          variant="outline"
          id="mouse"
          aria-label="mouse"
          colorScheme="purple"
          size="lg"
          icon={<GiSeatedMouse />}
          onClick={handleToolMouse}
          disabled={isAnimationRunning}
        />
        <IconButton
          variant="outline"
          id="cheese"
          aria-label="cheese"
          colorScheme="yellow"
          size="lg"
          icon={<GiCheeseWedge />}
          onClick={handleToolCheese}
          disabled={isAnimationRunning}
        />
      </Flex>

      <Select
        placeholder="Algorithm"
        w={"300px"}
        id="algorithm"
        onChange={handleClick}
        disabled={isAnimationRunning}
      >
        <option value="Rat In Maze">Rat In Maze</option>
        <option value="Breath First Search">Breath First Search</option>
        <option value="Dijestra">Dijestra</option>
        <option value="Binary Search">Binary Search</option>
      </Select>

      <Select
        placeholder="Animation Speed"
        id="speed"
        onChange={handleClick}
        disabled={isAnimationRunning}
      >
        <option value="250">Slow</option>
        <option value="150">Normal</option>
        <option value="30">Fast</option>
      </Select>

      <Button
        variant="outline"
        w="100%"
        id="resetGround"
        onClick={handleClick}
        disabled={isAnimationRunning}
      >
        RESET GROUND
      </Button>

      <Button
        variant="outline"
        w="100%"
        id="clearGround"
        onClick={handleClick}
        disabled={isAnimationRunning}
      >
        CLEAR GROUND
      </Button>

      <Button
        w="100%"
        id="start"
        onClick={handleClick}
        disabled={isAnimationRunning}
      >
        START
      </Button>
    </VStack>
  );
}

export default Controls;
