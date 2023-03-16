import React, { useState } from 'react';
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
import { ViewIcon } from '@chakra-ui/icons';
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

export default function CheckBalance() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayTwo />);
  const [addressBalance, setAddressBalance] = useState('');

  const provider = useProvider();
  const { data: signer } = useSigner({
    chainId: optimism.id,
  });

  const contract = useContract({
    address: '0x3e23Ff1339dB35CDA727C06ffA108a45Ee014a10',
    abi: ensRegistryABI.abi,
    signerOrProvider: signer || provider,
  });

  const getBalance = async () => {
    setOverlay(<OverlayTwo />);
    onOpen();
    try {
      let getBalance = contract.getAddressBalance();
      let balance = await getBalance;
      console.log(balance.toString());
      let contractBalance =
        parseFloat(balance.toString()) / 1000000000000000000;
      setAddressBalance(contractBalance);
      console.log('cbdhgdghwe', contractBalance);
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
        onClick={getBalance}
        _hover={{ bg: 'green.200' }}
      >
        <ViewIcon w={10} /> Contract Balance
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Are you sure you want to pay Employees?</ModalHeader>
          <ModalBody>
            Today is{' '}
            <span style={{ color: 'teal', fontWeight: 700 }}> {date}</span> and
            the contract balance is:{' '}
            <span style={{ color: 'teal', fontWeight: 700 }}>
              {addressBalance}{' '}
            </span>
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
