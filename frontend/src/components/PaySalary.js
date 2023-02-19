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
import { AddIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { useContract, useSigner } from 'wagmi';

import ensRegistryABI from '../artifacts/contracts/payrollSC.sol/SalaryPayment.json';

const OverlayTwo = () => (
  <ModalOverlay
    bg='none'
    backdropFilter='auto'
    backdropInvert='80%'
    backdropBlur='2px'
  />
);

export default function PaySalary({ onValChange, formObject, onFormSubmit }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);

  const signer = useSigner();
  const contract = useContract({
    address: '0x1dA8BF6F4FD087bC6Fa27b645462E8dB3BE3FfD2',
    abi: ensRegistryABI.abi,
    signerOrProvider: signer,
  });

  console.log('contract', contract);
  console.log('contract');
  console.log('ensRegistryABI.abi', ensRegistryABI);

  const employeeData = useSelector((state) => state.employeeData);
  const sumAmount = employeeData.reduce(
    (acc, data) => parseFloat(acc) + parseFloat(data.amount),
    0
  );

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
        onClick={() => {
          setOverlay(<OverlayTwo />);
          onOpen();
        }}
        _hover={{ bg: 'green.200' }}
      >
        {' '}
        <ArrowRightIcon w={10} /> Pay Salary{' '}
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
              onClick={onFormSubmit}
            >
              Make Payment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
