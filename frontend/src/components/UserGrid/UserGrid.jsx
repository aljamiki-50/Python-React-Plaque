import { Center, Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Users } from "../../dummy/dummy";
import UserCard from "../UserCard/UserCard";
import { BaseUrl } from "../../App";

const UserGrid = ({ users, setUsers }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // lets fetch our data from the api we create though flask
    const getUser = async () => {
      try {
        const res = await fetch(BaseUrl + "friends");
        const data = await res.json();
        // console.log(data)

        if (!res.ok) {
          throw new Error(data.error);
        }
        setUsers(data);
      } catch (error) {
        throw new Error({ "From the catch Error ": error });
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, [setUsers]);
  return (
    <>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2,1fr)",
          lg: "repeat(3,1fr)",
        }}
        gap={"4"}
      >
        {users.map((user) => (
          <UserCard key={user.id} setUsers={setUsers} user={user} />
        ))}
      </Grid>
      {isLoading && (
        <Flex
          justify={"center"}
          alignItems={"Center"}
          textAlign={"center"}
          mt={10}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      )}
      {!isLoading && users.length === 0 && (
        <Flex justifyContent={"center"}>
          <Text fontSize={"xl"}>
            <Text as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
              Poor you! 🥺
            </Text>
            No friends found.
          </Text>
        </Flex>
      )}
    </>
  );
};

export default UserGrid;
