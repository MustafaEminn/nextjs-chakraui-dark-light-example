import {
  Box,
  Flex,
  Heading,
  Image,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import GithubIcon from "../public/GithubIcon";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  //Toggle Dark-Light Mode Hook

  const color = useColorModeValue("black", "white");
  // The first parameter works on light mode. Second parameter work on dark mode.

  const fontSize = ["20px", "25px", "25px", "35px", "35px"];
  // Responsive font size set. [Base,sm,md,lg,xl]

  const fontSizeHeading = [25, 30, 30, 40, 40];
  return (
    <Flex
      h="80px"
      align="center"
      justify="space-between"
      borderBottom={`1px solid ${color}`}
    >
      <Link href="/">
        <Heading cursor="pointer" fontSize={fontSizeHeading} ml={5} as="a">
          Next.js | Chakra UI
        </Heading>
      </Link>
      <Flex align="center" mr={5}>
        <Box
          w={fontSize}
          h={fontSize}
          as="a"
          href="https://github.com/MustafaEminn/nextjs-chakraui-dark-light-example"
          target="_blank"
          mr={3}
        >
          <GithubIcon
            width="100%"
            height="100%"
            alt="Github Logo"
            loading="lazy"
            color={color}
          />
        </Box>
        <Box
          as="button"
          fontSize={fontSize}
          minW="48px"
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? "🌜" : "☀️"}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
