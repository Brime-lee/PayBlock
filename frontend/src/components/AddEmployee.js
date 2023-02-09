import React from 'react';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';

const OverlayTwo = () => (
  <ModalOverlay
    bg='none'
    backdropFilter='auto'
    backdropInvert='80%'
    backdropBlur='2px'
  />
);

export default function AddEmployee({ onValChange, formObject, onFormSubmit }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);
  const employeeData = useSelector((state) => state.employeeData);

  return (
    <>
      <Button
        w='80%'
        h='10'
        justifyContent='left'
        colorScheme={'green'}
        bg={'green.300'}
        color={'gray.900'}
        _hover={{ bg: 'green.200' }}
        onClick={() => {
          setOverlay(<OverlayTwo />);
          onOpen();
        }}
      >
        <AddIcon w={10} /> Add Employee
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Add Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type='text'
                value={formObject.name}
                name='name'
                onChange={onValChange}
              />

              {/* <FormLabel>Designation</FormLabel>
              <Input
                type='text'
                value={formObject.designation}
                name='designation'
                onChange={onValChange}
              /> */}

              <FormLabel>Wallet Address</FormLabel>
              <Input
                type='text'
                value={formObject.walletAddress}
                name='walletAddress'
                onChange={onValChange}
              />

              <FormLabel>Salary Amount</FormLabel>
              <Input
                type='text'
                value={formObject.amount}
                name='amount'
                onChange={onValChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant='ghost'
              h='10'
              justifyContent='left'
              colorScheme={'green'}
              _hover={{ bg: 'green.200', color: 'gray.900' }}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              h='10'
              justifyContent='left'
              colorScheme={'green'}
              bg={'green.300'}
              color={'gray.900'}
              _hover={{ bg: 'green.200' }}
              onClick={onFormSubmit}
            >
              Add Employee
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
