
import {
    Flex,
    Heading,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    VStack,
    ModalCloseButton,
    Button,
    HStack,
    Tag
} from "@chakra-ui/react";
import { capsFirst } from "../utils"
import { useDisclosure } from '@chakra-ui/react'

export default function CollabTopItem(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Flex
                key={props.index}
                boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
                justifyContent="space-between"
                flexDirection="column"
                overflow="hidden"
                color="black"
                bg="base.d100"
                rounded={5}
                flex={1}
                p={5}
            >
                <VStack mb={6}>
                    <Heading
                        fontSize={{ base: "xl", md: "2xl" }}
                        textAlign="left"
                        w="full"
                        mb={2}
                    >
                        {capsFirst(props.headline)}
                    </Heading>
                    <Text w="full">{capsFirst(props.introduction)}</Text>
                </VStack>

                <Flex justifyContent="space-between">
                    <HStack spacing={2}>
                        <Tag size="sm" variant="outline" colorScheme="green">
                            {capsFirst(props.type)}
                        </Tag>
                    </HStack>
                    <Button
                        onClick={onOpen}
                        colorScheme="green"
                        fontWeight="bold"
                        variant={"outline"}
                        color="gray.900"
                        size="md"
                    >
                        More
                    </Button>
                </Flex>

                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{props.headline}</ModalHeader>
                        <ModalCloseButton />

                        <ModalBody>
                            <HStack spacing={2}>
                                <Tag size="sm" variant="outline" colorScheme="green">
                                    {capsFirst(props.type)}
                                </Tag>
                            </HStack>
                        </ModalBody>

                        <ModalBody>

                            {props.introduction}


                        </ModalBody>

                        <ModalBody>
                            {props.paragraph}
                        </ModalBody>

                        <ModalBody>

                            {props.conclusion}

                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='brand' variant={'outline'} mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>

        </>
    );
}