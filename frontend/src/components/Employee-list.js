import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
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
import { useSelector } from 'react-redux';

import { HamburgerIcon } from '@chakra-ui/icons';
import { addEmployeeData } from '../redux/slice/employeeDataSlice';

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
  const employeeData = useSelector((state) => state.employeeData);

  console.log('eeeeeeemployeeData', employeeData);
  const sumAmount = employeeData.reduce(
    (acc, data) => parseFloat(acc) + parseFloat(data.amount),
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
        onClick={() => {
          setOverlay(<OverlayTwo />);
          onOpen();
        }}
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
                    <Th>...</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {employeeData?.map((data, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{index + 1}</Td>
                        <Td>{data.name}</Td>
                        {/* <Td>{data.designation}</Td> */}
                        <Td>{data.walletAddress}</Td>
                        <Td>{data.amount}</Td>
                        <Td>
                          <Button
                            colorScheme={'green'}
                            bg={'green.300'}
                            color={'gray.900'}
                            _hover={{ bg: 'green.200' }}
                            onClick={() => deleteEmployee(index)}
                          >
                            Delete
                          </Button>
                        </Td>
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
                    <Th>
                      {employeeData ? Number(sumAmount).toFixed(2) : '0.00'}
                    </Th>
                  </Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </ModalBody>

          {/* <ModalFooter>
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
              variant='ghost'
            >
              Add Employee
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </Box>
  );
}
