import React, { useState, useEffect } from 'react';

import { Button } from '..';

import { MdArrowUpward } from 'react-icons/md';

export const ScrollTop = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTopHandler = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Button
      className={`fixed bottom-[5%] right-6 z-30 rounded-full bg-dark-brown p-3 opacity-70 duration-500 hover:-translate-y-2 hover:opacity-100 dark:bg-white-bone ${
        scrollPosition > 500 ? 'block' : 'hidden'
      }`}
      onClick={scrollTopHandler}
    >
      <MdArrowUpward className='text-xl text-white-bone dark:text-dark-brown' />
    </Button>
  );
};
