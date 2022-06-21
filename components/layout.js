import { Flex } from "@chakra-ui/react";
import { Fragment } from "react";
import Dashboard from "./dashboard";
import Sidebar from "./sidebar";


function Layout(props) {
  return (
    <Fragment>
      <Flex h={[null, null, null, null, '100vh']} flexDir={["column", "column", "column", "column", "row"]} overflow="hidden" maxW="2000px">

        <Sidebar />

        <Flex w={['100%', '100%', '100%', '100%', '59%']} p="3%" flexDir="column" overflow="scroll" minH={[null, null, null, "100vh", "100vh"]}>
          {props.children}
        </Flex>

        <Flex w={['100%', '100%', '100%', '100%', '33%']} minW={[null, null, '300px', '300px', '400px']} bgColor="#F5F5F5" p="3%" flexDir="column" overflow="auto" justifyContent="space-between">
          <Dashboard />
        </Flex>

      </Flex>
    </Fragment>
  );
}

export default Layout;
