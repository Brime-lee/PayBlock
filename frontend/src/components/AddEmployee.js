import React, { useState } from 'react';
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
  useToast,
  Select,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useContract, useSigner, useProvider } from 'wagmi';
import { optimism } from 'wagmi/chains';
import ensRegistryABI from '../artifacts/contracts/payrollSC.sol/SalaryPayment.json';

const OverlayTwo = () => (
  <ModalOverlay
    bg='none'
    backdropFilter='auto'
    backdropInvert='80%'
    backdropBlur='2px'
  />
);

export default function AddEmployee() {
  const [position, setPosition] = useState();
  const [formObject, setFormObject] = useState({
    name: '',
    walletAddress: '',
    salary: 0.0,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);

  const provider = useProvider();
  const { data: signer } = useSigner({
    chainId: optimism.id,
  });

  const contract = useContract({
    address: '0xd0C7d29E339D647e55cdFF62008A52CB769a59bF',
    abi: ensRegistryABI.abi,
    signerOrProvider: signer || provider, // use signer if available, else use provider
  });

  const toast = useToast();
  const successToast = () =>
    toast({
      title: 'Employee Added.',
      description:
        'Employee have been added to your payroll, Add another employee',
      position: 'top',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });

  const addEmployee = async () => {
    try {
      const transaction = await contract.addEmployee(
        formObject.walletAddress,
        Number(position)
      );
      await transaction.wait();
      successToast();
    } catch (error) {
      console.error(error);
    }
  };

  const onFormSubmit = async (event) => {
    addEmployee(formObject.walletAddress, formObject.salary);
    event.preventDefault();
    const checkVal = !Object.values(formObject).every((res) => res === '');
    if (checkVal) {
      setFormObject({
        walletAddress: '',
        position: '',
      });
    }
  };

  const onValChange = (event) => {
    const value = (res) => ({
      ...res,
      [event.target.name]: event.target.value,
    });
    if (event.target.name === 'position') {
      setPosition(event.target.value);
    } else {
      setFormObject(value);
    }
  };

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
              <FormLabel>Wallet Address</FormLabel>
              <Input
                type='text'
                value={formObject.walletAddress}
                name='walletAddress'
                onChange={onValChange}
              />

              <FormLabel>Position</FormLabel>
              <Select
                onChange={onValChange}
                value={position}
                name='position'
                placeholder='Kindly select your position'
              >
                <option value='0'>Marketer</option>
                <option value='1'>Developer</option>
                <option value='2'>Manager</option>
              </Select>
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
