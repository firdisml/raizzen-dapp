//Import Libraries
import {
  Flex,
  Text,
  Spacer,
  IconButton,
  Table,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Thead,
  Tbody,
  Tr,
  Th,
  Stat,
  Center,
  Spinner,
  StatLabel,
  StatNumber,
  Divider,
  Link,
  Box,
  AspectRatio,
  Container,
} from "@chakra-ui/react";
import {
  FiAtSign,
  FiStopCircle,
  FiArchive,
} from "react-icons/fi";
import HomeItem from '../components/home-item'
import Head from 'next/head'
import { useState, useEffect } from "react";
import IconBox from "../components/iconbox";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";
import TransferList from "../components/transfer-list";
import ChakraCarousel from "../components/chakra-carousell";
import initFirebase from "../components/initFirebase";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'


//Home Page
export default function Home() {
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const { account } = useWeb3React();
  const [display, changeDisplay] = useState("hide");

  useEffect(() => {

    initFirebase();

    const requestBSC = async () => {
      try {
        const resp = await axios.get(
          `https://api.bscscan.com/api?module=account&action=txlist&address=0x63E9Ab50C69857DDCeaBab6e608aDD90D64e27a0&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=4KMHW8EZ1WJYP18XNB6M59HUKWMIXT5GF9`
        );

        setItems(resp.data.result);
      } catch (error) { }
    };

    const callData = async () => {

      const events = firebase.firestore().collection('Home').doc("Announcement").collection("List");

      events.get().then((querySnapshot) => {
        const tempDoc = []
        querySnapshot.forEach((doc) => {
          tempDoc.push({ headline: doc.data().headline, id: doc.data().id, introduction: doc.data().introduction, paragraph: doc.data().paragraph, conclusion: doc.data().conclusion, type: doc.data().type })
        })
        setData(tempDoc)
      })

    }

    callData();
    requestBSC();

  }, [account]);

  //Output
  return (
    <>

      <Head> <title>Home | Raizzen</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Tabs size='md' variant='enclosed'>
        <TabList>
          <Tab isDisabled style={{ color: 'black' }}>Announcements</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex>
              <Container
                mb={5}
                px={0}
                maxW={{
                  base: "100%",
                  sm: "35rem",
                  md: "43.75rem",
                  lg: "57.5rem",
                  xl: "75rem",
                  xxl: "87.5rem"
                }}
              >
                {data.length != 0 ?

                  <ChakraCarousel gap={32}>
                    {data.slice(0, 15).reverse().map((post, index) => <HomeItem index={index} headline={post.headline} type={post.type} introduction={post.introduction} conclusion={post.conclusion} paragraph={post.paragraph} />)}
                  </ChakraCarousel>
                  : <Center><Spinner thickness='4px' marginBottom={50} size='lg' /></Center>}
              </Container>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Tabs size='md' variant='enclosed'>
        <TabList>
          <Tab isDisabled style={{ color: 'black' }} >Utility Token Details</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex
              mb={[7, 3, 3, 3, 3, 8]}
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
                      <Text>Supply</Text>
                    </StatLabel>
                    <Flex>
                      <StatNumber
                        fontSize={["md", "md", "md", "md", "md", "md"]}
                        color="#fff"
                        alignSelf="center"
                      >
                        <Text>500,000,000</Text>
                      </StatNumber>
                    </Flex>
                  </Stat>
                  <IconBox h={"45px"} w={"45px"} rounded={5} bg="#F7FAFC">
                    <FiStopCircle h={"24px"} w={"24px"} color="black" />
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
                      Contract
                    </StatLabel>
                    <Flex>
                      <StatNumber
                        fontSize={["md", "md", "md", "md", "md", "md"]}
                        color="#fff"
                        alignSelf="center"
                        flexDir="row"
                      >
                        <Flex>
                          <Link href={`https://bscscan.com/address/${process.env.NEXT_PUBLIC_MAIN_CONTRACT}`}>0xe7...18B6</Link>
                        </Flex>
                      </StatNumber>
                    </Flex>
                  </Stat>
                  <IconBox as="box" h={"45px"} w={"45px"} bg="#F7FAFC">
                    <FiArchive h={"24px"} w={"24px"} color="black" />
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
                      Reserved
                    </StatLabel>
                    <Flex>
                      <StatNumber
                        fontSize={["md", "md", "md", "md", "md", "md"]}
                        color="#fff"
                        alignSelf="center"
                      >
                        100,000,000
                      </StatNumber>
                    </Flex>
                  </Stat>
                  <IconBox as="box" h={"45px"} w={"45px"} rounded={5} bg="#F7FAFC">
                    <FiAtSign h={"24px"} w={"24px"} color="black" />
                  </IconBox>
                </Flex>
              </Box>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>


      <Tabs size='md' variant='enclosed'>
        <TabList>
          <Tab isDisabled style={{ color: 'black' }}>Promo Video</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AspectRatio maxW='100%' ratio={16 / 9}>
              <iframe
                title='Promo Video'
                src={process.env.NEXT_PUBLIC_HOME_VIDEO}
                allowFullScreen
              />
            </AspectRatio>
          </TabPanel>
        </TabPanels>
      </Tabs>


      <Tabs size='md' variant='enclosed' mt={10}>
        <TabList>
          <Tab isDisabled style={{ color: 'black' }}>Contract Activity</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex flexDir="column" >
              <Flex overflow="auto">
                <Table variant="unstyled" ml={[-4, -4, -4, -4, -4]}>
                  <Thead>
                    <Tr color="gray">
                      <Th>Scanner</Th>
                      <Th>Type</Th>
                      <Th isNumeric>From</Th>
                      <Th isNumeric>To</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {items
                      .slice(0, 6)
                      .map((item) => (
                        <TransferList
                          TransferFrom={item.from}
                          TransferTo={item.to}
                          hash={item.hash}
                        />
                      ))}
                    {display == "show" && <></>}
                  </Tbody>
                </Table>
              </Flex>

              <Flex align="center" mt={[2, 2, 2, 2, 2]} mb={[4, 4, 4, 4, 0]}>
                <Divider />

                <Link href={"https://bscscan.com/address/0x63E9Ab50C69857DDCeaBab6e608aDD90D64e27a0"}><IconButton
                  variant='outline'
                  colorScheme='white'
                  aria-label='Call Sage'
                  fontSize='20px'
                  icon={<  FiArchive />}
                />
                </Link>

                <Divider />
              </Flex>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
