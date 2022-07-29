import React from "react";

const Figure = ({ image, title, price, id }) => {
  const formatToCurrency = (amount) => {
    const exchangeRateRupiah = 14800; // 29 - July - 2022
    const toRupiah = +amount * exchangeRateRupiah;
    return toRupiah.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  return (
    <figure
      id={id}
      className="divide grid grid-flow-row gap-3 divide-y-2 divide-y-reverse divide-dark-brown"
    >
      <img
        src={image}
        alt={title}
        className="h-full w-[250px] ring-[1.5px] ring-dark-brown"
      />
      <figcaption className="max-w-fit text-xs uppercase">{title}</figcaption>
      <span className="flex items-center text-lg">
        Rp. {formatToCurrency(price)}
      </span>
    </figure>
  );
};

export default Figure;
