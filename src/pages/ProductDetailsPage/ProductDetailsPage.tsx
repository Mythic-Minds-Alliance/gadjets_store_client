/* eslint-disable max-len */
import axios from 'axios';
import { useEffect, useState } from 'react';
import detailsStyles from './ProductDetailsPage.module.scss';
import { ProductTitle } from '../../components/ProductTitle';
import {
  AboutProduct,
  phonesFromServer,
} from '../../components/AboutProduct/AboutProduct';
import { TechSpecs } from '../../components/TechSpecs/TechSpecs';
import { ProductImagesSlider } from '../../components/ProductImagesSlider';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { ProductVariants } from '../../components/ProductVariants/ProductVariants';
import { Carusel } from '../../components/Carusel';
import { CaruselSort } from '../../types/CaruselSort';
import { BackButton } from '../../components/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const ProductDetailsPage = () => {
  const [, setCurrentProduct] = useState([]);
  const [, setIsLoading] = useState(true);

  // const pathname = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get('http://localhost:3005/products?categoryId=1');

        setCurrentProduct(response.data);
      } catch (error) {
        throw new Error('error when fetching data from API');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className={detailsStyles.container}>
        <Breadcrumbs />
        <BackButton />
        <ProductTitle />
        <div className={detailsStyles.extendedDetails}>
          <div className={detailsStyles.topContent}>
            <div className={detailsStyles.extendedDetails__pictures}>
              <ProductImagesSlider />
            </div>
            <div className={detailsStyles.extendedDetails__mainInfo}>
              <ProductVariants product={phonesFromServer[0]} />
            </div>
          </div>

          <div className={detailsStyles.bottomContent}>
            <div className={detailsStyles.extendedDetails__about}>
              <AboutProduct />
            </div>
            <div className={detailsStyles.extendedDetails__techSpecs}>
              {phonesFromServer.map(phone => (
                <TechSpecs
                  phone={phone}
                  key={phone.id}
                />
              ))}
            </div>
          </div>

        </div>

        <Carusel
          title="You may also like"
          selectedSortCarusel={CaruselSort.YouPropose}
        />

      </div>

    </>
  );
};
