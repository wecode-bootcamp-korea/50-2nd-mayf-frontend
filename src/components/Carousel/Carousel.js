import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/scss/navigation';
import './Carousel.scss';

const Carousel = () => {
  const BANNER = [
    {
      id: 1,
      img: 'https://mayfly-bucket.s3.ap-northeast-2.amazonaws.com/etc/cookingclass.jpg',
    },
    {
      id: 2,
      img: 'https://mayfly-bucket.s3.ap-northeast-2.amazonaws.com/etc/banner2.png',
    },
    {
      id: 3,
      img: 'https://mayfly-bucket.s3.ap-northeast-2.amazonaws.com/etc/joel-heard-4PAfwVC3zaE-unsplash+(1).jpg',
    },
    {
      id: 4,
      img: 'https://mayfly-bucket.s3.ap-northeast-2.amazonaws.com/etc/junior.png',
    },
  ];
  const sliderRef = useRef(null);

  const handleNextSlide = () => {
    if (sliderRef.current && sliderRef.current.slideNext) {
      sliderRef.current.slideNext();
    }
  };

  const handlePrevSlide = () => {
    if (sliderRef.current && sliderRef.current.slidePrev) {
      sliderRef.current.slidePrev();
    }
  };

  return (
    <div className="carousel">
      <Swiper
        ref={sliderRef}
        modules={[Autoplay]}
        spaceBetween={40}
        slidesPerView={2}
        onSwiper={(swiper) => {
          sliderRef.current = swiper;
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
      >
        {BANNER.map((banner) => {
          return (
            <SwiperSlide>
              <img
                key={banner.id}
                className="banner"
                alt="banner"
                src={banner.img}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="swiper-button-next" onClick={handleNextSlide}></div>
      <div className="swiper-button-prev" onClick={handlePrevSlide}></div>
    </div>
  );
};

export default Carousel;
