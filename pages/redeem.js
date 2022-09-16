//Import Libraries
import {
  Grid,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel
} from "@chakra-ui/react";
import Head from 'next/head'
import initFirebase from "../components/initFirebase";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { Spinner } from '@chakra-ui/react'
import 'firebase/compat/storage'
import { useEffect, useState } from "react";
import { Center } from '@chakra-ui/react'
import RedeemItem from "../components/redeem-item";
import RedeemNormal from "../components/redeem-normal";


//Redeem Page
export default function Redeem() {

  //Variable Declare
  const [receivedData, setReceivedData] = useState([]);
  const [normal, setNormal] = useState([]);
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  //Page load
  useEffect(() => {

    initFirebase();

    const callData = async () => {

      const events = firebase.firestore().collection('Redeem').doc("Product").collection("List");

      events.get().then((querySnapshot) => {
        const tempDoc = []
        querySnapshot.forEach((doc) => {
          tempDoc.push({ name: doc.data().name, price: doc.data().price, art_contract: doc.data().art_contract, id: doc.data().id, art_id: doc.data().art_id, picture: doc.data().picture, type: doc.data().type })
        })
        setReceivedData(tempDoc)
      })

    }

    const callNormal = async () => {

      const events = firebase.firestore().collection('Redeem').doc("Normal").collection("List");

      events.get().then((querySnapshot) => {
        const tempDoc = []
        querySnapshot.forEach((doc) => {
          tempDoc.push({ name: doc.data().name, price: doc.data().price, id: doc.data().id, picture: doc.data().picture, type: doc.data().type })
        })
        setNormal(tempDoc)
      })

    }

    callData();
    callNormal();

  }, [])

  //Output
  return (
    <>
      <Head> <title>Redeem | Raizzen</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Tabs variant='enclosed' >

        <TabList>
          <Tab  >Token Gated</Tab>
          <Tab>Normal</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {receivedData.length != 0 ? <div><Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)"]} gap={[3, 6, 6, 6, 6]}>

              {receivedData.map((data) => <RedeemItem name={data.name} price={data.price} art_contract={data.art_contract} id={data.id} art_id={data.art_id} picture={data.picture} type={data.type} date={date}/>)}

            </Grid></div> : <Center><Spinner thickness='4px' size='lg' alignItems={'center'} /></Center>}
          </TabPanel>
          <TabPanel>
            {receivedData.length != 0 ? <div><Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)"]} gap={[3, 6, 6, 6, 6]}>

              {normal.map((data) => <RedeemNormal name={data.name} price={data.price} id={data.id} picture={data.picture} type={data.type} date={date}/>)}

            </Grid></div> : <Center><Spinner thickness='4px' size='lg' alignItems={'center'} /></Center>}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

