//Import Libraries
import {
  Image,
  Link,
  chakra, useColorModeValue,
  Box,
  Grid,
  GridItem
} from "@chakra-ui/react";
import Head from 'next/head'


// Links Page
export default function Links() {

  //Output
  return (
    <>
      <Head> <title>Links | Raizzen</title></Head>
      <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)"]} gap={[3, 6, 6, 6, 6]}>

        <GridItem w="100%" h="auto">
          <Box
            w="100%"
            bg={useColorModeValue("white", "gray.800")}
            shadow="lg"
            rounded="10px"
            overflow="hidden"
            mx="auto"
          >
            <Image
              w="full"
              h={56}
              fit="cover"
              src="https://cdn.discordapp.com/attachments/947785554706198568/984372568087740466/Capture_1.png"
              alt="avatar"
            />

            <Box py={5} textAlign="center">
              <Link
                display="block"
                fontSize="2xl"
                color={useColorModeValue("gray.800", "white")}
                fontWeight="bold"
                href="https://app.pentas.io/user/0xdc89a77e0dbc06cf5aa7ba628c2012004a7df114"
              >
                Pentas
              </Link>
              <chakra.span
                fontSize="sm"
                color={useColorModeValue("gray.700", "gray.200")}
              >
                Where the magic happens!
              </chakra.span>
            </Box>
          </Box>
        </GridItem>

        <GridItem w="100%" h="auto">
          <Box
            w="100%"
            bg={useColorModeValue("white", "gray.800")}
            shadow="lg"
            rounded="10px"
            overflow="hidden"
            mx="auto"
          >
            <Image
              w="full"
              h={56}
              fit="cover"
              src="https://cdn.discordapp.com/attachments/947785554706198568/959569436623384576/Capture.png"
              alt="avatar"
            />

            <Box py={5} textAlign="center">
              <Link
                display="block"
                fontSize="2xl"
                color={useColorModeValue("gray.800", "white")}
                fontWeight="bold"
                href="https://raizzen-nft.gitbook.io/whitepaper/raizzen-overview/raizzen"
              >
                Whitepaper
              </Link>
              <chakra.span
                fontSize="sm"
                color={useColorModeValue("gray.700", "gray.200")}
              >
                Detail documentation of this project
              </chakra.span>
            </Box>
          </Box>
        </GridItem>

        <GridItem w="100%" h="auto">
          <Box
            w="100%"
            bg={useColorModeValue("white", "gray.800")}
            shadow="lg"
            rounded="10px"
            overflow="hidden"
            mx="auto"
          >
            <Image
              w="full"
              h={56}
              fit="cover"
              src="https://cdn.discordapp.com/attachments/947785554706198568/984373609986400266/72904068.png"
              alt="avatar"
            />

            <Box py={5} textAlign="center">
              <Link
                display="block"
                fontSize="2xl"
                color={useColorModeValue("gray.800", "white")}
                fontWeight="bold"
                href="https://snapshot.org/#/raizzen.eth"
              >
                Snapshot
              </Link>
              <chakra.span
                fontSize="sm"
                color={useColorModeValue("gray.700", "gray.200")}
              >
                Place where we cast our votes !
              </chakra.span>
            </Box>
          </Box>
        </GridItem>

        <GridItem w="100%" h="auto">
          <Box
            w="100%"
            bg={useColorModeValue("white", "gray.800")}
            shadow="lg"
            rounded="10px"
            overflow="hidden"
            mx="auto"
          >
            <Image
              w="full"
              h={56}
              fit="cover"
              src="https://cdn.discordapp.com/attachments/947785554706198568/984374786027294720/test.png"
              alt="avatar"
            />

            <Box py={5} textAlign="center">
              <Link
                display="block"
                fontSize="2xl"
                color={useColorModeValue("gray.800", "white")}
                fontWeight="bold"
                href="https://twitter.com/raizzen_raizzen"
              >
                Twitter
              </Link>
              <chakra.span
                fontSize="sm"
                color={useColorModeValue("gray.700", "gray.200")}
              >
                Catch the latest updates !
              </chakra.span>
            </Box>
          </Box>
        </GridItem>

        <GridItem w="100%" h="auto">
          <Box
            w="100%"
            bg={useColorModeValue("white", "gray.800")}
            shadow="lg"
            rounded="10px"
            overflow="hidden"
            mx="auto"
          >
            <Image
              w="full"
              h={56}
              fit="cover"
              src="https://cdn.discordapp.com/attachments/947785554706198568/984375324752109608/394a7aaecd6b8ce44528649681d9fa05.png"
              alt="avatar"
            />

            <Box py={5} textAlign="center">
              <Link
                display="block"
                fontSize="2xl"
                color={useColorModeValue("gray.800", "white")}
                fontWeight="bold"
                href="https://www.instagram.com/raizzen.nft/?hl=en"
              >
                Instagram
              </Link>
              <chakra.span
                fontSize="sm"
                color={useColorModeValue("gray.700", "gray.200")}
              >
                Let's shill our stuff!
              </chakra.span>
            </Box>
          </Box>
        </GridItem>

        <GridItem w="100%" h="auto">
          <Box
            w="100%"
            bg={useColorModeValue("white", "gray.800")}
            shadow="lg"
            rounded="10px"
            overflow="hidden"
            mx="auto"
          >
            <Image
              w="full"
              h={56}
              fit="cover"
              src="https://cdn.discordapp.com/attachments/947785554706198568/984375754940874792/62d126dcfc3c38c276627e6a251a6c25.png"
              alt="avatar"
            />

            <Box py={5} textAlign="center">
              <Link
                display="block"
                fontSize="2xl"
                color={useColorModeValue("gray.800", "white")}
                fontWeight="bold"
                href="https://discord.gg/ARJtJwP8"
              >
                Discord
              </Link>
              <chakra.span
                fontSize="sm"
                color={useColorModeValue("gray.700", "gray.200")}
              >
                Let's Hang Out Together!
              </chakra.span>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}

