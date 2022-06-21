import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  TableContainer,
  chakra, useColorModeValue,
  Box,
  GridItem,
  Button
} from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import initFirebase from "./initFirebase";
import { useDisclosure } from '@chakra-ui/react'
import { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'


export default function ComicItem(props) {

  initFirebase()
  const initialRef = useRef()
  const finalRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [receivedData, setReceivedData] = useState([]);
  const formik = useFormik({

    initialValues: {
      name: '',
      twitter: '',
      discord: '',
    },
    onSubmit: (values) => {
      Purchase(values.name, values.twitter);
    }

  })


  useEffect(() => {

    initFirebase();

    const callData = async () => {

      const events = firebase.firestore().collection('Comic').doc('ChapterList').collection('Chapter').doc(props.subchapter).collection('subchapter')

      events.get().then((querySnapshot) => {
        const tempDoc = []
        querySnapshot.forEach((doc) => {
          tempDoc.push({ name: doc.data().name, link: doc.data().link })
        })
        setReceivedData(tempDoc)
      })

    }

    callData();


  }, [])



  return (

    <>
      <GridItem w="100%" h="auto">
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          w='100%'
          mx="auto"
        >
          <Box
            bg="gray.300"
            h={64}
            w="full"
            rounded="20px"
            shadow="md"
            bgSize="cover"
            bgPos="center"
            style={{
              backgroundImage:
                "url(https://cdn.discordapp.com/attachments/947785554706198568/959569436623384576/Capture.png)",
            }}
          ></Box>

          <Box
            w={{ base: 56, md: 64 }}
            bg={useColorModeValue("white", "gray.800")}
            mt={-10}
            shadow="lg"
            rounded="lg"
            overflow="hidden"
          >
            <chakra.h3
              py={2}
              textAlign="center"
              fontWeight="bold"
              color={useColorModeValue("gray.800", "white")}
              letterSpacing={1}
            >
              {props.name}
            </chakra.h3>

            <Flex
              alignItems="center"
              justifyContent="space-between"
              py={2}
              px={3}
              bg={useColorModeValue("gray.200", "gray.700")}
            >
              <chakra.span
                fontWeight="bold"
                color={useColorModeValue("gray.800", "gray.200")}
              >
                {receivedData.length} Chapters

              </chakra.span>
              <chakra.button
                bg="gray.800"
                fontSize="xs"
                fontWeight="bold"
                onClick={onOpen}
                color="white"
                px={5}
                py={2}
                rounded="lg"
                textTransform="uppercase"
                _hover={{
                  bg: useColorModeValue("gray.700", "gray.600"),
                }}
                _focus={{
                  bg: useColorModeValue("gray.700", "gray.600"),
                  outline: "none",
                }}
              >
                Read Now
              </chakra.button>



              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                isCentered
              >
                <ModalOverlay />
                <ModalContent>
                  <form onSubmit={formik.handleSubmit}>
                    <ModalHeader>Chapters</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                      <TableContainer>
                        <Table variant='simple'>
                          <Thead>
                            <Tr>
                              <Th>Chapter</Th>
                              <Th>Link</Th>
                            </Tr>
                          </Thead>
                          <Tbody>

                            {receivedData.map((data) => {
                              return (<Tr>
                                <Td>{data.name}</Td>
                                <Td><Link href={data.link} isExternal>
                                  Read <ExternalLinkIcon fontSize='lg' mb='3px' />
                                </Link></Td>
                              </Tr>)
                            })}

                          </Tbody>
                        </Table>
                      </TableContainer>

                    </ModalBody>

                    <ModalFooter>
                      <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                  </form>
                </ModalContent>
              </Modal>

            </Flex>
          </Box>
        </Flex>
      </GridItem>
    </>
  );
}
