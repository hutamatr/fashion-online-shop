import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useAxios from 'hooks/useAxios';
import { useAuth } from 'hooks/useStoreContext';

const NavigationFooter = () => {
  const [categories, setCategories] = useState([]);
  const { isAuth, unAuth } = useAuth();
  const { requestHttp } = useAxios();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const categoriesStorage = JSON.parse(localStorage.getItem('categories'));
    if (!categoriesStorage) {
      requestHttp(
        {
          method: 'GET',
          url: 'products/categories',
        },
        (data) => {
          setCategories(data);
          localStorage.setItem('categories', JSON.stringify(data));
        }
      );
    } else {
      setCategories(categoriesStorage);
    }
  }, [requestHttp]);

  return (
    <section className='flex flex-col gap-y-6 border-y border-y-dark-brown p-6 text-center dark:border-y-white-bone md:w-full md:flex-row md:justify-evenly md:text-start'>
      <div className='flex flex-col gap-y-3 uppercase md:gap-y-2'>
        <h3 className='font-manrope text-sm font-semibold dark:text-white-bone'>
          Category
        </h3>
        <ul className='flex flex-col gap-y-2 md:gap-y-1'>
          {categories.map((category) => {
            return (
              <li key={category.id}>
                <Link
                  to={`/${category}`}
                  className='font-manrope text-xs dark:text-white-bone'
                >
                  {category}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='flex flex-col gap-y-3 uppercase md:gap-y-2'>
        <h3 className='font-manrope text-sm font-semibold dark:text-white-bone'>
          Menu
        </h3>
        <ul className='flex flex-col gap-y-2 dark:text-white-bone md:gap-y-1'>
          <li>
            <Link to='/' className='font-manrope text-xs'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/shop' className='font-manrope text-xs'>
              Shop
            </Link>
          </li>
          {isAuth && (
            <li>
              <Link to='/account' className='font-manrope text-xs'>
                My Account
              </Link>
            </li>
          )}
          {isAuth ? (
            <li>
              <Link
                to='/'
                className='font-manrope text-xs'
                onClick={() => unAuth(true, 'Logout Successfully')}
              >
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to='/login' className='font-manrope text-xs'>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default NavigationFooter;
