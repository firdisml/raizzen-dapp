//Import Libraries
import {
    Flex,
    Heading,
    Avatar,
    Text,
    Icon,
    Tr,
    Td,
    Link,
} from '@chakra-ui/react'
import { FiExternalLink } from "react-icons/fi"

//Variable Type Page
const TransferList = (props) => {
    return (
        <Tr key={props.hash}>
            <Td>
                <Flex align='center'>
                    <Avatar size='sm' mr={2} src='https://pbs.twimg.com/profile_images/1296732195168509953/9eRdlbGE_400x400.jpg' />
                    <Flex flexDir='column'>
                        <Heading fontSize={['xs', 'sm', 'sm', 'sm', 'sm']} letterSpacing='tight'>BSC SCAN</Heading>
                        <Link href={`https://bscscan.com/tx/${props.hash}`} isExternal>
                            <Flex flexDir='row'>
                                <Text fontSize={['sm', 'sm', 'sm', 'sm', 'sm']} color='gray'>Transaction</Text>
                                <Icon ml={[2, 2, 2, 2, 2, 2]} as={FiExternalLink} fontSize='md' color="black"></Icon>
                            </Flex>
                        </Link>
                    </Flex>
                </Flex>
            </Td>
            <Td>Contract Interaction</Td>
            <Td>
                <Flex flexDir='row'>
                    <Link href={`https://bscscan.com/address/${props.TransferFrom}`}>{(props.TransferFrom)}</Link>
                    <Icon ml={[2, 2, 2, 2, 2, 2]} as={FiExternalLink} fontSize='md' color="black"></Icon>
                </Flex></Td>
            <Td>
                <Flex flexDir='row'>
                    <Link href={`https://bscscan.com/address/${props.TransferTo}`}>{(props.TransferTo)}</Link>
                    <Icon ml={[2, 2, 2, 2, 2, 2]} as={FiExternalLink} fontSize='md' color="black"></Icon>
                </Flex>
            </Td>
        </Tr>
    );
}

export default TransferList;