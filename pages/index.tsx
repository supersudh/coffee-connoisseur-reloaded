import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Banner from '../components/Banner';
import Card from '../components/Card';

import { CoffeeStores } from '../types/CoffeeStoresType';
import CoffeeStoresApi from '../lib/CoffeeStoresApi';
import useTrackLocation from '../hooks/use-track-location';
import { useState, useEffect, useContext } from 'react';
import { ACTION_TYPES, StoreContext } from './_app';

export async function getStaticProps(context: any) {
  const coffeeStores = await CoffeeStoresApi.fetchCoffeeStores();
  return {
    props: {
      coffeeStores
    },
  };
}

function renderCoffeeStores(coffeeStores: Array<CoffeeStores>) {
  if (!coffeeStores || coffeeStores?.length === 0) { return null; } // safety
  return coffeeStores.map((coffeeStore: any, i: number) => {
    const {
      id,
      name,
      imgUrl,
      address,
      neighbourhood,
      websiteUrl
    } = coffeeStore;
    const key = `coffee-store-${id}`;
    return (
      <Card
        key={key}
        className={styles.card}
        name={name}
        imgUrl={imgUrl || 'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'}
        href={`/coffee-store/${id}`}
      />
    );
  });
}

export default function Home(props: any) {

  const {
    isGeoLocating,
    handleTrackLocation,
    locationErrorMsg
  } = useTrackLocation();

  // const [coffeeStores, setCoffeeStores] = useState<Array<any>>([]);
  
  const [coffeeStoresError, setCoffeeStoresError] = useState(null);
  
  const { dispatch, state } = useContext(StoreContext) as any;
  
  const { coffeeStores, latLong } = state;

  console.log('latLong', latLong);

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const fetchedCoffeeStores = await CoffeeStoresApi.fetchCoffeeStores(latLong, 30);
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
              coffeeStores: fetchedCoffeeStores,
            }
          })
        } catch (error: any) {
          setCoffeeStoresError(error.message);
        }
      }
    }
    setCoffeeStoresByLocation();
  }, [latLong])

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isGeoLocating ? 'Locating' : 'View stores nearby'}
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg && <p>Unable to fetch your location</p>}
        {coffeeStoresError && <p>{coffeeStoresError}</p>}
        <Image src="/static/hero-image.png" width={700} height={400} alt="Hero Image" />

        {
          coffeeStores.length > 0 ? (
            <div className={styles.sectionWrapper} >
              <h2 className={styles.heading2}>Coffee stores Near me</h2>
              <div className={styles.cardLayout}>
                {renderCoffeeStores(coffeeStores)}
              </div>
            </div>) : null
        }

        <div className={styles.sectionWrapper} >
          <h2 className={styles.heading2}>Canada Coffee stores</h2>
          <div className={styles.cardLayout}>
            {renderCoffeeStores(props.coffeeStores)}
          </div>
        </div>
      </main>

    </div>
  )
}
