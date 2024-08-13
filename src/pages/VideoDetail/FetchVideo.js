import classNames from 'classnames/bind';
import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './VideoDetail.module.scss';
import Image from '~/components/Image';
import img from '~/assets/imgs';

const cx = classNames.bind(styles);

const FetchVideo = memo(
    ({ movieDetail }) => {
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            if (movieDetail && movieDetail.embed) {
                setLoading(false);
            }
        }, [movieDetail]);

        return (
            <>
                {loading ? (
                    <div className={cx('loading-icon')}>
                        <Image src={img.loading} alt="Loading..." />
                    </div>
                ) : (
                    <div className={cx('video-play')}>
                        <iframe
                            width="100%"
                            height="420"
                            src={movieDetail.embed}
                            title="Video player"
                            frameBorder="0"
                            // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}
            </>
        );
    },
    (prevProps, nextProps) => prevProps.movieDetail?.embed === nextProps.movieDetail?.embed,
);

FetchVideo.proTypes = {
    movieDetail: PropTypes.shape({
        embed: PropTypes.string,
    }),
};

export default FetchVideo;
