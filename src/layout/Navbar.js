import React from "react";
import { Heading, Center, Flex, Link, Icon } from "@chakra-ui/react";
import { HiMail } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";

function Navbar({ algorithm }) {
  return (
    <Flex
      bgGradient="linear(to-l, #FF0080, #7928CA, #FF0080)"
      color="white"
      h="80px"
      p={2}
      mb={2}
      justify="space-between"
      alignItems="center"
    >
      <Center>
        <Icon as={GiPathDistance} w={10} h={10} m={2} />
        <Heading as="h5" size={"md"} m={2}>
          Path Finder
        </Heading>
      </Center>

      <Heading as="h4" size={"xl"}>
        {algorithm}
      </Heading>

      <Center>
        <Link href="https://github.com" isExternal m={3}>
          <Icon as={FaGithub} w={8} h={8} />
        </Link>
        <Link href="mailto:umar17ash@gmail.com" isExternal m={3}>
          <Icon as={HiMail} w={8} h={8} />
        </Link>
      </Center>
    </Flex>
  );
}

export default Navbar;
