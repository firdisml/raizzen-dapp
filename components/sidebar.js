import {
  Flex,
  Heading,
  Text,
  Icon,
  Link,
  Button,
} from "@chakra-ui/react";

import { IconButton } from '@chakra-ui/react'

import { FiHome, FiGitlab, FiShoppingBag, FiClipboard, FiGift, FiMenu, FiUsers } from "react-icons/fi";

import { injected } from "./connector";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import detectEthereumProvider from '@metamask/detect-provider'

export default function Sidebar() {


  const networkInit = async () => {

    if (chainId == 97) {

      return toast({
        title: "Network already added",
        status: "success",
        duration: 9000,
        variant: "left-accent",
        isClosable: true,
      });

    } else {

      const provider = await detectEthereumProvider({
        mustBeMetaMask: true
      })
      if (provider) {

        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x38',
              chainName: 'Binance Smart Chain',
              nativeCurrency: {
                name: 'Binance Chain Native Token',
                symbol: 'BNB',
                decimals: 18
              },
              rpcUrls: ['https://bsc-dataseed.binance.org'],
              blockExplorerUrls: ['https://bscscan.com']
            }]
          })
        } catch (e) {
          console.error(e);
        }

      } else {
        console.error('Please install MetaMask')
      }

    }

  }

  //Decalration
  const router = useRouter();
  const toast = useToast();
  const { chainId, active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function connect() {

    if (chainId != 97) {

      networkInit();

    }

    try {
      await activate(injected);
      localStorage.setItem("isWalletConnected", true);
    } catch (ex) {
      console.log(ex);
    }
  }

  function NavigateRedeem() {
    router.push("/redeem");
  }

  function NavigateCollab() {
    router.push("/collab");
  }

  function NavigateLinks() {
    router.push("/links");
  }

  function NavigateOrder() {
    router.push("/order");
  }

  function NavigateDraw() {
    router.push("/draw");
  }

  function NavigateHome() {
    router.push("/");
  }


  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await activate(injected);
          localStorage.setItem("isWalletConnected", true);
        } catch (ex) {
          console.log(ex);
        }
      }
    };

    if (chainId != 97) {

      networkInit();
      connectWalletOnPageLoad();

    }

    connectWalletOnPageLoad();

  }, []);


  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await activate(injected);
          localStorage.setItem("isWalletConnected", true);
        } catch (ex) {
          console.log(ex);
        }
      }
    };

    connectWalletOnPageLoad();

    if (active) {
      if (chainId !== 97) {
        console.error("Wrong ChainID");
        return toast({
          title: "Wrong network",
          description: "Please Connect To Binance Smart Chain",
          status: "error",
          duration: 9000,
          variant: "left-accent",
          isClosable: true,
        });
      } else {
      }
    }
  }, [chainId]);

  return (
    <>
      {" "}
      <head>
        <link rel="preload" href="/nuku1.ttf" as="font" crossOrigin="" />
      </head>
      <Flex
        w={["100%", "100%", "100%", "100%", "17%"]}
        flexDir="column"
        alignItems="center"
        backgroundColor="#252122"
        color="#fff"
      >
        <Flex
          flexDir="column"
          justifyContent="space-between"
          h={[null, null, null, null, "100vh"]}
        >
          <Flex flexDir="column" as="nav">
            {/* Title?Heading */}

            <Heading
              mt={50}
              mb={[100, 100, 100, 100, 10, 100]}
              ml={[1, 1, 1, 1, 0]}
              fontSize="7xl"
              alignSelf="center"
              letterSpacing="tight"
            >
              <h1>RZN</h1>
            </Heading>

            <Flex
              flexDir={["row", "row", "row", "row", "column"]}
              mt={[-20, -20, -20, -20, 0]}
              align={["center", "center", "center", "center", "flex-start"]}
              wrap={["wrap", "wrap", "wrap", "wrap", "wrap"]}
              justifyContent="content"
            >

              {/* Home */}

              <Flex className="sidebar-items" ml={[4, 4, 4, 4, 0]}>
                <Link
                  onClick={NavigateHome}
                  display={["flex", "flex", "flex", "flex", "flex"]}
                >
                  <Icon
                    as={FiHome}
                    className={router.pathname == "/" ? "active-icon" : ""}
                    fontSize={["3xl", "3xl", "3xl", "3xl", "2xl", "3xl"]}
                  ></Icon>
                </Link>
                <Link
                  _hover={{ textDecor: "none" }}
                  onClick={NavigateHome}
                  display={["none", "none", "none", "none", "flex"]}
                >
                  <Text
                    className={router.pathname == "/" ? "active" : ""}
                    fontSize={["3xl", "3xl", "3xl", "3xl", "lg", "xl"]}
                  >
                    Home
                  </Text>
                </Link>
              </Flex>



              {/* Redeem */}

              <Flex
                className="sidebar-items"
                pl={[7, 7, 7, 7, 0]}
                mt={[0, 0, 0, 0, 0, 3]}
              >
                <Link
                  onClick={NavigateRedeem}
                  display={["flex", "flex", "flex", "flex", "flex"]}
                >
                  <Icon
                    as={FiShoppingBag}
                    className={
                      router.pathname == "/redeem" ? "active-icon" : ""
                    }
                    fontSize={["3xl", "3xl", "3xl", "3xl", "2xl", "3xl"]}
                  ></Icon>
                </Link>
                <Link
                  onClick={NavigateRedeem}
                  _hover={{ textDecor: "none" }}
                  display={["none", "none", "none", "none", "flex"]}
                >
                  <Text
                    className={
                      router.pathname == "/redeem" ? "active" : ""
                    }
                    fontSize={["3xl", "3xl", "3xl", "3xl", "lg", "xl"]}
                  >
                    Redeem
                  </Text>
                </Link>
              </Flex>

              {/* Redeem */}

              <Flex
                className="sidebar-items"
                pl={[7, 7, 7, 7, 0]}
                mt={[0, 0, 0, 0, 0, 3]}
              >
                <Link
                  onClick={NavigateCollab}
                  display={["flex", "flex", "flex", "flex", "flex"]}
                >
                  <Icon
                    as={FiUsers}
                    className={
                      router.pathname == "/collab" ? "active-icon" : ""
                    }
                    fontSize={["3xl", "3xl", "3xl", "3xl", "2xl", "3xl"]}
                  ></Icon>
                </Link>
                <Link
                  onClick={NavigateCollab}
                  _hover={{ textDecor: "none" }}
                  display={["none", "none", "none", "none", "flex"]}
                >
                  <Text
                    className={
                      router.pathname == "/collab" ? "active" : ""
                    }
                    fontSize={["3xl", "3xl", "3xl", "3xl", "lg", "xl"]}
                  >
                    Collab
                  </Text>
                </Link>
              </Flex>


              {/* Comic */}

              <Flex
                className="sidebar-items"
                pl={[7, 7, 7, 7, 0]}
                mt={[0, 0, 0, 0, 0, 3]}
              >
                <Link onClick={NavigateLinks} display={["flex", "flex", "flex", "flex", "flex"]}>
                  <Icon
                    as={FiMenu}
                    className={router.pathname == "/links" ? "active-icon" : ""}
                    fontSize={["3xl", "3xl", "3xl", "3xl", "2xl", "3xl"]}
                  ></Icon>
                </Link>
                <Link
                  onClick={NavigateLinks}
                  _hover={{ textDecor: "none" }}
                  display={["none", "none", "none", "none", "flex"]}
                >
                  <Text
                    className={
                      router.pathname == "/links" ? "active" : ""
                    }
                    fontSize={["3xl", "3xl", "3xl", "3xl", "lg", "xl"]}
                  >
                    Links
                  </Text>
                </Link>
              </Flex>

              {/* Lucky Draw */}

              <Flex
                className="sidebar-items"
                pl={[7, 7, 7, 7, 0]}
                mt={[0, 0, 0, 0, 0, 3]}
              >
                <Link onClick={NavigateDraw} display={["flex", "flex", "flex", "flex", "flex"]}>
                  <Icon
                    as={FiGift}
                    className={router.pathname == "/draw" ? "active-icon" : ""}
                    fontSize={["3xl", "3xl", "3xl", "3xl", "2xl", "3xl"]}
                  ></Icon>
                </Link>
                <Link
                  onClick={NavigateDraw}
                  _hover={{ textDecor: "none" }}
                  display={["none", "none", "none", "none", "flex"]}
                >
                  <Text
                    className={
                      router.pathname == "/draw" ? "active" : ""
                    }
                    fontSize={["3xl", "3xl", "3xl", "3xl", "lg", "xl"]}
                  >
                    Draw
                  </Text>
                </Link>
              </Flex>

            </Flex>
          </Flex>

          {/* Avatar Part*/}
        </Flex>

        <Flex flexDir="row" alignItems="center" mb={10} mt={10}>

          <IconButton variant='outline'
            colorScheme='white'
            aria-label='Send email' onClick={NavigateOrder} p={5} py={6} mr={5} icon={<FiClipboard />} 
          />

          <Button
            leftIcon={<FiGitlab />}
            colorScheme="white"
            variant="outline"
            p={[4, 4, 4, 4, 4, 4]}
            size={["xs", "xs", "xs", "xs", "xs", "xs"]}
            onClick={connect}
          >
            {active
              ? `${String(account).substring(0, 5)}...${String(account).substr(
                -4
              )}`
              : `Connect Wallet`}
          </Button>


        </Flex>
      </Flex>
    </>
  );
}
