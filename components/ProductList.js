import Client from "shopify-buy";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { storyblokEditable } from "@storyblok/react";


const shopifyClient = Client.buildClient({
  domain: process.env.SHOPIFY_STORE_DOMAIN,
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_TOKEN,
});

function ProductList({blok}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsResponse = await shopifyClient.product.fetchAll();
        setProducts(productsResponse.slice(0, -1));
      } catch (error) {
        console.error("Error fetching Shopify products:", error);
      }
    }
    fetchProducts();
  }, []);

  const product =
    products &&
    products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      image: product.images[0].src,
      amount: product.variants[0].price.amount,
      slug: "product/" + product.handle,
    }));

    console.log(product)

  return (
    <div className="bg-white" {...storyblokEditable(blok)} >
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="flex justify-center text-4xl font-bold p-10">
          {blok?.heading ? blok?.heading : "Products"}
        </h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {product &&
            product.map((item) => (
              <a key={item.id} href={item.slug} className="group">
                <div className="aspect-h-3 aspect-w-4 w-full overflow-hidden rounded-lg bg-gray-200 ">
                  {" "}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{item.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  $ {item.amount}
                </p>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
