import "../styles/globals.css"
import type { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
  console.log("Render App")

  return <Component {...pageProps} />
}

export default MyApp
