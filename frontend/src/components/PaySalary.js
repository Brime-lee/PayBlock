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
} from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { useContract, useSigner, useProvider, WagmiConfig } from 'wagmi';
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

export default function PaySalary({ sumAmount }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);

  const provider = useProvider();
  const { data: signer } = useSigner({
    chainId: optimism.id,
  });

  const contract = useContract({
    address: '0x1dA8BF6F4FD087bC6Fa27b645462E8dB3BE3FfD2',
    abi: ensRegistryABI.abi,
    signerOrProvider: signer || provider,
  });

  console.log('contract', contract);

  async function handlePaySalaries() {
    try {
      // Call the paySalaries function on the contract instance
      const transaction = await contract.paySalaries({
        value: WagmiConfig?.utils?.parseEther('1'),
      });

      // Wait for the transaction to be confirmed
      await transaction.wait();

      // Log the successful payment to the console
      console.log(`Salaries paid successfully`);
    } catch (error) {
      console.error(`Error paying salaries: ${error}`);
    }
  }

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
              onClick={handlePaySalaries}
            >
              Make Payment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
