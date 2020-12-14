import React  from 'react'
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

const swiperRef = React.createRef()

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
                visibilityFullFit
            >
            {employees.map(employer => {
                return (
                    <SwiperSlide>
                        {({isActive}) => (
                            <EmployerContainer >
                                <PhotoContainer >
                                    <EmployerPhoto
                                        height={isActive ? '90%' : '85%'}
                                        top={isActive ? '-45px' : 'unset'}
                                        alt={employer.photo?.sourceUrl}
                                        src={employer.photo.sourceUrl}/>
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
                    left='0'
                    paddingLeft='15%'
                    className="fa fa-long-arrow-left"
                    aria-hidden="true"
                    onClick={()=>previous()}
                />
                <ArrowIconMobile
                    right='0'
                    paddingRight='15%'
                    className="fa fa-long-arrow-right"
                    aria-hidden="true"
                    onClick={()=>next()}
                />
            </ArrowsMobile>
            </Swiper>
        </SwiperContainer>
    )
}