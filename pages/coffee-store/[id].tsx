import classNames from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import styles from '../../styles/Coffee-Store.module.css';
import Image from "next/image";
import CoffeeStoresApi from "../../lib/CoffeeStoresApi";

export async function getStaticProps(staticProps: any) {
  const { params } = staticProps;
  const coffeeStore = await CoffeeStoresApi.fetchCoffeeStoreByFSQID(params.id);
  return {
    props: {
      coffeeStore
    }
  };
}

export async function getStaticPaths() {
  const coffeeStores = await CoffeeStoresApi.fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore: any) => {
    return {
      params: {
        id: String(coffeeStore.fsq_id),
      },
    };
  });
  return {
    paths,
    fallback: true
  };
}

const CoffeeStore = (props: any) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div>Loading...</div>
    );
  }

  const {
    imgUrl,
    location,
    name,
  } = props.coffeeStore;
  
  const handleUpvoteButton = () => {
    console.log('Up vote! clicked!');
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
            <p className={styles.text}>{location?.address ?? 'N/A'}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/near_me.svg" width="24" height="24" alt="" />
            <p className={styles.text}>{location.neighborhood?.[0] ?? 'N/A'}</p>
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
