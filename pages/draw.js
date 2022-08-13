import {
  Flex,
  Heading,
  Text,
  Spacer,
  Table,
  Thead,
  List,
  ListItem,
  ListIcon,
  Link,
  Tbody,
  Tr,
  Th,
  Stat,
  StatLabel,
  StatNumber,
  Divider,
  Box,
  Modal,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Center,
  ModalFooter,
  ModalBody,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  FiAtSign,
  FiTarget,
  FiDisc,
  FiUsers,
  FiAlertCircle,
  FiGift,
} from "react-icons/fi";

import Head from 'next/head'

import IconBox from "../components/iconbox";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState, useContext } from "react";
import ABI from "../contract/ABI.json";
import { useDisclosure } from '@chakra-ui/react'
import { ethers } from "ethers";
import { AppContext } from "../pages/_app";
import Web3Modal from "web3modal";
import { useToast } from '@chakra-ui/react'
import ParticipantList from "../components/partcipant-list";
const conv = require('cryptounit-converter')

export default function Home() {
  const { chainId, active, account, library, connector, activate, deactivate } = useWeb3React();
  const [display, changeDisplay] = useState("hide");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { value } = useContext(AppContext)
  const [totalBalance, setTotalBalance] = value;
  const [totalPrize, setTotalPrize] = useState(0);
  const [totalFee, setTotalFee] = useState(0);
  const [totalParticipants, setTotalParticipants] = useState([]);
  const [totalDrawID, settotalDrawID] = useState(0);
  const [previousWinner, setPreviousWinner] = useState()
  const [enterIsloading, setenterIsLoading] = useState(false);
  const toast = useToast()

  //Gonna run on every page load
  useEffect(() => {

    const connectWalletOnPageLoad = async () => {
      try {
        await activate(injected);
      } catch (ex) {
        console.log(ex);
      }
    };

    connectWalletOnPageLoad();

  }, []);

  //Gonna road whenever theres changes on 'account'
  useEffect(() => {
    async function fetchTotalSupply() {

      try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const web3Provider = new ethers.providers.Web3Provider(connection);
        const signer = web3Provider.getSigner();
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_MAIN_CONTRACT,
          ABI,
          signer
        );

        setTotalPrize((await contract.getPrize()).toString());
        setTotalFee((await contract.getRequirement()).toString());
        setTotalParticipants((await contract.getParticipants()));
        settotalDrawID(await contract.getdrawID() - 1);


      } catch (error) {
        console.log(error);
      }

    }

    if (typeof account !== "undefined" && active === true) {

      fetchTotalSupply();

    }

  }, [account, enterIsloading, chainId]);


  useEffect(() => {
    async function fetchPreviousWinner() {

      try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const web3Provider = new ethers.providers.Web3Provider(connection);
        const signer = web3Provider.getSigner();
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_MAIN_CONTRACT,
          ABI,
          signer
        );

        setPreviousWinner(await contract.getWinner(String(totalDrawID)));


      } catch (error) {
        console.log(error);
      }

    }

    if (typeof account !== "undefined" && active === true) {

      fetchPreviousWinner();
    }

  }, [totalDrawID]);



  async function enterDraw() {

    if (!active) {
      return (toast({
        title: 'Not Connected!',
        status: 'error',
        duration: 9000,
        variant: 'left-accent',
        isClosable: true,
      }))

    } else {

      if (chainId != process.env.NEXT_PUBLIC_CHAIN_ID) {

        return (toast({
          title: 'Wrong Network!',
          status: 'error',
          duration: 9000,
          variant: 'left-accent',
          isClosable: true,
        }))

      } else {

        if (totalPrize == 0) {

          return (toast({
            title: 'Lucky Draw is not active!',
            status: 'error',
            duration: 9000,
            variant: 'left-accent',
            isClosable: true,
          }))

        }
        else {

          if (totalBalance < 1000) {
            return (toast({
              title: 'Balance not enough!',
              status: 'error',
              duration: 9000,
              variant: 'left-accent',
              isClosable: true,
            }))
          }
          else {
            try {
              const web3Modal = new Web3Modal();
              const connection = await web3Modal.connect();
              const web3Provider = new ethers.providers.Web3Provider(connection);
              const signer = web3Provider.getSigner();
              const contract = new ethers.Contract(
                process.env.NEXT_PUBLIC_MAIN_CONTRACT,
                ABI,
                signer
              );

              const gasLimit = await contract.estimateGas.enterDraw();
              const gasPrice = await web3Provider.getGasPrice();

              const staking = await contract.enterDraw({
                gasLimit: gasLimit,
                gasPrice: gasPrice
              });

              setenterIsLoading(true)

              await staking.wait();

              setenterIsLoading(false)

              return (toast({
                title: 'Entry Submitted!',
                status: 'success',
                duration: 9000,
                variant: 'left-accent',
                isClosable: true,
              }))


            } catch (error) {
              console.log(error);
            }



          }




        }

      }

    }



  }






  return (
    <>

      <Head> <title>Draw | Raizzen</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Tabs variant='enclosed'>
        <TabList>
          <Tab isDisabled style={{ color: 'black' }}>Draw Details</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex
              mb={[7, 3, 3, 3, 3, 6]}
              flexDir={["column", "column", "column", "row", "row"]}
            >
              <Box
                p={5}
                mb={[3, 5, 7, 3, 3, 3]}
                bg="#252122"
                borderRadius="10px"
                w={["100%", "100%", "100%", "31%", "31%"]}
              >
                <Flex
                  flexDirection={["row", "row", "row", "row", "row"]}
                  align="center"
                  justify="center"
                  w="100%"
                >
                  <Stat>
                    <StatLabel
                      fontSize={["md", "md", "md", "md", "md"]}
                      color="gray.400"
                      fontWeight="bold"
                      pb="5px"
                    >
                      <Text>Prize</Text>
                    </StatLabel>
                    <Flex>
                      <StatNumber
                        fontSize={["md", "md", "md", "md", "md", "md"]}
                        color="#fff"
                        alignSelf="center"
                      >
                        <Text>{conv.convertWei(String(totalPrize), "ether")} {process.env.NEXT_PUBLIC_MAIN_CURRENCY}</Text>
                      </StatNumber>
                    </Flex>
                  </Stat>
                  <IconBox rounded={5} h={"45px"} w={"45px"} bg="#F7FAFC">
                    <FiGift h={"24px"} w={"24px"} color="black" />
                  </IconBox>
                </Flex>
              </Box>
              <Spacer />
              <Box
                p={5}
                mb={[3, 5, 7, 3, 3, 3]}
                bg="#252122"
                borderRadius="10px"
                w={["100%", "100%", "100%", "31%", "31%"]}
              >
                <Flex
                  flexDirection={["row", "row", "row", "row", "row"]}
                  align="center"
                  justify="center"
                  w="100%"
                >
                  <Stat>
                    <StatLabel
                      fontSize={["md", "md", "md", "md", "md"]}
                      color="gray.400"
                      fontWeight="bold"
                      pb="5px"
                    >
                      Participants
                    </StatLabel>
                    <Flex>
                      <StatNumber
                        fontSize={["md", "md", "md", "md", "md", "md"]}
                        color="#fff"
                        alignSelf="center"
                        flexDir="row"
                      >
                        {totalParticipants.length}
                      </StatNumber>
                    </Flex>
                  </Stat>
                  <IconBox rounded={5} as="box" h={"45px"} w={"45px"} bg="#F7FAFC">
                    <FiUsers h={"24px"} w={"24px"} color="black" />
                  </IconBox>
                </Flex>
              </Box>
              <Spacer />
              <Box
                p={5}
                mb={[3, 5, 7, 3, 3, 3]}
                bg="#252122"
                borderRadius="10px"
                w={["100%", "100%", "100%", "31%", "31%"]}
                alignItems="center"
              >
                <Flex
                  flexDirection={["row", "row", "row", "row", "row"]}
                  align="center"
                  justify="center"
                  w="100%"
                >
                  <Stat>
                    <StatLabel
                      fontSize={["md", "md", "md", "md", "md"]}
                      color="gray.400"
                      fontWeight="bold"
                      pb="5px"
                    >
                      Previous Winner
                    </StatLabel>
                    <Flex>
                      <StatNumber
                        fontSize={["md", "md", "md", "md", "md", "md"]}
                        color="#fff"
                        alignSelf="center"
                      >
                        {typeof previousWinner !== "undefined" ? <Link href={`https://testnet.bscscan.com/address/${String(previousWinner)}`} > {(String(previousWinner)).substring(0, 5) + `...` + String(previousWinner).substr(
                          -4
                        )}</Link> : "0x00...0000"}
                      </StatNumber>
                    </Flex>
                  </Stat>
                  <IconBox rounded={5} as="box" h={"45px"} w={"45px"} bg="#F7FAFC">
                    <FiTarget h={"24px"} w={"24px"} color="black" />
                  </IconBox>
                </Flex>
              </Box>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>




      <Box
        px={8}
        py={4}
        rounded="10px"
        mb={7}
        shadow="lg"
        bg={useColorModeValue("white", "gray.800")}
      >
        <Center>
          <Flex flexDir='column'>

            <Button
              leftIcon={<FiAlertCircle />}
              colorScheme="black"
              variant="ghost"
              w='100%'
              p={7}
              borderRadius={5}
              mb={5}
              onClick={onOpen}
            >
              Terms & Conditions
            </Button>

            <Button leftIcon={<FiDisc />} p={7} borderRadius={5}
              colorScheme='black' variant='outline' isLoading={enterIsloading} onClick={enterDraw}>
              Enter
            </Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Terms & Condition</ModalHeader>
                <ModalBody>
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon as={FiAtSign} color='green.500' />
                      There is no entry limitation, so each user can submit as much entry as they want
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FiAtSign} color='green.500' />
                      Each entry will cost user an amount of raizzen token as an entry fee
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FiAtSign} color='green.500' />
                      User can only submit entry when a lucky draw session is active
                    </ListItem>
                    {/* You can also use custom icons from react-icons */}
                    <ListItem>
                      <ListIcon as={FiAtSign} color='green.500' />
                      Every single prize won will be automatically minted to winner wallet
                    </ListItem>
                  </List>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>
        </Center>
      </Box>

      <Tabs variant='enclosed'>
        <TabList>
          <Tab isDisabled style={{ color: 'black' }}>Participants</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex flexDir="column">
              <Flex overflow="auto">
                <Table variant="unstyled" ml={[-4, -4, -4, -4, -4]}>
                  <Thead>
                    <Tr color="gray">
                      <Th>Scanner</Th>
                      <Th>Adress</Th>
                      <Th>Fee</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {totalParticipants.map((item) => (
                      <ParticipantList
                        address={item}
                        fee={conv.convertWei(String(totalFee), "ether")}
                      />
                    ))}
                    {display == "show" && <></>}
                  </Tbody>
                </Table>
              </Flex>
              <Flex align="center" mt={[2, 2, 2, 2, 0]} mb={[4, 4, 4, 4, 0]}>
                <Divider />
              </Flex>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
