import { Swiper, SwiperSlide } from "swiper/react";
import {
  ArrowIconMobile,
  ArrowsMobile,
  Container,
  Photo,
  PhotoContainer,
  SwiperContainer,
} from "./swiperStyled";
import { createRef } from "react";
import "lazysizes";
const swiperRef = createRef();

export const previous = () => {
  const swiper = swiperRef?.current?.swiper ? swiperRef.current.swiper : null;
  swiper && swiper.slidePrev();
};
export const next = () => {
  const swiper = swiperRef?.current?.swiper ? swiperRef.current.swiper : null;
  swiper && swiper.slideNext();
};

export const SwiperComponent = ({ gallery }) => {
  return (
    <SwiperContainer>
      <Swiper
        ref={swiperRef}
        direction={"horizontal"}
        slidesPerView={"auto"}
        loop
        centeredSlides
        initialSlide={2}
        spaceBetween={20}
      >
        {gallery.map((item, index) => {
          return (
            <SwiperSlide key={index + item.sourceUrl}>
              <Container>
                <PhotoContainer>
                  <Photo
                    className="lazyload"
                    data-src={item.sourceUrl}
                    alt={item.sourceUrl}
                  />
                </PhotoContainer>
              </Container>
            </SwiperSlide>
          );
        })}
        <ArrowsMobile>
          <ArrowIconMobile
            left="10%"
            arrow="/leftArrow.svg"
            onClick={() => previous()}
          />
          <ArrowIconMobile
            right="10%"
            arrow="/rightArrow.svg"
            onClick={() => next()}
          />
        </ArrowsMobile>
      </Swiper>
    </SwiperContainer>
  );
};
