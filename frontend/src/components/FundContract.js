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
import { CheckCircleIcon } from '@chakra-ui/icons';
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

export default function FundContract() {
  const [formObject, setFormObject] = useState({
    amount: '',
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);

  const provider = useProvider();
  const { data: signer } = useSigner({
    chainId: optimism.id,
  });

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

  const receiveFund = async () => {
    try {
      let addFunds = contract.receivePayment({
        value: ethers.utils.parseEther(formObject.amount.toString()),
      });
      let funds = await addFunds;
      console.log(funds);
      successToast();
    } catch (error) {
      console.error(error);
    }
  };

  const onFormSubmit = async (event) => {
    receiveFund(formObject.salary);
    event.preventDefault();
    const checkVal = !Object.values(formObject).every((res) => res === '');
    if (checkVal) {
      setFormObject({
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
        <CheckCircleIcon w={10} /> Fund Contract
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Fund Contract address to pay Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Add Amount</FormLabel>
              <Input
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
              Fund
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
