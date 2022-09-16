import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Badge,
  ModalBody,
  FormControl,
  FormHelperText,
  HStack,
  FormLabel,
  Tag,
  TagLabel,
  Text,
  chakra, useColorModeValue,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  GridItem,
  Button,
  Input,
  Heading
} from "@chakra-ui/react";
import {
  FiAlertCircle
} from "react-icons/fi";
import initFirebase from "./initFirebase";
import { useDisclosure } from '@chakra-ui/react'
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'


export default function ComicItem(props) {

  initFirebase()
  const initialRef = useRef()
  const finalRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isComplete, setIsComplete] = useState();


  useEffect(() => {

    setIsComplete(props.status);

  }, [])

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
            rounded="10px"
            shadow="md"
            bgSize="cover"
            bgPos="center"
            style={{
              backgroundImage:
              `url('${props.picture}')`
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
                {isComplete ? (<Tag
                  size={'lg'}
                  borderRadius='full'
                  variant='solid'
                  colorScheme='green'
                >
                  <TagLabel>Completed</TagLabel>
                </Tag>) : (<Tag
                  size={'lg'}
                  borderRadius='full'
                  variant='solid'
                  colorScheme='yellow'
                >
                  <TagLabel>Queeing</TagLabel>
                </Tag>)}

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
                Check
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
                    <ModalHeader>Check your redemption</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                      <Flex
                        maxW="md"
                        mx="auto"
                        bg={useColorModeValue("white", "gray.800")}
                        shadow="lg"
                        rounded="lg"
                        overflow="hidden"
                      >
                        <Box
                          w={2 / 3}
                          bgSize="cover"
                          style={{
                            backgroundImage:
                            `url('${props.picture}')`
                          }}
                        ></Box>

                        <Box w={2 / 3} p={{ base: 4, md: 4 }}>
                        <Heading
                            fontSize={['sm', 'sm', 'sm', 'sm', 'lg']}
                            fontWeight="bold"
                            color={useColorModeValue("gray.800", "white")}
                          >
                            {props.name}
                          </Heading>

                          <Badge colorScheme='green'>Physical Item</Badge>

                          <chakra.p
                            mt={1}
                            fontSize="md"
                            color={useColorModeValue("gray.600", "gray.400")}
                          >
                            Quantity :
                          </chakra.p>

                          <NumberInput size='sm' defaultValue={1} min={1} max={1}>
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>


                        </Box>
                      </Flex>

                    </ModalBody>
                    <ModalBody pb={6}>


                      <FormControl mt={4}>
                        <FormLabel>Redeem Cost</FormLabel>
                        <FormHelperText mb={2}><HStack><FiAlertCircle /><Text>This amount will be deducted from your balance </Text></HStack></FormHelperText>
                        <Input name="twitter" onChange={formik.handleChange} value={props.price} isDisabled />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Date</FormLabel>
                        <FormHelperText mb={2}><HStack><FiAlertCircle /><Text>The Date where you place this order </Text></HStack></FormHelperText>
                        <Input name="twitter" onChange={formik.handleChange} value={props.date} isDisabled />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Twitter Handle</FormLabel>
                        <FormHelperText mb={2}><HStack><FiAlertCircle /><Text>We'll contact you for further details </Text></HStack></FormHelperText>
                        <Input name="twitter" onChange={formik.handleChange} value={props.twitter} isDisabled />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Discord ID</FormLabel>
                        <FormHelperText mb={2}><HStack><FiAlertCircle /><Text>We'll contact you for further details </Text></HStack></FormHelperText>
                        <Input name="twitter" onChange={formik.handleChange} value={props.discord} isDisabled />
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Status</FormLabel>

                        {isComplete ? (<Tag
                          size={'lg'}
                          borderRadius='full'
                          variant='solid'
                          colorScheme='green'
                        >
                          <TagLabel>Completed</TagLabel>
                        </Tag>) : (<Tag
                          size={'lg'}
                          borderRadius='full'
                          variant='solid'
                          colorScheme='yellow'
                        >
                          <TagLabel>Processing</TagLabel>
                        </Tag>)}
                      </FormControl>

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
