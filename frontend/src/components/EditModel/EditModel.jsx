import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Toast,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
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
import { CiEdit } from "react-icons/ci";
import { BaseUrl } from "../../App";

const EditModel = ({ user, setUsers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isloading, setIsloading] = useState(false);
  const [inputs, setInputs] = useState({
    name: user.name,
    role: user.role,
    desc: user.desc,
  });

  // toast
  const toast = useToast();
  const handleEditUser = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsloading(true); // Set loading state

    try {
      const res = await fetch(`${BaseUrl}/friends/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await res.json(); 
      console.log(data)

      // Log the response for debugging
      console.log("API Response:", typeof(data));

      if (!res.ok) {
        // Improved error handling
        throw new Error(data.error || "An error occurred");
      }

      // Ensure that the data returned from the API has the correct structure
      if (!data || !data.id) {
        throw new Error("Invalid response data");
      }

      // Update the users state with the edited user data
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? data : u))
      );

      // Show a success message to the user
      toast({
        status: "success",
        title: "Yayy! 🎉",
        description: "Friend updated successfully.",
        duration: 2000,
        position: "left-center",
      });

      // Close the modal
      onClose();
    } catch (error) {
      // Log the error for debugging
      console.error("Error updating user:", error);

      // Show an error message to the user
      toast({
        status: "error",
        title: "Oops! 😔",
        description:
          error.message || "An error occurred while updating the user.",
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setIsloading(false); // Reset loading state
    }
  };

  return (
    <div>
      <Button onClick={onOpen}>
        <CiEdit size={20} />
      </Button>
      {/* adding our chakra componhere */}
      <Modal size={"xs"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleEditUser}>
          <ModalContent>
            <ModalHeader>My New BFF</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex gap={2}>
                <FormControl>
                  <FormLabel>Full name</FormLabel>
                  <Input
                    value={inputs.name}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, name: e.target.value }))
                    }
                    type="text"
                    placeholder="Enter your Full name please"
                  />
                </FormControl>
                {/* at the rigth side here */}
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input
                    value={inputs.role}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, role: e.target.value }))
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
                    setInputs((prev) => ({ ...prev, desc: e.target.value }))
                  }
                  resize={"none"}
                  overflow={"none"}
                  placeholder="a passionate Software Enginner loves to build things here "
                >
                  {" "}
                </Textarea>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                isloading={isloading}
                type="submit"
                colorScheme="blue"
                mr={3}
              >
                Update
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

export default EditModel;
