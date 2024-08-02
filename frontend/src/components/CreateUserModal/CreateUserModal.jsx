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
import { Radio, RadioGroup } from '@chakra-ui/react'

const CreateUserModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button onClick={onOpen}>
        <BiAddToQueue size={20} />
      </Button>
      {/* adding our chakra componhere */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
            {/*  radioGroup here */}
            <RadioGroup py={2} defaultValue="Male">
              <Stack spacing={5} direction="row">
                <Radio colorScheme="red" value="Male">
                 Male
                </Radio>
                <Radio colorScheme="green" value="Female">
                  Female
                </Radio>
              </Stack>
            </RadioGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} >
              Add
            </Button>
            <Button onClick={onClose}  colorScheme="red" variant="outline">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateUserModal;
