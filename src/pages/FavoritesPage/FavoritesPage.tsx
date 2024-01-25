import { useContext } from 'react';

import './FavoritesPage.scss';
import { Card } from '../../components/Card/Card';
import { DataContext } from '../../App';
import { Loader } from '../../components/Loader';

export const FavoritesPage = () => {
  const {
    isLoading,
    favoriteStorage,
  } = useContext(DataContext);

  return (
    <div className="FavoritesPage">
      <h1 className="FavoritesPage--title">
        Favorites
      </h1>
      <p className="FavoritesPage--favoritesCount">
        {(favoriteStorage.length === 1)
          ? (`${favoriteStorage.length} item`)
          : (`${favoriteStorage.length} items`)}
      </p>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="FavoritesPage--container">
          {favoriteStorage.map(product => (
            <Card
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
};