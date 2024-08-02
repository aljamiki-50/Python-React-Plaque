import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
  Toast,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { IoHeartDislikeCircleOutline } from "react-icons/io5";
import { LuDelete } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import EditModel from "../EditModel/EditModel";
import { BaseUrl } from "../../App";

const UserCard = ({ user, setUsers }) => {
  const toast = useToast();
  const deleteUser = async () => {
    // console.log(user.id)
    try {
      const res = await fetch(`${BaseUrl}/friends/${user.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error(data.Error);
      }

      // console.log(setUsers)
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));

      toast({
        title: "Account deleted successfully.",
        description: "The account has been removed.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error deleting account.",
        description:
          error.message || "There was an issue deleting the account.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Card>
      <CardHeader gap={"4"}>
        <Flex gap={"4"}>
          {/* left side for the avatar and username and userrole */}
          <Flex
            flex={"1"}
            gap={"4"}
            alignItems={"center"}
            // border={"1px solid red"}
          >
            <Avatar src="https://avatar.iran.liara.run/public/boy?username=Scott" />
            <Box>
              <Heading
                fontWeight={"bold"}
                color={"blanchedalmond"}
                fontFamily={"monospace"}
                size={"sm"}
              >
                {user.name}
              </Heading>
              <Text>{user.role} </Text>
            </Box>
          </Flex>
          {/* right side for the Edit  and delete icon  */}
          <Flex>
            <EditModel user={user} setUsers={setUsers} />
            <IconButton
              aria-label="delete from database"
              variant={"ghost"}
              colorScheme="red"
              onClick={deleteUser}
              size={"sm"}
              icon={<MdDeleteOutline size={20} fill="tomato" />}
            />
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{user.desc}</Text>
      </CardBody>
    </Card>
  );
};

export default UserCard;
