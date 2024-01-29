import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import Carousel, { ButtonGroupProps } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { sortProductCarusel } from '../../utils/helpers';
import { Card } from '../Card/Card';
import styles from './Carousel.module.scss';
import arrow from '../../icons/SliderButtonRight.png';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 4,
    slidesToSlide: 2,
  },
  tablet: {
    breakpoint: { max: 1199, min: 860 },
    items: 3,
    slidesToSlide: 1,
    partialVisibilityGutter: 30,
  },
  tabletSmall: {
    breakpoint: { max: 859, min: 641 },
    items: 2,
    slidesToSlide: 1,
    partialVisibilityGutter: 60,
  },
  largeMobile: {
    breakpoint: { max: 640, min: 400 },
    items: 1.5,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 400, min: 320 },
    items: 1.1,
    slidesToSlide: 1,
  },
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  next,
  previous,
  carouselState,
}: ButtonGroupProps) => {
  const currentSlide = carouselState?.currentSlide ?? 0;
  const isInitialSlide = currentSlide === 0;

  const handlePrevClick = () => {
    if (previous) {
      previous();
    }
  };

  const handleNextClick = () => {
    if (next) {
      next();
    }
  };

  return (
    <div className={classNames(styles['carousel-button-group'])}>
      <button
        type="button"
        className={classNames(
          styles.button,
          { [styles['button--disabled']]: isInitialSlide },
        )}
        aria-label="Go left"
        onClick={handlePrevClick}
      >
        <img
          src={arrow}
          alt="arrow_left"
          className={classNames(styles.buttonImg)}
        />
      </button>

      <button
        type="button"
        className={classNames(styles.button, styles.buttonRight)}
        aria-label="Go right"
        onClick={handleNextClick}
      >
        <img
          src={arrow}
          alt="arrow_right"
          className={classNames(styles.buttonImg, styles['button--right'])}
        />
      </button>
    </div>
  );
};

interface Props {
  title: string;
  selectedSortCarusel: string;
}

export const Carusel: React.FC<Props> = ({ title, selectedSortCarusel }) => {
  const [phonesList, setphonesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get('http://localhost:3005/products?categoryId=1');

        setphonesList(response.data);
      } catch (error) {
        throw new Error('error when fetching data from API');
      }
    };

    fetchData();
  }, []);

  const visibleCart = sortProductCarusel(phonesList, selectedSortCarusel);

  return (
    <section className={classNames(styles.CarouselContainer)}>
      <div className={classNames(styles.carusel__title)}>{title}</div>

      <Carousel
        itemClass={classNames(styles.Cards)}
        arrows={false}
        renderButtonGroupOutside
        customButtonGroup={<ButtonGroup />}
        partialVisible
        responsive={responsive}
        infinite
      >
        {visibleCart.map((product) => (
          <Card product={product} key={product.id} />
        ))}
      </Carousel>
    </section>
  );
};