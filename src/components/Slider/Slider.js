import classNames from 'classnames/bind';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';

import styles from './Slider.module.scss';
import { useEffect, useState } from 'react';
import * as apiService from '~/apiService';
import Image from '../Image';
import { useTranslation } from 'react-i18next';

register();

const cx = classNames.bind(styles);

function Slider() {
    const { t, i18n } = useTranslation();
    const isEnglish = i18n.language === 'en';

    const [posters, setPosters] = useState([]);

    // Fetch Data
    useEffect(() => {
        apiService
            .lastestMovies(1)
            .then((res) => setPosters(res.items))
            .catch((error) => console.log('Fetching movies error:', error));
    }, []);

    useEffect(() => {
        const swiper = document.querySelector('swiper-container').swiper;

        swiper.params.coverflowEffect = {
            rotate: 50, // Slide rotate in degrees
            stretch: 0, // Stretch space between slides (in px)
            depth: 50, // Depth offset in px (slides translate in Z axis)
            modifier: 1, // Effect multipler
            scale: 0.8, // Scale effect for the slides
            slideShadows: true, // Enables slides shadows
        };

        swiper.params.autoplay = {
            delay: 2000,
            disableOnInteraction: false,
        };
        swiper.params.loop = true;
        swiper.params.loopedSlides = Math.max(3, posters.length); // Set the number of slides to loop

        // Responsive
        swiper.params.breakpoints = {
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
        };

        swiper.update(); // Update Swiper to apply the effect
        swiper.autoplay.start(); // Start autoplay
    }, [posters]);

    return (
        <div className={cx('slider-wrapper')}>
            <swiper-container
                style={{ '--swiper-navigation-color': '#fff' }}
                // slides-per-view="3"
                // space-between="20"
                center-slides="true"
                scrollbar-clickable="true"
                navigation="true"
                allowTouchMove="true"
                grab-cursor="true"
                rewind="true"
                scrollbar="false"
                effect="coverflow"
                // pagination="true"
            >
                {posters.map((poster) => (
                    <swiper-slide key={poster.slug}>
                        <a href={`/videoDetail/${poster.slug}`}>
                            <Image src={poster.poster_url} alt={poster.name} className={cx('poster')} />
                            <div className={cx('title')}>
                                {isEnglish ? (
                                    <>
                                        <h3 className={cx('title-eng')}>{poster.original_name}</h3>
                                        <h4 className={cx('title-vi')}>{poster.name}</h4>
                                    </>
                                ) : (
                                    <>
                                        <h3 className={cx('title-eng')}>{poster.name}</h3>
                                        <h4 className={cx('title-vi')}>{poster.original_name}</h4>
                                    </>
                                )}
                            </div>
                        </a>
                    </swiper-slide>
                ))}
            </swiper-container>
        </div>
    );
}

export default Slider;
