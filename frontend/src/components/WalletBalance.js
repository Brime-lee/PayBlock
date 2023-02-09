// import React, { useState } from "react";
// import { ethers } from "ethers";
// import { useDisclosure } from "@chakra-ui/react";
// import { HamburgerIcon } from "@chakra-ui/icons";
// import {
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
// } from "@chakra-ui/react";

// export default function WalletBalance({newAccount, account}) {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const [errorMessage, setErrorMessage] = useState(null);
//   const [defaultAccount, setDefaultAccount] = useState(null);
//   const [userBalance, setUserBalance] = useState(null);
//   const [connButtonText, setConnButtonText] = useState('Connect Wallet');

//   const connectWalletHandler = () => {
//       if (window.ethereum && window.ethereum.isMetaMask) {
//           console.log('MetaMask Here!');

//           window.ethereum.request({ method: 'eth_requestAccounts'})
//           .then(result => {
//               accountChangedHandler(result[0]);
//               setConnButtonText('Wallet Connected');
//               getAccountBalance(result[0]);
//           })
//           .catch(error => {
//               setErrorMessage(error.message);
          
//           });

//       } else {
//           console.log('Need to install MetaMask');
//           setErrorMessage('Please install MetaMask browser extension to interact');
//       }
//   }

//   // update account, will cause component re-render
//   const accountChangedHandler = (newAccount) => {
//       setDefaultAccount(newAccount);
//       getAccountBalance(newAccount.toString());
//   }

//   const getAccountBalance = (account) => {
//       window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
//       .then(balance => {
//           setUserBalance(ethers.utils.formatEther(balance));
//       })
//       .catch(error => {
//           setErrorMessage(error.message);
//       });
//   };

//   // listen for account changes
//   window.ethereum.on('accountsChanged', accountChangedHandler);

//   window.ethereum.on('chainChanged', chainChangedHandler);
  
//   const onBalanceClick= ()=>{
//       onOpen()
//       getAccountBalance(newAccount.toString());
//   }

//   const chainChangedHandler = () => {
//     // reload the page to avoid any errors with chain change mid use of application
//     window.location.reload();
//   };
//   // listen for account changes
//   window.ethereum.on("accountsChanged", accountChangedHandler);

//   window.ethereum.on("chainChanged", chainChangedHandler);

//   return (
//     <div>
//       <Button
//         w="80%"
//         h="10"
//         bg="green.100"
//         justifyContent="left"
//         onClick={onBalanceClick}
//       >
//         {" "}
//         <HamburgerIcon w={10} /> Wallet Balance{" "}
//       </Button>

//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Wallet Balance</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <div className="accountDisplay">
//               <h5>Balance: {userBalance}</h5>
//             </div>
//             {errorMessage}
//           </ModalBody>

//           <ModalFooter>
//             <Button bg="green.100" mr={3} onClick={onClose}>
//               Close
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// }
