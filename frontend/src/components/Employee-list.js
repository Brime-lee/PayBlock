import React from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  useDisclosure,
} from '@chakra-ui/react';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useContract, useSigner, useProvider } from 'wagmi';
import { optimism } from 'wagmi/chains';
import { HamburgerIcon } from '@chakra-ui/icons';

import ensRegistryABI from '../artifacts/contracts/payrollSC.sol/SalaryPayment.json';

const OverlayTwo = () => (
  <ModalOverlay
    bg='none'
    backdropFilter='auto'
    backdropInvert='80%'
    backdropBlur='2px'
  />
);

export default function EmployeeList({ deleteEmployee }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);
  const [data, setdata] = React.useState([]);

  const provider = useProvider();
  const { data: signer } = useSigner({
    chainId: optimism.id,
  });

  const contract = useContract({
    address: '0xd0C7d29E339D647e55cdFF62008A52CB769a59bF',
    abi: ensRegistryABI.abi,
    signerOrProvider: signer || provider,
  });

  const getAllEmployees = async () => {
    setOverlay(<OverlayTwo />);
    onOpen();
    try {
      const result = await contract.getAllEmployees();
      setdata(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Button
        w='80%'
        h='10'
        justifyContent='left'
        colorScheme={'green'}
        bg={'green.300'}
        color={'gray.900'}
        _hover={{ bg: 'green.200' }}
        onClick={getAllEmployees}
      >
        <HamburgerIcon w={10} /> Employee List
      </Button>

      <Modal isOpen={isOpen} size='xl' onClose={onClose}>
        {overlay}
        <ModalContent css={{ overflowX: 'scroll', maxWidth: '900px' }}>
          <ModalHeader>Employees' List</ModalHeader>
          <ModalCloseButton />
          <ModalBody style={{ marginBottom: '20px' }}>
            <Accordion>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                      Marketers
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <ul>
                    {data[0]?.map((dat) => {
                      return (
                        <li key={dat}>
                          <p>{dat ? dat : 'Marketers list is empty'}</p>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                      Developers
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <ul>
                    {data[1]?.map((dat) => {
                      return (
                        <li key={dat}>
                          <p>{dat}</p>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                      Managers
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <ul>
                    {data[2]?.map((dat) => {
                      return (
                        <li key={dat}>
                          <p>{dat}</p>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
