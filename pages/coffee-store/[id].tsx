import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import classNames from "classnames";
import isEmpty from 'lodash/isEmpty';

import styles from '../../styles/Coffee-Store.module.css';
import CoffeeStoresApi from "../../lib/CoffeeStoresApi";
import { StoreContext } from "../../store/store.context";

export async function getStaticProps(staticProps: any) {
  const { params } = staticProps;
  const coffeeStores = await CoffeeStoresApi.fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find(({ id }) => String(id) === String(params.id));
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {}
    }
  };
}

export async function getStaticPaths() {
  const coffeeStores = await CoffeeStoresApi.fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore: any) => {
    return {
      params: {
        id: String(coffeeStore.id),
      },
    };
  });
  return {
    paths,
    fallback: true
  };
}

const CoffeeStore = (initialProps: any) => {
  console.log(40, initialProps);
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div>Loading...</div>
    );
  }

  const id = router.query.id;

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore || {});

  const {
    state: {
      coffeeStores
    }
  } = useContext(StoreContext) as any;
  useEffect(() => {
    if (initialProps.coffeeStore && Object.keys(initialProps.coffeeStore).length === 0) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreById = coffeeStores.find((coffeeStore: any) => coffeeStore.id.toString === id);
        setCoffeeStore(findCoffeeStoreById);
      }
    }
  }, [id])

  const {
    address,
    name,
    imgUrl,
    neighborhood,
  } = coffeeStore;

  const handleUpvoteButton = () => {
    alert('Thanks for upvoting!');
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl || 'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'}
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={classNames(styles.col2, 'glass')}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/places.svg" width="24" height="24" alt="" />
            <p className={styles.text}>{address || 'N/A'}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/near_me.svg" width="24" height="24" alt="" />
            <p className={styles.text}>{neighborhood || 'N/A'}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width="24" height="24" alt="" />
            <p className={styles.text}>5</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>Up vote!</button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
