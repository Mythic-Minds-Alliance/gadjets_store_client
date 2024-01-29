import './Card.scss';

import { Link } from 'react-router-dom';

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

  const productPageLink = `/phones/${product.name}`;

  return (
    <div className="card">
      <div className="card--top">
        <Link
          className="card--photo"
          to="/productDetails"
          onClick={scrollToTop}
        />
        <Link
          className="card--photo"
          to="/productDetails"
          onClick={scrollToTop}
        />
        <Link to={productPageLink} className="card--photo">
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

      <CardPrices price={price} fullPrice={priceDiscount} />

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
