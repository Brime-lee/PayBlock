import React, { useMemo } from 'react';
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

export default function EmployeeList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);
  const [data, setdata] = React.useState([]);

  const provider = useProvider();
  const { data: signer } = useSigner({
    chainId: optimism.id,
  });

  const contract = useContract({
    address: '0x3e23Ff1339dB35CDA727C06ffA108a45Ee014a10',
    abi: ensRegistryABI.abi,
    signerOrProvider: signer || provider,
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
            <TableContainer>
              <Table size='sm'>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>NAME</Th>
                    <Th>WALLET ADDRESS</Th>
                    <Th isNumeric>AMOUNT(MATIC)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map((dat, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{index + 1}</Td>
                        <Td>{dat?.name}</Td>
                        <Td>{dat?.wallet}</Td>
                        <Td>
                          {parseFloat(dat?.salary.toString()) /
                            1000000000000000000}
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Th>TOTAL AMOUNT(MATIC):</Th>
                    <Th></Th>
                    <Th></Th>
                    <Th></Th>
                    <Th>
                      {data
                        ? parseFloat(sumAmount.toString()) / 1000000000000000000
                        : '0.00'}
                    </Th>
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
