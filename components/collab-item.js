import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Badge,
  ModalBody,
  FormControl,
  FormHelperText,
  HStack,
  Link,
  Text,
  FormLabel,
  Stack,
  chakra,
  useColorModeValue,
  Radio,
  RadioGroup,
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
import { FiAlertCircle } from "react-icons/fi";
import initFirebase from "./initFirebase";
import { useDisclosure } from '@chakra-ui/react'
import { useContext, useRef, useState } from "react";
import { AppContext } from "../pages/_app";
import { useToast } from '@chakra-ui/react'
import { ethers } from "ethers";
import { useFormik } from "formik";
import Web3Modal from "web3modal";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import ABI from "../contract/ABI.json";
import { useWeb3React } from "@web3-react/core";



export default function CollabItem(props) {

  initFirebase()
  const conv = require('cryptounit-converter')
  const { collab } = useContext(AppContext)
  const web3Modal = new Web3Modal();
  const [totalCollab] = collab;
  const initialRef = useRef()
  const [nftValue, setnftValue] = useState(props.art_id[0])
  const finalRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [purchaseIsloading, setpurchaseIsLoading] = useState(false);
  const { chainId, active, account } = useWeb3React();
  const toast = useToast()




  const formik = useFormik({

    initialValues: {
      name: props.name,
      twitter: '',
      discord: ''
    },
    onSubmit: (values) => {
      Purchase(values.name, values.twitter, values.discord)

    }

  })


  const sendData = (name, twitter, discord) => {

    try {

      firebase.firestore().collection('Tracking').doc(account).collection('orders').doc().set({

        name: name,
        twitter: twitter,
        discord: discord,
        price: conv.convertWei(props.price, 'ether'),
        address: "https://app.pentas.io/user/" + account,
        status: false,

      })

    } catch (error) {
      console.log(error)
      alert(error)

    }

  }


  async function Purchase(name, twitter, discord) {

    setpurchaseIsLoading(true)

    var price = parseFloat(props.price)

    var collab = parseFloat(totalCollab)

    if (!active) {

      setpurchaseIsLoading(false)

      return (toast({
        title: 'Not Connected!',
        status: 'error',
        duration: 9000,
        variant: 'left-accent',
        isClosable: true,
      }))

    } else {

      if (chainId != 97) {

        setpurchaseIsLoading(false)

        return (toast({
          title: 'Wrong Network!',
          status: 'error',
          duration: 9000,
          variant: 'left-accent',
          isClosable: true,
        }))

      } else {

        if (collab < price) {

          setpurchaseIsLoading(false)

          return (toast({
            title: 'Balance Not Enough!',
            status: 'error',
            duration: 9000,
            variant: 'left-accent',
            isClosable: true,
          }))

        } else {

          try {

            const connection = await web3Modal.connect();
            const web3Provider = new ethers.providers.Web3Provider(connection);
            const signer = web3Provider.getSigner();
            const contract = new ethers.Contract(
              "0xC8549792BBE6ae09A350B078f00155810bDBbfBC",
              ABI,
              signer
            );

            const gasLimit = await contract.estimateGas.redeemGated(props.price, account, props.art_contract, nftValue);
            const gasPrice = await web3Provider.getGasPrice();

            const purchasing = await contract.redeemGated(props.price, account, props.art_contract, nftValue, {

              gasLimit: gasLimit,
              gasPrice: gasPrice

            });


            await purchasing.wait();

            sendData(name, twitter, discord)

            setpurchaseIsLoading(false)

            onClose();

            return (toast({
              title: 'Purchase Success!',
              status: 'success',
              duration: 9000,
              variant: 'left-accent',
              isClosable: true,
            }))

          } catch (error) {

            setpurchaseIsLoading(false)

            return (toast({
              title: 'You does not meet the requirement!',
              status: 'error',
              duration: 9000,
              variant: 'left-accent',
              isClosable: true,
            }))


          }

        }

      }

    }

  }

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

                RZN {conv.convertWei(String(props.price), 'ether')}

              </chakra.span>
              <Button
                bg="gray.800"
                fontSize="xs"
                fontWeight="bold"
                isDisabled={props.stock == 0 ? true : false}
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
                Redeem
              </Button>

              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                closeOnOverlayClick={false}
                onClose={onClose}
                isCentered
              >
                <ModalOverlay />
                <ModalContent>
                  <form onSubmit={formik.handleSubmit}>
                    <ModalHeader>Enter your details</ModalHeader>
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
                          bgSize="contain"
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

                          <Badge colorScheme='green'>{props.type}</Badge>

                          <chakra.p
                            mt={1}
                            fontSize={['sm', 'sm', 'sm', 'sm', 'md']}
                            color={useColorModeValue("gray.600", "gray.400")}
                          >
                            Quantity :
                          </chakra.p>

                          <NumberInput size='sm' defaultValue={1} min={1} max={1} isDisabled>
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

                      <FormControl mt={4} isRequired>
                        <FormLabel>Redeem Cost</FormLabel>
                        <FormHelperText mb={2}><HStack><FiAlertCircle /><Text>This amount will be deducted from your balance </Text></HStack></FormHelperText>
                        <Input name="cost" value={conv.convertWei(props.price, 'ether')} isDisabled />
                      </FormControl>

                      <FormControl mt={4} isRequired>
                        <FormLabel>Requirement</FormLabel>
                        <FormHelperText mb={2}><HStack><FiAlertCircle /><Text>Your are required to own this  </Text></HStack></FormHelperText>
                        <RadioGroup onChange={setnftValue} value={nftValue}>
                          <Stack direction='row'>

                            {props.art_id.map((data) =>

                              <Radio size='md' colorScheme='red' value={data}><Link href={`https://app.pentas.io/assets/0xCCf66bD3929Fa6d8861e7B327B7b6D8F24eC7f91/${data}`}><Badge mb={1} variant='outline' colorScheme='green'>{data}</Badge></Link></Radio>

                            )}

                          </Stack>
                        </RadioGroup>
                      </FormControl>


                      <FormControl mt={4} isRequired>
                        <FormLabel>Twitter Handle</FormLabel>
                        <FormHelperText mb={2}><HStack><FiAlertCircle /><Text>We'll contact you for further details </Text></HStack></FormHelperText>
                        <Input name="twitter" placeholder="@raizzen_raizzen" onChange={formik.handleChange} value={formik.values.twitter} />
                      </FormControl>

                      <FormControl mt={4} isRequired>
                        <FormLabel>Discord Handle</FormLabel>
                        <FormHelperText mb={2}><HStack><FiAlertCircle /><Text>We'll contact you for further details </Text></HStack></FormHelperText>
                        <Input name="discord" placeholder="raizzen #999" onChange={formik.handleChange} value={formik.values.discord} />
                      </FormControl>

                    </ModalBody>

                    <ModalFooter>
                      <Button type="submit" isLoading={purchaseIsloading} loadingText='Redeeming' colorScheme='white' variant='outline' mr={3}>
                        Redeem
                      </Button>
                      <Button onClick={onClose} isDisabled={purchaseIsloading == true ? true : false}>Cancel</Button>
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
