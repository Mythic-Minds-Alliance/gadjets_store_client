import './Card.scss';

import { Link } from 'react-router-dom';

import React from 'react';
import { Product } from '../../types/product';
import { DetailsList } from '../DetailsList/DetailsList';
import { AddToCart } from '../AddToCart/AddToCart';
import { CardSeparator } from '../СardSeparator/CardSeparator';
import { CardPrices } from '../CardPrices/CardPrices';
import { SERVER_HOST, getLocation, scrollToTop } from '../../utils/helpers';
import notFoundImg from '../../images/not found.jpg';

type Props = {
  product: Product,
};

export const Card: React.FC<Props> = ({ product }) => {
  const {
    name,
    price,
    priceActual,
    images,
  } = product;

  document.body.style.overflow = '';

  return (
    <div className="card">
      <div className="card--top">
        <Link
          to={{
            pathname: getLocation(product),
            search: `?capacity=${product.capacity}&productId=${product.id}&color=${product.color}`,
          }}
          className="card--photo"
          onClick={scrollToTop}
        >
          {images !== null ? (
            <img
              src={`${SERVER_HOST}/${images[0]}`}
              alt={`${name}`}
              className="card--image"
            />
          ) : (
            <img
              src={notFoundImg}
              alt={`${name}`}
              className="card--image"
            />
          )}
        </Link>
      </div>

      <p className="card--title">
        {name}
      </p>

      <CardPrices price={price} priceActual={priceActual} />

      <div className="card--line">
        <CardSeparator />
      </div>

      <div className="card--bottom">
        <DetailsList
          product={product}
        />
      </div>

      <AddToCart product={product} />
    </div>
  );
};
