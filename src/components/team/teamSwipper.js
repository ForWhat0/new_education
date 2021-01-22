import { Swiper ,SwiperSlide} from 'swiper/react';
import {
    ArrowIconMobile,
    ArrowsMobile,
    EmployerContainer,
    EmployerName,
    EmployerPhoto,
    PhotoContainer,
    SwiperContainer
} from "./teamStyledComponents"
import {createRef} from "react";
import 'lazysizes'
const swiperRef = createRef()

export const previous= () => {
    const swiper = swiperRef?.current?.swiper?  swiperRef.current.swiper : null
    swiper && swiper.slidePrev()
}
export const next= () => {
    const swiper = swiperRef?.current?.swiper?  swiperRef.current.swiper : null
    swiper && swiper.slideNext()
}

export const TeamSwiper = ({employees})=>{
    return(
        <SwiperContainer>
            <Swiper
                ref={swiperRef}
                direction={'horizontal'}
                slidesPerView={'auto'}
                loop
                centeredSlides
                initialSlide={2}
                spaceBetween={20}
            >
            {employees.map((employer,index) => {
                return (
                    <SwiperSlide key={index+employer.name}>
                        {({isActive}) => (
                            <EmployerContainer >
                                <PhotoContainer >
                                    <EmployerPhoto
                                        className="lazyload"
                                        data-src={employer.photo.sourceUrl}
                                        height={isActive ? '90%' : '85%'}
                                        top={isActive ? '-45px' : 'unset'}
                                        alt={employer.photo?.sourceUrl}
                                    />
                                    <EmployerName
                                        display={isActive ? 'block' : 'none'}
                                    >
                                        {employer.name}
                                    </EmployerName>
                                </PhotoContainer>
                            </EmployerContainer>
                        )}
                    </SwiperSlide>
                        )
            })}
            <ArrowsMobile>
                <ArrowIconMobile
                    left='10%'
                    arrow='/leftArrow.svg'
                    onClick={()=>previous()}
                />
                <ArrowIconMobile
                    right='10%'
                    arrow='/rightArrow.svg'
                    onClick={()=>next()}
                />
            </ArrowsMobile>
            </Swiper>
        </SwiperContainer>
    )
}