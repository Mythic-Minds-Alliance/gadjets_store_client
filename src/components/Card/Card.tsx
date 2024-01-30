import './Card.scss';

import { Link, useLocation } from 'react-router-dom';

import React from 'react';
import { Product } from '../../types/product';
import { DetailsList } from '../DetailsList/DetailsList';
import { AddToCart } from '../AddToCart/AddToCart';
import { CardSeparator } from '../СardSeparator/CardSeparator';
import { CardPrices } from '../CardPrices/CardPrices';
import { SERVER_HOST, scrollToTop } from '../../utils/helpers';

type Props = {
  product: Product,
};

export const Card: React.FC<Props> = ({ product }) => {
  const {
    name,
    price,
    priceDiscount,
    images,
  } = product;

  const location = useLocation().pathname;

  const productPageLink = `${location}/${product.name}`;

  return (
    <div className="card">
      <div className="card--top">
        <Link
          to={productPageLink}
          className="card--photo"
          onClick={scrollToTop}
        >
          <img
            src={`${SERVER_HOST}/${images[0]}`}
            alt={`${name}`}
            className="card--image"
          />
        </Link>
      </div>

      <p className="card--title">
        {name}
      </p>

      <CardPrices price={priceDiscount} fullPrice={price} />

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
