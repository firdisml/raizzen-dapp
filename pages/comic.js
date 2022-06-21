//Import Libraries
import { Grid } from "@chakra-ui/react";
import initFirebase from "../components/initFirebase";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { Spinner } from '@chakra-ui/react'
import 'firebase/compat/storage'
import { Center } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import ComicItem from "../components/comic-item";
import Head from 'next/head'

//Comic Page
export default function Comic() {

  const [receivedData, setReceivedData] = useState([]);

  useEffect(() => {

    initFirebase();

    const callData = async () => {

      const events = firebase.firestore().collection('Comic').doc('ChapterList').collection('Chapter')

      events.get().then((querySnapshot) => {
        const tempDoc = []
        querySnapshot.forEach((doc) => {
          tempDoc.push({ name: doc.data().name })
        })
        setReceivedData(tempDoc)
      })

    }
    callData();
  }, [])


  //Output
  return (
    <>

      <Head><title>Comic | Raizzen</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {receivedData.length != 0 ? <div><Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)"]} gap={[3, 6, 6, 6, 6]}>


        {receivedData.map((data) => <ComicItem name={data.name} number={receivedData.length} subchapter={data.name} />)}


      </Grid></div> : <Center><Spinner thickness='4px' size='lg' alignItems={'center'} /></Center>}

    </>
  );



}