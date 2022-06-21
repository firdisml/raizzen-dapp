// Import Libraries
import {
    Heading,
    Grid
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { useWeb3React } from "@web3-react/core";
import OrderItem from "../components/order-list";
import initFirebase from "../components/initFirebase";
import Head from 'next/head'

//Order Page
function Order() {

    const [receivedData, setReceivedData] = useState([]);
    const { active, account } = useWeb3React();

    useEffect(() => {
        initFirebase();
        const callData = async () => {
            const events = firebase.firestore().collection('Tracking').doc(account).collection('orders')
            events.get().then((querySnapshot) => {
                const tempDoc = []
                querySnapshot.forEach((doc) => {
                    tempDoc.push({ name: doc.data().name, twitter: doc.data().twitter, discord: doc.data().discord, price: doc.data().price, status: doc.data().status, date: doc.data().date })
                })
                setReceivedData(tempDoc)
            })
        }
        if (active === true) {
            callData();
        }
    }, [account])

    //Output
    return (
        <>
            <Head> <title>Track | Raizzen</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {receivedData.length != 0 ? <div>

                <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)"]} gap={[3, 6, 6, 6, 6]}>

                    {receivedData.map((data) => <OrderItem status={data.status} name={data.name} price={data.price} twitter={data.twitter} discord={data.discord} date={data.date} />)}

                </Grid>
            </div> :
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}>
                    <Heading alignContent='center' size='md'>You don't have any order</Heading>
                </div>}
        </>
    )
}

export default Order;