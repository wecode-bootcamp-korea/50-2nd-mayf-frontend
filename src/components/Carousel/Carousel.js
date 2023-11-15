import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/scss/navigation';
import './Carousel.scss';

const Carousel = () => {
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
        spaceBetween={50}
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
        <SwiperSlide>
          <img
            className="banner"
            alt="banner"
            src="https://mayfly-bucket.s3.ap-northeast-2.amazonaws.com/etc/cookingclass.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="banner"
            alt="banner"
            src="https://mayfly-bucket.s3.ap-northeast-2.amazonaws.com/etc/banner2.png"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="banner"
            alt="banner"
            src="https://mayfly-bucket.s3.ap-northeast-2.amazonaws.com/etc/joel-heard-4PAfwVC3zaE-unsplash+(1).jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="banner"
            alt="banner"
            src="https://mayfly-bucket.s3.ap-northeast-2.amazonaws.com/etc/junior.png"
          />
        </SwiperSlide>
      </Swiper>
      <div className="swiper-button-next" onClick={handleNextSlide}></div>
      <div className="swiper-button-prev" onClick={handlePrevSlide}></div>
    </div>
  );
};

export default Carousel;
