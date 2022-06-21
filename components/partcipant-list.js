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
import {
    FiExternalLink,
} from "react-icons/fi"

const ParticipantList = (props) => {


    return (

        <Tr key={props.hash}>

            <Td>
                <Flex align='center'>
                    <Avatar size='sm' mr={2} src='https://pbs.twimg.com/profile_images/1296732195168509953/9eRdlbGE_400x400.jpg' />
                    <Flex flexDir='column'>
                        <Heading fontSize={['xs', 'sm', 'sm', 'sm', 'sm']} letterSpacing='tight'>BSC SCAN</Heading>
                        <Link href={`https://testnet.bscscan.com/address/${props.address}`} isExternal>
                            <Flex flexDir='row'>
                                <Text fontSize={['sm', 'sm', 'sm', 'sm', 'sm']} color='gray'>Transaction</Text>
                                <Icon ml={[2, 2, 2, 2, 2, 2]} as={FiExternalLink} fontSize='md' color="black"></Icon>
                            </Flex>
                        </Link>
                    </Flex>
                </Flex>
            </Td>
            <Td isNumeric>
                <Link href={`https://testnet.bscscan.com/address/${props.address}`} isExternal>
                    <Flex flexDir='row'>
                        {(props.address).substring(0, 5) + `...` + (props.address).substr(
                            -4
                        )}
                    </Flex>
                </Link></Td>

            <Td>1000 RZN</Td>

        </Tr>


    );

}
export default ParticipantList;