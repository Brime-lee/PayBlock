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
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useContract, useSigner, useProvider } from 'wagmi';
import { optimism } from 'wagmi/chains';
import ensRegistryABI from '../artifacts/contracts/payrollSC.sol/SalaryPayment.json';
import { ethers } from 'ethers';

const OverlayTwo = () => (
  <ModalOverlay
    bg='none'
    backdropFilter='auto'
    backdropInvert='80%'
    backdropBlur='2px'
  />
);

export default function AddEmployee() {
  const [formObject, setFormObject] = useState({
    name: '',
    walletAddress: '',
    salary: '',
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);

  const provider = useProvider();
  const { data: signer } = useSigner({
    chainId: optimism.id,
  });
  // last working contract: 0x7Acc8CdE770c7C8C473FFC8EE7DB44b3cc9Ae851
  const contract = useContract({
    address: '0xA5dD286b01f292079c0D17163E3eE843a8AB7E00',
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
        formObject.name,
        formObject.walletAddress,
        ethers.utils.parseEther(formObject.salary.toString()),
        {
          gasLimit: 1000000,
        }
      );
      const receipt = transaction.connect(signer); // use the signer to send the transaction
      console.log('Transaction sent. Transaction hash:', receipt.hash);
      successToast();
    } catch (error) {
      console.error(error);
    }
  };

  const onFormSubmit = async (event) => {
    addEmployee(formObject.name, formObject.walletAddress, formObject.salary);
    event.preventDefault();
    const checkVal = !Object.values(formObject).every((res) => res === '');
    if (checkVal) {
      setFormObject({
        name: '',
        walletAddress: '',
        salary: '',
      });
    }
  };

  const onValChange = (event) => {
    const value = (res) => ({
      ...res,
      [event.target.name]: event.target.value,
    });
    setFormObject(value);
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
              <FormLabel>Name</FormLabel>
              <Input
                type='text'
                value={formObject.name}
                name='name'
                onChange={onValChange}
              />

              <FormLabel>Wallet Address</FormLabel>
              <Input
                type='text'
                value={formObject.walletAddress}
                name='walletAddress'
                onChange={onValChange}
              />

              <FormLabel>Salary</FormLabel>
              <Input
                value={formObject.salary}
                name='salary'
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
