//Import Libraries
import Head from 'next/head'
import initFirebase from "../components/initFirebase";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import {
  Flex,
  Text,
  Grid,
  Spinner,
  Spacer,
  Stat,
  StatLabel,
  Center,
  StatNumber,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Link,
  Box,
  Container,
} from "@chakra-ui/react";
import {
  FiAtSign,
  FiStopCircle,
  FiArchive,
} from "react-icons/fi";
import 'firebase/compat/storage'
import { useEffect, useState } from "react";
import IconBox from "../components/iconbox";
import CollabTopItem from "../components/collab-top-item";
import CollabItem from "../components/collab-item";
import ChakraCarousel from "../components/chakra-carousell";
import CollabNormal from "../components/collab-normal";


//Collab Page
export default function Collab() {

  const [receivedData, setReceivedData] = useState([]);
  const [data, setData] = useState([]);
  const [normal, setNormal] = useState([]);


  useEffect(() => {

    initFirebase();

    const callData = async () => {

      const events = firebase.firestore().collection('Collab').doc("Product").collection("List");

      events.get().then((querySnapshot) => {
        const tempDoc = []
        querySnapshot.forEach((doc) => {
          tempDoc.push({ name: doc.data().name, price: doc.data().price, art_contract: doc.data().art_contract, id: doc.data().id, art_id: doc.data().art_id, picture: doc.data().picture, type: doc.data().type })
        })
        setReceivedData(tempDoc)
      })

    }

    const callNormal = async () => {

      const events = firebase.firestore().collection('Collab').doc("Normal").collection("List");

      events.get().then((querySnapshot) => {
        const tempDoc = []
        querySnapshot.forEach((doc) => {
          tempDoc.push({ name: doc.data().name, price: doc.data().price, id: doc.data().id, picture: doc.data().picture, type: doc.data().type })
        })
        setNormal(tempDoc)
      })

    }

    const callCollab = async () => {

      const events = firebase.firestore().collection('Collab').doc("Announcement").collection("List");

      events.get().then((querySnapshot) => {
        const tempDoc = []
        querySnapshot.forEach((doc) => {
          tempDoc.push({ headline: doc.data().headline, id: doc.data().id, introduction: doc.data().introduction, paragraph: doc.data().paragraph, conclusion: doc.data().conclusion, type: doc.data().type })
        })
        setData(tempDoc)
      })

    }

    callData();
    callNormal();
    callCollab();

  }, [])


  //Output
  return (
    <>

      <Head> <title>Redeem | Raizzen</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      </Head>

      <Tabs size='md' variant='enclosed'>
        <TabList>
          <Tab isDisabled style={{ color: 'black' }}>Ecosystem Announcements</Tab>
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
                    {data.slice(0, 15).reverse().map((post, index) => <CollabTopItem index={index} headline={post.headline} type={post.type} introduction={post.introduction} conclusion={post.conclusion} paragraph={post.paragraph} />)}
                  </ChakraCarousel>
                  : <Center><Spinner thickness='4px' marginBottom={50} size='lg' /></Center>}
              </Container>

            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>


      <Tabs variant='enclosed'>
        <TabList>
          <Tab isDisabled style={{ color: 'black' }}>Ecosystem Token Details</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex
              mb={[7, 3, 3, 3, 3, 9]}
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
                          <Link href={`https://bscscan.com/address/${process.env.NEXT_PUBLIC_BRIDGE_CONTRACT}`}> 0x63...27a0</Link>

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

      <Tabs variant='enclosed'>
        <TabList>
          <Tab>Token Gated</Tab>
          <Tab>Normal</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {receivedData.length != 0 ? <div><Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)"]} gap={[3, 6, 6, 6, 6]}>

              {receivedData.map((data) => <CollabItem name={data.name} price={data.price} art_contract={data.art_contract} id={data.id} art_id={data.art_id} picture={data.picture} type={data.type} />)}

            </Grid></div> : <Center><Spinner thickness='4px' size='lg' alignItems={'center'} /></Center>}
          </TabPanel>
          <TabPanel>
            {receivedData.length != 0 ? <div><Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)"]} gap={[3, 6, 6, 6, 6]}>

              {normal.map((data) => <CollabNormal name={data.name} price={data.price} id={data.id} picture={data.picture} type={data.type} />)}

            </Grid></div> : <Center><Spinner thickness='4px' size='lg' alignItems={'center'} /></Center>}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

