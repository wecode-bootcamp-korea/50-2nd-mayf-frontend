import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/scss/navigation';
import './Slide.scss';

const Slide = () => {
  return (
    <div className="slide">
      <Swiper
        modules={[Autoplay, A11y]}
        spaceBetween={50}
        slidesPerView={2}
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
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
};

export default Slide;
