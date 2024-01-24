import { useContext, useState } from 'react';

import './TabletsPage.scss';
import { Card } from '../../components/Card/Card';
import { DataContext } from '../../App';
import { Loader } from '../../components/Loader';
import { SortPanel } from '../../SortPanel/SortPanel';
import { sortProductList } from '../../utils/helpers';

export const TabletsPage = () => {
  const [
    selectedSortField, setSelectedSortField,
  ] = useState('Years');
  const [sortOrder, setSortOrder] = useState('Ascending');
  // const [
  //   selectedCountPerPage, setSelectedCountPerPage,
  // ] = useState('12');

  const handleSortFieldChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedSortField(event.target.value);
  };

  const handleSortOrder = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSortOrder(event.target.value);
  };

  const {
    productList,
    isLoading,
  } = useContext(DataContext);

  const visibleList = sortProductList(
    productList,
    selectedSortField,
    sortOrder,
  );

  return (
    <div className="TabletsPage">
      <h1 className="TabletsPage--title">
        Tablets
      </h1>
      <p className="TabletsPage--tabletsCount">
        {`${visibleList.length} models`}
      </p>

      <SortPanel
        onSortField={handleSortFieldChange}
        selectedSortField={selectedSortField}
        selectedSortOrder={sortOrder}
        onSelectOrder={handleSortOrder}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="TabletsPage--container">
          {visibleList.map(product => (
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