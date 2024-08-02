import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
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


const EditModel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button onClick={onOpen}>
        <CiEdit size={20} />
      </Button>
      {/* adding our chakra componhere */}
      <Modal size={"xs"}  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>My New BFF</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <Flex gap={2}>
              <FormControl>
                <FormLabel>Full name</FormLabel>
                <Input type="text" placeholder="Enter your Full name please" />
              </FormControl>
              {/* at the rigth side here */}
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Input type="text" placeholder="Software Engineer " />
              </FormControl>
            </Flex>
            <FormControl mt={3}>
              <FormLabel>Description</FormLabel>
              <Textarea
                resize={"none"}
                overflow={"none"}
                placeholder="a passionate Software Enginner loves to build things here "
              >
                {" "}
              </Textarea>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Add
            </Button>
            <Button onClick={onClose} colorScheme="red" variant="outline">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditModel;
