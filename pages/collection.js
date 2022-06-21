import { useState } from "react";
import {
    Input, Center, chakra,
    Box,
    Image,
    Flex,
    Icon,
    Table,
    Thead,
    Tbody,
    Badge,
    Tr,
    Th,
    Td,
    TableContainer,
    useColorModeValue
} from "@chakra-ui/react";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import Head from 'next/head'
import initFirebase from "../components/initFirebase";

import { ImEarth } from "react-icons/im";
import { BsGenderAmbiguous } from "react-icons/bs";
import { AiOutlineIdcard } from "react-icons/ai";


export default function Collection() {

    const [receivedData, setReceivedData] = useState([]);

    const handleChangeSearch = async (value) => {

        initFirebase();

        const events = firebase.firestore().collection('Collection').doc("Character").collection(value)

        events.get().then((querySnapshot) => {
            const tempDoc = []
            querySnapshot.forEach((doc) => {
                tempDoc.push({
                    name: doc.data().name,
                    age: doc.data().age,
                    gender: doc.data().gender,
                    origin: doc.data().origin,
                    position: doc.data().position,
                    skin: doc.data().skin,
                    eye: doc.data().eye,
                    outfit: doc.data().outfit,
                    hair: doc.data().hair,
                    tattoo: doc.data().tattoo,
                    earring: doc.data().earring,
                    background: doc.data().background,
                    effect: doc.data().effect,
                    mouth: doc.data().mouth
                })
            })

            setReceivedData(tempDoc)
        })

    }

    return (

        <>
            <Head> <title>Collection | Raizzen</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" /></Head>
            <div>
                <Center>
                    <Input onChange={(e) => handleChangeSearch(e.target.value)} placeholder='Enter Number' size='lg' />
                </Center>

                {receivedData.map((data) =>
                    <Center>
                        <Flex p={50}
                            bg={useColorModeValue("#F9FAFB", "gray.600")}
                            rounded={10}
                            w="100%"
                            alignItems="center"
                            justifyContent="center"
                            mt={5}
                            flexDir="column">
                            <Image
                                w="80%"
                                h="80%"
                                fit="cover"
                                rounded={10}
                                objectPosition="center"
                                src="https://cdn.pentas.io/next-s3-uploads/56edfb60-fb83-4a8e-bac1-a05cd4875d15/Luna-Ainsley.png"
                                alt="avatar"
                            />
                            <Flex
                                mt={90}
                                w="100%"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Box
                                    w="100%"
                                    mx="auto"
                                    py={4}
                                    px={8}
                                    bg={useColorModeValue("white", "gray.800")}
                                    shadow="lg"
                                    rounded="lg"
                                >
                                    <Flex justifyContent={{ base: "center", md: "end" }} mt={-16}>
                                        <Image
                                            w={20}
                                            h={20}
                                            fit="cover"
                                            rounded="full"
                                            borderStyle="solid"
                                            borderWidth={2}
                                            borderColor={useColorModeValue("brand.500", "brand.400")}
                                            alt="Testimonial avatar"
                                            src="https://i.imgur.com/ltVoCCA.png"
                                        />
                                    </Flex>
                                    <chakra.h2
                                        color={useColorModeValue("gray.800", "white")}
                                        fontSize={{ base: "2xl", md: "3xl" }}
                                        mt={{ base: 2, md: 0 }}
                                        fontWeight="bold"
                                    >{data.name} <Badge variant='outline' colorScheme='red'>
                                            {data.position}
                                        </Badge>
                                    </chakra.h2>
                                    <Flex flexDir={["column", "column", "column", "column", "row"]}>
                                        <Flex
                                            alignItems="center"
                                            mt={4}
                                            color={useColorModeValue("gray.700", "gray.200")}
                                        >
                                            <Icon as={BsGenderAmbiguous} h={6} w={6} />

                                            <chakra.h2 px={2} fontSize="sm">
                                                {data.gender}
                                            </chakra.h2>
                                        </Flex>
                                        <Flex
                                            alignItems="center"
                                            mt={4}
                                            color={useColorModeValue("gray.700", "gray.200")}
                                        >
                                            <Icon as={AiOutlineIdcard} h={6} w={6} ml={[0, 0, 0, 0, 3]} />

                                            <chakra.h2 px={2} fontSize="sm">
                                                {data.age}
                                            </chakra.h2>
                                        </Flex>
                                        <Flex
                                            alignItems="center"
                                            mt={4}
                                            color={useColorModeValue("gray.700", "gray.200")}
                                        >
                                            <Icon as={ImEarth} h={6} w={6} ml={[0, 0, 0, 0, 3]} />

                                            <chakra.h2 px={2} fontSize="sm">
                                                {data.origin}
                                            </chakra.h2>
                                        </Flex>
                                    </Flex>
                                    <chakra.p mt={5} mb={5} color={useColorModeValue("gray.600", "gray.200")}>
                                        Luna Ainsley, USA kingpin right-hand. Comes from a country filled with venomous animals, including her cold personality. She was handpicked by the kingpin to manage and control all the rogue under her supervision.
                                    </chakra.p>
                                </Box>
                            </Flex>
                            <TableContainer mt={20}>
                                <Table size='md' variant='simple' colorScheme="blackAlpha">
                                    <Thead>
                                        <Tr>
                                            <Th>Properties</Th>
                                            <Th>Properties Type</Th>
                                            <Th isNumeric>Percentage</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td>Skin Tone</Td>
                                            <Td>{data.skin}</Td>
                                            <Td>72%</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Eye</Td>
                                            <Td>{data.eye}</Td>
                                            <Td>56%</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Mouth</Td>
                                            <Td>{data.mouth}</Td>
                                            <Td>43%</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Outfit</Td>
                                            <Td>{data.outfit}</Td>
                                            <Td>6%</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Hair</Td>
                                            <Td>{data.hair}</Td>
                                            <Td>67%</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Tattoo</Td>
                                            <Td>{data.tattoo}</Td>
                                            <Td>37%</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Earring</Td>
                                            <Td>{data.earring}</Td>
                                            <Td>59%</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Background</Td>
                                            <Td>{data.background}</Td>
                                            <Td>46%</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Effect</Td>
                                            <Td>{data.effect}</Td>
                                            <Td>4%</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Flex>
                    </Center>
                )}
            </div>
        </>
    )

}