import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { BiAddToQueue } from "react-icons/bi";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { BaseUrl } from "../../App";

const CreateUserModal = ({ setUsers }) => {
  // state for our menu
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  // lets  create a const of inputs here
  const [inputs, setInputs] = useState({
    name: "",
    role: "",
    desc: "",
    gender: "",
  });
  // using toast as a notifier
  const toast = useToast();

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetch(BaseUrl + "/friends");
      const data = await res.json();
      if (!res.ok) {
        throw new Error("There is an error: " + data.message);
      }
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // Use effect to fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // lets hook the form with useEffectt
  const handleUserInput = async (e) => {
    // preventing default value first
    e.preventDefault(); // Corrected typo
    setIsLoading(true);

    try {
      const res = await fetch(BaseUrl + "/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs), // Corrected typo
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error("There is an error: " + data.error); // Corrected error handling
      }

      toast({
        title: "Account created successfully.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      onClose();
      // Fetch users to refresh the list
      fetchUsers();
    } catch (error) {
      toast({
        title: "Account not created.",
        description: error.message || "There was an issue creating your account.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={onOpen}>
        <BiAddToQueue size={20} />
      </Button>
      {/* creating a form here so we getting a value from users  */}
      {/* adding our chakra componhere */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleUserInput}>
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex gap={2}>
                <FormControl>
                  <FormLabel>Full name</FormLabel>
                  <Input
                    type="text"
                    value={inputs.name}
                    onChange={(e) =>
                      setInputs({ ...inputs, name: e.target.value })
                    }
                    placeholder="Enter your Full name please"
                  />
                </FormControl>
                {/* at the rigth side here */}
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input
                    value={inputs.role}
                    onChange={(e) =>
                      setInputs({ ...inputs, role: e.target.value })
                    }
                    type="text"
                    placeholder="Software Engineer "
                  />
                </FormControl>
              </Flex>
              <FormControl mt={3}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={inputs.desc}
                  onChange={(e) =>
                    setInputs({ ...inputs, desc: e.target.value })
                  }
                  resize={"none"}
                  overflow={"none"}
                  placeholder="a passionate Software Enginner loves to build things here "
                >
                  {" "}
                </Textarea>
              </FormControl>
              {/*  radioGroup here */}
              <RadioGroup
                py={2}
                value={inputs.gender}
                onChange={(value) =>
                  setInputs({ ...inputs, gender: value })
                } // Modified to handle value directly
              >
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="red" value="male">
                    Male
                  </Radio>
                  <Radio colorScheme="green" value="female">
                    Female
                  </Radio>
                </Stack>
              </RadioGroup>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3} isLoading={isLoading}>
                Add
              </Button>
              <Button onClick={onClose} colorScheme="red" variant="outline">
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
};

export default CreateUserModal;
