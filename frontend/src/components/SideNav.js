import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import {
  Button,
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useToast,
  Grid,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import {
  addEmployeeData,
  deleteEmployeeData,
} from '../redux/slice/employeeDataSlice';

import {
  AddIcon,
  CalendarIcon,
  EditIcon,
  HamburgerIcon,
} from '@chakra-ui/icons';
import AddEmployee from './AddEmployee';
import EmployeeList from './Employee-list';
// import WalletBalance from './WalletBalance';
import PaySalary from './PaySalary';

export default function SideNav({ newAccount, accountChangedHandler }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [employeeData, setEmployeeData] = React.useState([]);
  // const [formObject, setFormObject] = React.useState({
  //   name: '',
  //   designation: '',
  //   walletAddress: '',
  //   amount: 0.0,
  // });
  const toast = useToast();
  const dispatch = useDispatch();
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

  // const onValChange = (event) => {
  //   const value = (res) => ({
  //     ...res,
  //     [event.target.name]: event.target.value,
  //   });
  //   setFormObject(value);
  // };

  // const onFormSubmit = (event) => {
  //   event.preventDefault();
  //   const checkVal = !Object.values(formObject).every((res) => res === '');
  //   if (checkVal) {
  //     setEmployeeData((prevData) => [...prevData, formObject]);
  //     dispatch(addEmployeeData(formObject)); // Dispatch the action to add employee data
  //     successToast();
  //     setFormObject({
  //       name: '',
  //       designation: '',
  //       walletAddress: '',
  //       amount: 0.0,
  //     });
  //   }
  // };

  const deleteEmployee = (index) => {
    setEmployeeData((prevData) => {
      let newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
    dispatch(deleteEmployeeData(index)); // Dispatch the action to delete employee data
  };

  return (
    <Box>
      <Button
        ref={btnRef}
        variant='outline'
        m={3}
        maxW='100px'
        colorScheme='teal'
        onClick={onOpen}
      >
        <HamburgerIcon w={8} /> Menu
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Grid templateRows='repeat(5, 1fr)' gap={6}>
              {/* <Button
                w='80%'
                h='10'
                justifyContent='left'
                colorScheme={'green'}
                bg={'green.300'}
                color={'gray.900'}
                _hover={{ bg: 'green.200' }}
              >
                <AddIcon w={10} /> Add Organization
              </Button>
              <Button
                w='80%'
                h='10'
                justifyContent='left'
                colorScheme={'green'}
                bg={'green.300'}
                color={'gray.900'}
                _hover={{ bg: 'green.200' }}
              >
                {' '}
                <AddIcon w={10} /> Create Payroll{' '}
              </Button>
              <Button
                w='80%'
                h='10'
                justifyContent='left'
                colorScheme={'green'}
                bg={'green.300'}
                color={'gray.900'}
                _hover={{ bg: 'green.200' }}
              >
                {' '}
                <EditIcon w={10} /> Update Payroll{' '}
              </Button> */}
              <AddEmployee />
              <EmployeeList deleteEmployee={deleteEmployee} />
              <PaySalary />
              {/* 
              <Button
                w='80%'
                h='10'
                justifyContent='left'
                colorScheme={'green'}
                bg={'green.300'}
                color={'gray.900'}
                _hover={{ bg: 'green.200' }}
              >
                {' '}
                <ArrowRightIcon w={10} /> Pay Salary{' '}
              </Button> */}

              {/* <WalletBalance
                newAccount={newAccount}
                accountChangedHandler={accountChangedHandler}
              /> */}

              {/* <Button
                w='80%'
                h='10'
                justifyContent='left'
                colorScheme={'green'}
                bg={'green.300'}
                color={'gray.900'}
                _hover={{ bg: 'green.200' }}
              >
                {' '}
                <HamburgerIcon w={10} /> Wallet Balance{' '}
              </Button>

              <Button
                w='80%'
                h='10'
                justifyContent='left'
                colorScheme={'green'}
                bg={'green.300'}
                color={'gray.900'}
                _hover={{ bg: 'green.200' }}
              >
                {' '}
                <CalendarIcon w={10} /> Activity Log{' '}
              </Button> */}
            </Grid>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
