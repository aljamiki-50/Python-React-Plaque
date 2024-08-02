import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import CreateUserModal from "../CreateUserModal/CreateUserModal";

const Navbar = ({ setUsers }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  // Here's the signature
  return (
    <Container>
      <Box
        px={4}
        my={4}
        borderRadius={5}
        bg={useColorModeValue("gray.200", "gray.600")}
      >
        <Flex h={16} alignItems={"Center"} justifyContent={"space-between"}>
          {/* left side  */}
          <Flex
            alignItems={"Center"}
            justifyContent={"space-between"}
            gap={3}
            display={{ base: "none", sm: "flex " }}
          >
            <img
              src="https://avatar.iran.liara.run/public"
              width={50}
              height={50}
            />
            <Text color={"white"}> + </Text>
            <img
              src="https://avatar.iran.liara.run/public/boy"
              width={50}
              height={40}
            />
            <Text color={"white"}> = </Text>

            <img
              src="https://avatar.iran.liara.run/username?username=liam+Mo"
              width={45}
              height={45}
            />
          </Flex>
          {/* right  side  */}
          <Flex
            alignItems={"Center"}
            justifyContent={"Center"}
            gap={3}
            // display={{ base: "none", sm: "flex " }}
          >
            <Text
              fontSize={"lg"}
              fontWeight={"800"}
              display={{ base: "none", md: "block" }}
              color={"white"}
            >
              BFFship 🔥 
            </Text>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <IoMoon /> : <LuSun />}
            </Button>
            <CreateUserModal setUsers={setUsers} />
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default Navbar;
