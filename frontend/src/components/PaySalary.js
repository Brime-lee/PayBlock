import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
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

export default function PaySalary() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);

  const provider = useProvider();
  const { data: signer } = useSigner({
    chainId: optimism.id,
  });

  const contract = useContract({
    address: '0xd0C7d29E339D647e55cdFF62008A52CB769a59bF',
    abi: ensRegistryABI.abi,
    signerOrProvider: signer || provider,
  });

  const toast = useToast();
  const successToast = () =>
    toast({
      title: 'Salary Paid',
      description: 'Transaction completed',
      position: 'top',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });

  const getModal = async () => {
    setOverlay(<OverlayTwo />);
    onOpen();
  };

  const paySalaries = async () => {
    setOverlay(<OverlayTwo />);
    onOpen();
    try {
      await contract.payEmployeesSalaries({ gasLimit: 105000 });
      console.log('Transaction complete!');
      successToast();
    } catch (error) {
      console.error(error);
    }
  };

  const today = new Date();
  const date = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <>
      <Button
        w='80%'
        h='10'
        justifyContent='left'
        colorScheme={'green'}
        bg={'green.300'}
        color={'gray.900'}
        onClick={getModal}
        _hover={{ bg: 'green.200' }}
      >
        <ArrowRightIcon w={10} /> Pay Salary
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Are you sure you want to pay Employees?</ModalHeader>
          <ModalBody>
            Today is{' '}
            <span style={{ color: 'teal', fontWeight: 700 }}> {date}</span>{' '}
            <br /> Are you sure you want to Pay Salary Today?
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
              onClick={paySalaries}
            >
              Make Payment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
