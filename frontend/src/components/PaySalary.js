import React, { useMemo } from 'react';
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
  const [data, setdata] = React.useState([]);

  const provider = useProvider();
  const { data: signer } = useSigner({
    chainId: optimism.id,
  });

  const contract = useContract({
    address: '0x01ADCfA82769b99218c4F4191e9D5FCE6D3E63DD',
    abi: ensRegistryABI.abi,
    signerOrProvider: signer || provider,
  });

  const toast = useToast();
  const successToast = () =>
    toast({
      title: 'Employee Added.',
      description: 'Transaction completed',
      position: 'top',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });

  const getAllEmployees = async () => {
    setOverlay(<OverlayTwo />);
    onOpen();
    try {
      const result = await contract.getAllCompanyEmployee();
      setdata(result);
      console.log('Result:', result);
    } catch (error) {
      console.error(error);
    }
  };

  const sumAmount = useMemo(
    () =>
      data.reduce(
        (acc, data) => parseFloat(acc) + parseFloat(data.salary.toString()),
        0
      ),
    [data]
  );

  const paySalaries = async () => {
    setOverlay(<OverlayTwo />);
    onOpen();
    try {
      const tx = await contract.paySalaries({ gasLimit: 1050000 });
      await tx.wait();
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
        onClick={getAllEmployees}
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
            <span style={{ color: 'teal', fontWeight: 700 }}> {date}</span> and
            the total employee salary is:{' '}
            <span style={{ color: 'teal', fontWeight: 700 }}>{sumAmount} </span>
            MATIC
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
