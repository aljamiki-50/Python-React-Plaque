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
} from "@chakra-ui/react";
import React from "react";
import { IoHeartDislikeCircleOutline } from "react-icons/io5";
import { LuDelete } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import EditModel from "../EditModel/EditModel";


const UserCard = ({user}) => {
  return (
    <Card >
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
              <Heading fontWeight={"bold"} color={"blanchedalmond"} fontFamily={"monospace"} size={"sm"}>{user.name}</Heading>
              <Text>it s the role here </Text>
            </Box>
          </Flex>
          {/* right side for the Edit  and delete icon  */}
          <Flex>
            <EditModel user={user} />
            <IconButton
             aria-label="Search database"
             variant={"ghost"}
             colorScheme="red"

             size={"sm"}
              icon={<MdDeleteOutline 
                size={20}
               fill="tomato" />
} />
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
            {user.description}

        </Text>

      </CardBody>
    </Card>
  );
};

export default UserCard;
