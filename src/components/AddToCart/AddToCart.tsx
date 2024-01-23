import { useContext, useEffect, useState } from 'react';

import './AddToCart.scss';
import like from '../../icons/like.svg';
import likeActive from '../../icons/like-active.svg';
import { Product } from '../../types/product';
import { DataContext, handleAddToCart, handleAddToFavorites } from '../../App';

type Props = {
  product: Product,
};

export const AddToCart: React.FC<Props> = ({ product }) => {
  const [isActiveAdd, setIsActiveAdd] = useState(false);
  const [isActiveFavorite, setIsActiveFavorite] = useState(false);

  const {
    setFavoriteStorage,
    setCartStorage,
    cartStorage,
    favoriteStorage,
  } = useContext(DataContext);

  const checkIsActive = (item: Product, productStorage: Product[]) => {
    return productStorage.some(phoneCard => phoneCard.id === item.id);
  };

  useEffect(() => {
    if (checkIsActive(product, cartStorage)) {
      setIsActiveAdd(true);
    }

    if (checkIsActive(product, favoriteStorage)) {
      setIsActiveFavorite(true);
    }
  }, [cartStorage, favoriteStorage, product]);

  const handleClickAdd = () => {
    setIsActiveAdd(!isActiveAdd);
  };

  const handleClickFavorite = () => {
    setIsActiveFavorite(!isActiveFavorite);
  };

  return (
    <div className="addToCart">
      <button
        className={
          isActiveAdd ? 'addToCart--active-add' : 'addToCart--add'
        }
        type="submit"
        onClick={() => {
          handleClickAdd();
          handleAddToCart(product, setCartStorage);
        }}
      >
        Add to cart
      </button>
      <button
        type="submit"
        className={
          isActiveFavorite
            ? 'addToCart--active-favorite'
            : 'addToCart--favorite'
        }
        onClick={() => {
          handleClickFavorite();
          handleAddToFavorites(product, setFavoriteStorage);
        }}
      >
        <img
          src={isActiveFavorite ? like : likeActive}
          alt="like"
          className="addToCart--icons"
        />
      </button>
    </div>
  );
};
