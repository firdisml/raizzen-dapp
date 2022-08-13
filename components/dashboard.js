import {
  Flex,
  Text,
  Spacer,
  Icon,
  Modal,
  Grid,
  Box,
  Stat,
  StatNumber,
  StatLabel,
  GridItem,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  List,
  ListItem,
  ListIcon,
  ModalBody,
  Divider,
  Button,
} from "@chakra-ui/react";
import {
  FiDollarSign,
  FiPercent,
  FiArchive,
  FiDatabase,
  FiRefreshCw,
  FiLock,
  FiUnlock,
} from "react-icons/fi";
import { GiAngelWings } from "react-icons/gi";
import { MdOutlineAccountBalanceWallet, MdGraphicEq, MdOutlineLock } from "react-icons/md";
import { BsHourglassSplit } from "react-icons/bs";
import { FiAlertCircle } from "react-icons/fi";
import { GrAddCircle } from "react-icons/gr";
import IconBox from "./iconbox";
import { useEffect, useState, useContext } from "react";
import { useWeb3React } from "@web3-react/core";
import ABI from "../contract/ABI.json";
import { useDisclosure } from '@chakra-ui/react'
import { ethers } from "ethers";
import { AppContext } from "../pages/_app";
import Web3Modal from "web3modal";
import { useToast } from '@chakra-ui/react'
const conv = require('cryptounit-converter')


export default function Dashboard() {


  const tokenAddress = '0x63E9Ab50C69857DDCeaBab6e608aDD90D64e27a0';
  const tokenSymbol = 'RZN';
  const tokenDecimals = 18;
  const tokenImage = 'https://i.imgur.com/JmkS8ri.png';
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { value, collab } = useContext(AppContext)
  const [totalBalance, setTotalBalance] = value;
  const [totalCollab, setTotalCollab] = collab;
  const [totalVault, setTotalVault] = useState(0);
  const { chainId, active, account } = useWeb3React();
  const [stakeIsloading, setStakeIsLoading] = useState(false);
  const [withdrawIsloading, setwithdrawIsLoading] = useState(false);
  const [totalStake, setTotalStake] = useState({});
  const toast = useToast()
  var sec = new Date().getTime() / 1000;

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

        setTotalBalance((await contract.getBalance(account)).toString());
        setTotalVault((await contract.getBalance("0x563911820C498496b250A5b756feE74338C0A5F8")).toString());
        setTotalStake(await contract.checkStake(account));



      } catch (error) {
        console.log(error);
      }
    }

    async function fetchTotalCollab() {

      try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const web3Provider = new ethers.providers.Web3Provider(connection);
        const signer = web3Provider.getSigner();
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_BRIDGE_CONTRACT,
          ABI,
          signer
        );

        setTotalCollab((await contract.getBalance(account)).toString());

      } catch (error) {
        console.log(error);
      }
    }

    if (typeof account !== "undefined" && active === true) {

      fetchTotalSupply();
      fetchTotalCollab();

    }

  }, [account, withdrawIsloading, stakeIsloading, chainId]);


  const WithdrawStake = async () => {

    if (!active) {

      return (toast({
        title: 'Not Connected',
        status: 'error',
        duration: 9000,
        variant: 'left-accent',
        isClosable: true,
      }))

    } else {

      if (chainId != process.env.NEXT_PUBLIC_CHAIN_ID) {

        return (toast({
          title: 'Wrong Network',
          status: 'error',
          duration: 9000,
          variant: 'left-accent',
          isClosable: true,
        }))

      } else {

        if (parseFloat(conv.convertWei(String(((((sec - totalStake.time_stake) / 3600) * totalStake.total_amount) / 1000)), 'ether')).toFixed(2) < 500) {

          return (toast({
            title: 'Reward Not Enough',
            status: 'error',
            duration: 9000,
            variant: 'left-accent',
            isClosable: true,
          }))

        } else {

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

            const gasLimit = await contract.estimateGas.withdrawStake(totalStake.total_amount, 0);
            const gasPrice = await web3Provider.getGasPrice();

            const staking = await contract.withdrawStake(totalStake.total_amount, 0, {
              gasLimit: gasLimit,
              gasPrice: gasPrice
            });

            setwithdrawIsLoading(true)

            await staking.wait();

            setwithdrawIsLoading(false)

            return (toast({
              title: 'Withdraw Success',
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


  async function addTokenFunction() {

    try {

      const wasAdded = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage,
          },
        },
      });

      if (wasAdded) {
        console.log('Token added!');
      } else {
        console.log('Token not added!');
      }

    } catch (error) {

      console.log(error);
    }
  }


  async function Stake() {

    if (!active) {

      return (toast({
        title: 'Not Connected',
        status: 'error',
        duration: 9000,
        variant: 'left-accent',
        isClosable: true,
      }))

    } else {

      if (chainId != process.env.NEXT_PUBLIC_CHAIN_ID) {
        return (toast({
          title: 'Wrong Network',
          status: 'error',
          duration: 9000,
          variant: 'left-accent',
          isClosable: true,
        }))

      } else {

        if (totalBalance < 100) {

          return (toast({
            title: 'Balance Not Enough',
            status: 'error',
            duration: 9000,
            variant: 'left-accent',
            isClosable: true,
          }))

        } else {

          if (parseFloat((conv.convertWei(String(totalStake.total_amount), 'ether'))).toFixed(2) > 100) {

            return (toast({
              title: 'Stake Exists',
              status: 'error',
              duration: 9000,
              variant: 'left-accent',
              isClosable: true,
            }))

          } else {

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

              const gasLimit = await contract.estimateGas.stake(String(conv.convertEther(((80 / 100) * conv.convertWei((totalBalance), 'ether')), 'wei')));
              const gasPrice = await web3Provider.getGasPrice();

              const withdrawing = await contract.stake(String(conv.convertEther(((80 / 100) * conv.convertWei((totalBalance), 'ether')), 'wei')), {
                gasLimit: gasLimit,
                gasPrice: gasPrice
              });

              setStakeIsLoading(true)

              await withdrawing.wait();

              setStakeIsLoading(false)

              return (toast({
                title: 'Stake Success',
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

      <Flex flexDir="column">
        <Grid templateColumns={["repeat(2, 1fr)"]} gap={[3, 5, 6, 10, 10, 10]} mr={-1.5} w='100%'>

          <GridItem h="auto">

            <Flex
              direction="column"
              align="center"
              w="100%"
              h={['auto', 'auto', 'auto', 'auto', 'auto', 'auto']}
              py="20px"
              bg="#252122"
              borderRadius="10px"

            >
              <IconBox rounded={5} as="box" h={["50px", "50px", "50px", "50px", "50px"]} w={["50px", "50px", "50px", "50px", "50px"]} bg="#F7FAFC">
                <Icon h={"24px"} w={"24px"} color="black" as={MdOutlineAccountBalanceWallet} />
              </IconBox>
              <Flex
                direction="column"
                m="14px"
                justify="center"
                textAlign="center"
                align="center"
                w="100%"
              >
                <Text fontSize={["md", "md", "md", "md", "md"]} color="#fff" fontWeight="bold">
                  Balance
                </Text>
                <Text mb="24px" fontSize={["xs", "xs", "xs", "xs", "xs", "sm"]} color="gray.400" fontWeight="semibold">
                  Estimated Value
                </Text>
                <Divider />
              </Flex>
              <Text fontSize="lg" color="#fff" fontWeight="bold">
                {active ? parseFloat((conv.convertWei(totalBalance.toString(), 'ether'))).toFixed(2) : '0.00'}
              </Text>
            </Flex>
          </GridItem>

          <GridItem h="auto">

            <Flex
              direction="column"
              align="center"
              w="100%"
              h={['auto', 'auto', 'auto', 'auto', 'auto', 'auto']}
              py="20px"
              bg="#252122"
              borderRadius="10px"
            >
              <IconBox rounded={5} as="box" h={["50px", "50px", "50px", "50px", "50px"]} w={["50px", "50px", "50px", "50px", "50px"]} bg="#F7FAFC">
                <Icon h={"24px"} w={"24px"} color="black" as={MdGraphicEq} />
              </IconBox>
              <Flex
                direction="column"
                m="14px"
                justify="center"
                textAlign="center"
                align="center"
                w="100%"
              >
                <Text fontSize={["md", "md", "md", "md", "md"]} color="#fff" fontWeight="bold">
                  Reward
                </Text>
                <Text mb="24px" fontSize={["xs", "xs", "xs", "xs", "xs", "sm"]} color="gray.400" fontWeight="semibold">
                  Estimated Value
                </Text>
                <Divider />
              </Flex>
              <Text fontSize="lg" color="#fff" fontWeight="bold">

                {active ? parseFloat(conv.convertWei(String(((((sec - totalStake.time_stake) / 3600) * totalStake.total_amount) / 1000)), 'ether')).toFixed(2) : '0.00'}

              </Text>
            </Flex>
          </GridItem>

          <GridItem h="auto">

            <Flex
              direction="column"
              align="center"
              w="100%"
              h={['auto', 'auto', 'auto', 'auto', 'auto', 'auto']}
              py="20px"
              bg="#252122"
              borderRadius="10px"
            >
              <IconBox rounded={5} as="box" h={["50px", "50px", "50px", "50px", "50px"]} w={["50px", "50px", "50px", "50px", "50px"]} bg="#F7FAFC">
                <Icon h={"24px"} w={"24px"} color="black" as={FiArchive} />
              </IconBox>
              <Flex
                direction="column"
                m="14px"
                justify="center"
                textAlign="center"
                align="center"
                w="100%"
              >
                <Text fontSize={["md", "md", "md", "md", "md"]} color="#fff" fontWeight="bold">
                  Total Staked
                </Text>
                <Text mb="24px" fontSize={["xs", "xs", "xs", "xs", "xs", "sm"]} color="gray.400" fontWeight="semibold">
                  Estimated Value
                </Text>
                <Divider />
              </Flex>
              <Text fontSize="lg" color="#fff" fontWeight="bold">
                {active ? parseFloat((conv.convertWei(String(totalStake.total_amount), 'ether'))).toFixed(2) : '0.00'}
              </Text>
            </Flex>
          </GridItem>

          <GridItem h="auto">

            <Flex
              direction="column"
              align="center"
              w="100%"
              h={['auto', 'auto', 'auto', 'auto', 'auto', 'auto']}
              py="20px"
              bg="#252122"
              borderRadius="10px"
            >
              <IconBox rounded={5} as="box" h={["50px", "50px", "50px", "50px", "50px"]} w={["50px", "50px", "50px", "50px", "50px"]} bg="#F7FAFC">
                <Icon h={"24px"} w={"24px"} color="black" as={BsHourglassSplit} />
              </IconBox>
              <Flex
                direction="column"
                m="14px"
                justify="center"
                textAlign="center"
                align="center"
                w="100%"
              >
                <Text fontSize={["md", "md", "md", "md", "md"]} color="#fff" fontWeight="bold">
                  Reward/Hour
                </Text>
                <Text mb="24px" fontSize={["xs", "xs", "xs", "xs", "xs", "sm"]} color="gray.400" fontWeight="semibold">
                  Estimated Value
                </Text>
                <Divider />
              </Flex>
              <Text fontSize="lg" color="#fff" fontWeight="bold">
                0.08 %
              </Text>
            </Flex>
          </GridItem>



        </Grid>

        <Box
          p={5}
          mb={[3, 5, 7, 3, 3, 3]}
          mt={[3, 5, 7, 10, 10, 10]}
          bg="#252122"
          borderRadius="10px"
          w="100%"
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
                color="white"
                fontWeight="bold"
                pb="5px"
              >
                <Text>Staked Vault</Text>
              </StatLabel>
              <Flex>
                <StatNumber
                  fontSize={["md", "md", "md", "md", "md", "md"]}
                  color="#fff"
                  alignSelf="center"
                >
                  <Text>{active ? parseFloat((conv.convertWei(String(totalVault), 'ether'))).toFixed(2) : '0.00'}</Text>
                </StatNumber>
              </Flex>
            </Stat>
            <IconBox rounded={5} h={"45px"} w={"45px"} bg="#F7FAFC">
              <MdOutlineLock h={"24px"} w={"24px"} color="black" />
            </IconBox>
          </Flex>
        </Box>

        <Box
          p={5}
          mb={[3, 5, 7, 3, 3, 3]}
          mt={[0, 0, 0, 7, 7, 7]}
          bg="#252122"
          borderRadius="10px"
          w="100%"
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
                color="white"
                fontWeight="bold"
                pb="5px"
              >
                <Text>Bridge Token Balance</Text>
              </StatLabel>
              <Flex>
                <StatNumber
                  fontSize={["md", "md", "md", "md", "md", "md"]}
                  color="#fff"
                  alignSelf="center"
                >
                  <Text>{active ? parseFloat((conv.convertWei(String(totalCollab), 'ether'))).toFixed(2) : '0.00'}</Text>
                </StatNumber>
              </Flex>
            </Stat>
            <IconBox rounded={5} h={"45px"} w={"45px"} bg="#F7FAFC">
              <GiAngelWings h={"24px"} w={"24px"} color="black" />
            </IconBox>
          </Flex>
        </Box>

      </Flex>

      <Flex flexDir="column" mt={10}>

        <Flex>
          <Button
            leftIcon={<FiAlertCircle />}
            colorScheme="black"
            variant="ghost"
            w='100%'
            p={7}
            borderRadius={5}
            onClick={onOpen}
          >
            Terms & Conditions
          </Button>
          <Button
            leftIcon={<GrAddCircle />}
            colorScheme="black"
            variant="ghost"
            w='100%'
            p={7}
            borderRadius={5}
            onClick={addTokenFunction}
          >
            Add to Metamask
          </Button>
        </Flex>



        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Terms & Condition</ModalHeader>
            <ModalBody>

              <List spacing={3}>
                <ListItem>
                  <ListIcon as={FiPercent} color='green.500' />
                  80% of your Raizzen token balance will be used for staking.
                </ListItem>
                <ListItem>
                  <ListIcon as={FiDollarSign} color='green.500' />
                  Raizzen tokens are only exclusively valid for use within the Raizzen's ecosystem , and hence do not have any real-world value and shall not be considered as real-world currency.
                </ListItem>
                <ListItem>
                  <ListIcon as={FiDatabase} color='green.500' />
                  You can only place a stake once, and you must first withdraw your existing stake in order to place another one.
                </ListItem>
                {/* You can also use custom icons from react-icons */}
                <ListItem>
                  <ListIcon as={FiRefreshCw} color='green.500' />
                  Reward per hour will fluctuate dependent on the current demand for this project.
                </ListItem>
              </List>

            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Spacer />

        <Button
          leftIcon={<FiLock />}
          isLoading={stakeIsloading}
          loadingText='Staking'
          colorScheme="black"
          variant="outline"
          p={7}
          mt={5}
          mb={5}
          borderRadius={5}
          onClick={Stake}
        >
          Stake
        </Button>

        <Button
          leftIcon={<FiUnlock />}
          isLoading={withdrawIsloading}
          loadingText='Withdrawing'
          colorScheme="black"
          variant="outline"
          p={7}
          onClick={WithdrawStake}
          borderRadius={5}

        >
          Withdraw
        </Button>
      </Flex>
    </>


  );
}
