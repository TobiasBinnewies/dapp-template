import type { NextPage } from "next"
import styles from "../styles/Home.module.css"
import Head from "next/head"

const Home: NextPage = () => {
  // const address = "0xF3bFf956daB518eB87AFf46B30ecF60f5c9eb7a6"
  // const { data: nativeBalace } = useEvmNativeBalance({ address })

  return (
    <div className={styles.container}>
      <Head>
        <title>DAPP</title>
        <meta name="description" content="dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}

export default Home
