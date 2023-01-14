import React, { useEffect, useState } from "react";

import Hero from "components/Home/Hero";
import ProductItem from "components/Shop/ProductItem";
import FashionProducts from "components/Home/FashionProducts";
import BestSellers from "components/Home/BestSellers";
import OurPhilosophy from "components/Home/OurPhilosophy";
import useAxios from "hooks/useAxios";
import { Toast } from "components/UI";
import { useAuth } from "hooks/useStoreContext";

const Home = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const { requestHttp, loading, error } = useAxios();
  const { authSuccess, setAuthSuccess, unAuthSuccess, setUnAuthSuccess } =
    useAuth();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    requestHttp(
      {
        method: "GET",
        url: "products?limit=2",
        headers: false,
      },
      (data) => setDataProduct(data)
    );
  }, [requestHttp]);

  const productContent = (
    <ul className="grid grid-cols-1 gap-3 bg-white-bone dark:bg-dark-brown md:grid-cols-2">
      {dataProduct.map((product) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            linkTo={`shop/${product.id}`}
          />
        );
      })}
    </ul>
  );

  return (
    <>
      {authSuccess.isSuccess && (
        <Toast
          children={authSuccess.successMessage}
          icons={"success"}
          onSuccess={authSuccess.isSuccess}
          onSetSuccess={setAuthSuccess}
        />
      )}
      {unAuthSuccess.isSuccess && (
        <Toast
          children={unAuthSuccess.successMessage}
          icons={"success"}
          onSuccess={unAuthSuccess.isSuccess}
          onSetSuccess={setUnAuthSuccess}
        />
      )}
      <Hero />
      <section className="grid min-h-max grid-cols-1 gap-8 p-6 md:min-h-fit md:grid-cols-2 md:grid-rows-1 md:gap-10 md:p-10">
        <div className="flex flex-col gap-y-8">
          <h1 className="font-noto text-4xl font-light uppercase italic text-dark-brown dark:text-white-bone md:text-5xl">
            Care for your clothes like the good friends they are.
          </h1>
          <span className="block text-end font-light uppercase italic dark:text-white-bone md:text-xl">
            -Joan Crawford
          </span>
        </div>
        {loading.isLoading && (
          <p className="mx-auto text-center font-manrope font-light uppercase text-dark-brown">
            {loading.loadingMessage}
          </p>
        )}
        {error.isError && (
          <p className="mx-auto text-center font-medium uppercase text-red-700">
            {error.errorMessage}
          </p>
        )}
        {!loading.isLoading && !error.isError && productContent}
      </section>
      <FashionProducts />
      <BestSellers />
      <OurPhilosophy />
    </>
  );
};

export default Home;
