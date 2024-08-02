import { useState } from "react";
import viteLogo from "/vite.svg";
import { Button, Container, Stack, Text } from "@chakra-ui/react";
import Navbar from "./components/navbar/Navbar";
import UserGrid from "./components/UserGrid/UserGrid";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Stack minH={"1oovh"}>
      <Navbar />
      <Container maxW={"1200px"} my={"4"}>
        <Text
          textTransform={"uppercase"}
          fontSize={{ md: "50", base: "3xl" }}
          textAlign={"center"}
          fontWeight={"bold"}
          letterSpacing={"24"}
          mb={8}
        >
          <Text
            as={"span"}
            bgGradient="linear(to-r, teal.500, green.500)"
            px={4}
            bgClip={"text"}
          >
            my besties
          </Text>
          🚀
        </Text>
        <UserGrid />
      </Container>
    </Stack>
  );
}

export default App;
