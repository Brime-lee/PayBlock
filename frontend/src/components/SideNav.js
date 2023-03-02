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
  Grid,
} from '@chakra-ui/react';

import { HamburgerIcon } from '@chakra-ui/icons';
import AddEmployee from './AddEmployee';
import EmployeeList from './Employee-list';
import PaySalary from './PaySalary';

export default function SideNav({ newAccount, accountChangedHandler }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

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
              <AddEmployee />
              <EmployeeList />
              <PaySalary />
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
