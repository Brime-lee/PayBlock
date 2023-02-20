import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { useContract, useSigner, useProvider } from 'wagmi';
import { optimism } from 'wagmi/chains';
import ensRegistryABI from '../artifacts/contracts/payrollSC.sol/SalaryPayment.json';

import { HamburgerIcon } from '@chakra-ui/icons';

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
    address: '0x1dA8BF6F4FD087bC6Fa27b645462E8dB3BE3FfD2',
    abi: ensRegistryABI.abi,
    signerOrProvider: signer || provider,
  });

  const getAllEmployees = async () => {
    try {
      const result = await contract.getAllCompanyEmployee();
      setdata(result);
      console.log('Result:', result);
      setOverlay(<OverlayTwo />);
      onOpen();
    } catch (error) {
      console.error(error);
    }
  };

  const sumAmount = data.reduce(
    (acc, data) => parseFloat(acc) + parseFloat(data.salary._hex),
    0
  );

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
        {' '}
        <HamburgerIcon w={10} /> Employee List{' '}
      </Button>

      <Modal isOpen={isOpen} size='xl' onClose={onClose}>
        {overlay}
        <ModalContent css={{ overflowX: 'scroll', maxWidth: '900px' }}>
          <ModalHeader>Employees' List</ModalHeader>
          <ModalCloseButton />
          <ModalBody style={{ marginBottom: '20px' }}>
            <TableContainer>
              <Table size='sm'>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>NAME</Th>
                    {/* <Th>DESIGNATION</Th> */}
                    <Th>WALLET ADDRESS</Th>
                    <Th isNumeric>AMOUNT</Th>
                    {/* <Th>...</Th> */}
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map((dat, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{index + 1}</Td>
                        <Td>{dat?.name}</Td>
                        <Td>{dat?.wallet}</Td>
                        <Td>{dat?.salary._hex}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>TOTAL AMOUNT:</Th>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                    <Th>{data ? Number(sumAmount).toFixed(2) : '0.00'}</Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
