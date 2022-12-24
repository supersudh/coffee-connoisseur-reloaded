import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

import Banner from '../components/Banner';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const handleOnBannerBtnClick = () => {
    console.log('hi banner button');
  };
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
      </main>
      
    </div>
  )
}
