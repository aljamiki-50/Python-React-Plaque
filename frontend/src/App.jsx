import React, { useState } from 'react';
import viteLogo from "/vite.svg";
import { Button, Container, Stack, Text } from "@chakra-ui/react";
import Navbar from "./components/navbar/Navbar";
import UserGrid from "./components/UserGrid/UserGrid";

export const BaseUrl = "http://127.0.0.1:5000/api";

function App() {
  const [users, setUsers] = useState([]);

  return (
    <Stack minH={"1oovh"}>
      {/* we passing users to the nav bar and  then we grapping the users details and send them to the userGrid down down  👇 */}
      <Navbar setUsers={setUsers} />
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
        <UserGrid users={users} setUsers={setUsers} />
      </Container>
    </Stack>
  );
}

export default App;
