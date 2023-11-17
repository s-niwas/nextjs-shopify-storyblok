import "../styles/globals.css";
import { storyblokInit, apiPlugin } from "@storyblok/react";
import Page from "../components/Page";
import ProductList from "../components/ProductList";
import Hero from "../components/Hero";

const components = {
  hero: Hero,
  page: Page,
  productList: ProductList,
};

storyblokInit({
  accessToken: "an61PFasN9NKykyM7akmwgtt",
  use: [apiPlugin],
  components,
  apiOptions: {
    region: "",
  },
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
