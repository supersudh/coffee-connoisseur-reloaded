import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Banner from '../components/Banner';
import Card from '../components/Card';

import coffeeStoresData from '../data/coffee-stores.json';
import { CoffeeStores } from '../types/CoffeeStoresType';
import CoffeeStoresApi from '../lib/CoffeeStoresApi';

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
  const handleOnBannerBtnClick = () => {
    alert('Feature in progress! Interact below :-)');
  };
  const { coffeeStores } = props;
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerBtnClick}
        />
        <Image src="/static/hero-image.png" width={700} height={400} alt="Hero Image" />
        <h2 className={styles.heading2}>Canada Coffee stores</h2>
        <div className={styles.cardLayout}>
          {renderCoffeeStores(coffeeStores)}
        </div>
      </main>

    </div>
  )
}
