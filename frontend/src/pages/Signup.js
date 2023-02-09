import React, { useState } from 'react';
import {
  Text,
  Flex,
  Heading,
  Link,
  Stack,
  Box,
  Image,
  ModalFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
} from '@chakra-ui/react';
import Connect from '../components/Connect';
import Logo from '../assets/payBlockLogo.png';
import SignupImg from '../assets/signup2.jpg';

export default function Signup() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const onOpen1 = () => setIsOpen1(true);
  const onClose1 = () => setIsOpen1(false);

  const onOpen2 = () => setIsOpen2(true);
  const onClose2 = () => setIsOpen2(false);
  return (
    <Stack h={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Box align={'center'} mb={8}>
            <Link href='/'>
              <Image
                alt={'logo'}
                fit={'cover'}
                align={'center'}
                h={'80px'}
                src={Logo}
              />
            </Link>
          </Box>
          <Heading align={'center'} fontSize={'2xl'}>
            Sign up for Pay block
          </Heading>
          <Stack spacing={6}>
            <Link href={'/'} style={{ textDecoration: 'none', width: '100%' }}>
              <Button
                variant='outline'
                rounded={'full'}
                h={'40px'}
                w={'100%'}
                size={'lg'}
                px={6}
                colorScheme={'green'}
                _hover={{ bg: 'green.200', color: 'black' }}
              >
                Back
              </Button>
            </Link>
            <Connect />
            <Text align={'center'}>
              Connecting to your wallet with this app, confirms that you’ve read
              and agreed to Pay-Block’s{' '}
              <Link color={'green.500'} onClick={onOpen1}>
                Terms of Use
              </Link>{' '}
              <Modal size='xl' style isOpen={isOpen1} onClose={onClose1}>
                <ModalOverlay />
                <ModalContent
                  style={{
                    width: '500px',
                    height: '500px',
                    overflow: 'auto',
                    padding: '1rem',
                  }}
                >
                  <ModalHeader>Terms of Use for Pay-Block</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <ol>
                      <li>
                        Introduction The Pay-Block Dapp Payroll Application
                        (“Pay-Block”) is a decentralized payroll management
                        platform that provides users with a secure and efficient
                        way to manage payroll and employee payments. By
                        accessing or using Pay-Block, you agree to be bound by
                        these Terms of Use (“Terms”). If you do not agree to
                        these Terms, please do not use Pay-Block.
                      </li>
                      <br />
                      <li>
                        Use of Pay-Block You are responsible for maintaining the
                        confidentiality of your account and password and for
                        restricting access to your computer. You agree to accept
                        responsibility for all activities that occur under your
                        account or password. Pay-Block reserves the right to
                        refuse service, terminate accounts, or cancel
                        transactions in its sole discretion.
                      </li>
                      <br />
                      <li>
                        User Conduct You agree not to use Pay-Block for any
                        illegal or unauthorized purpose. You must not, in the
                        use of Pay-Block, violate any laws in your jurisdiction,
                        including but not limited to copyright laws.
                      </li>
                      <br />
                      <li>
                        Intellectual Property The technology, content, and
                        functionality of Pay-Block are protected by copyright,
                        trademark, and other laws of both the United States and
                        foreign countries. Except as explicitly permitted in
                        these Terms, you agree not to reproduce, modify, create
                        derivative works from, display, perform, publish,
                        distribute, disseminate, broadcast, or circulate any
                        content from Pay-Block to any third party.
                      </li>
                      <br />
                      <li>
                        Disclaimer of Warranties Pay-Block is provided on an “as
                        is” and “as available” basis. Pay-Block makes no
                        representations or warranties of any kind, express or
                        implied, as to the operation of Pay-Block or the
                        information, content, materials, or products included in
                        Pay-Block. You expressly agree that your use of
                        Pay-Block is at your sole risk.
                      </li>
                      <br />
                      <li>
                        Limitation of Liability Pay-Block shall not be liable
                        for any damages of any kind arising from the use of
                        Pay-Block, including but not limited to direct,
                        indirect, incidental, punitive, and consequential
                        damages.
                      </li>
                      <br />
                      <li>
                        Indemnification You agree to indemnify and hold
                        Pay-Block, its affiliates, officers, agents, and
                        employees harmless from any claim or demand, including
                        reasonable attorneys’ fees, made by any third party due
                        to or arising out of your use of Pay-Block.
                      </li>
                      <br />
                      <li>
                        Changes to these Terms Pay-Block reserves the right to
                        change these Terms at any time, and your use of
                        Pay-Block following any such change constitutes your
                        agreement to follow and be bound by the Terms as
                        changed.
                      </li>
                      <br />
                      <li>
                        Governing Law These Terms shall be governed by and
                        construed in accordance with the laws of the State of
                        Lagos, Nigeria without giving effect to its conflict of
                        laws provisions.
                      </li>
                      <br />
                      <li>
                        Dispute Resolution Any dispute arising out of or
                        relating to these Terms shall be resolved through
                        binding arbitration in accordance with the Commercial
                        Arbitration Rules of the American Arbitration
                        Association. The arbitration shall be conducted in
                        Lagos, Nigeria.
                      </li>
                      <br />
                      <li>
                        Termination Pay-Block may terminate these Terms at any
                        time and for any reason. Upon termination, you must
                        cease use of Pay-Block.
                      </li>
                      <br />
                      <li>
                        Contact Information If you have any questions about
                        these Terms, please contact us at
                        ismail.ibrahimadeiza@gmail.com
                      </li>
                      <br />
                      <li>
                        Acceptance of Terms By using Pay-Block, you acknowledge
                        that you have read and agree to these Terms.
                      </li>
                    </ol>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme='green' mr={3} onClick={onClose1}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              and{' '}
              <Link color={'green.500'} onClick={onOpen2}>
                Privacy and Policy Statement
              </Link>
              .
              <Modal size='xl' style isOpen={isOpen2} onClose={onClose2}>
                <ModalOverlay />
                <ModalContent
                  style={{
                    width: '500px',
                    height: '500px',
                    overflow: 'auto',
                    padding: '1rem',
                  }}
                >
                  <ModalHeader>
                    Privacy and Policy Statement for Pay-Block
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <p>
                      At Pay-Block, we are committed to protecting the privacy
                      and security of our users' personal and sensitive
                      information. This Privacy and Policy Statement outlines
                      our practices and policies regarding the collection, use,
                      and disclosure of personal information.
                    </p>
                    <br />
                    <ol>
                      <li>
                        Collection of Personal Information: Pay-Block collects
                        personal information that is necessary for us to provide
                        our payroll management services. This may include, but
                        is not limited to, name, address, email address, and
                        payment information.
                      </li>
                      <br />
                      <li>
                        Use of Personal Information: We use the personal
                        information collected from our users to provide our
                        services, including processing payroll transactions and
                        managing employee information. We may also use the
                        information to communicate with our users, to update
                        them on new features or services, and to send
                        promotional offers.
                      </li>
                      <br />
                      <li>
                        Disclosure of Personal Information: Pay-Block does not
                        sell or share personal information with third parties
                        except as necessary to provide our services or as
                        required by law. We may disclose personal information to
                        our affiliates, service providers, and other third
                        parties that assist us in providing our services or that
                        otherwise require the information to perform their
                        services on our behalf.
                      </li>
                      <br />
                      <li>
                        Data Retention and Security: Pay-Block takes reasonable
                        steps to protect the personal information we collect
                        from unauthorized access, use, or disclosure. We retain
                        personal information for as long as necessary to provide
                        our services and as required by law.
                      </li>
                      <br />
                      <li>
                        hanges to the Privacy and Policy Statement: Pay-Block
                        may update this Privacy and Policy Statement from time
                        to time. We will notify our users of any material
                        changes to this policy by posting the updated policy on
                        our website or by other means.
                      </li>
                      <br />
                      <li>
                        Questions and Concerns: If you have any questions or
                        concerns about our Privacy and Policy Statement or the
                        practices of Pay-Block, please contact us at
                        ismail.ibrahimadeiza@gmail.com.
                      </li>
                      <br />
                      <p>
                        This Privacy and Policy Statement is effective as of
                        01-24-2023.
                      </p>
                    </ol>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme='green' mr={3} onClick={onClose2}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              If you do not have a wallet yet, click
              <Link color={'green.500'} href='https://metamask.io/'>
                {' '}
                here
              </Link>{' '}
              to create a wallet.
            </Text>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          w={'100%'}
          h={'100%'}
          src={SignupImg}
        />
      </Flex>
    </Stack>
  );
}
