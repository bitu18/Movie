import classNames from 'classnames/bind';
import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './VideoDetail.module.scss';

const cx = classNames.bind(styles);

const FetchVideo = memo(
    ({ movieDetail }) => {
        useEffect(() => {
            if (movieDetail && movieDetail.embed) {
                return;
            }
        }, [movieDetail]);

        return (
            <div className={cx('video-play')}>
                <iframe
                    width="100%"
                    height="420"
                    src={movieDetail.embed}
                    title="Video player"
                    frameBorder="0"
                    allowFullScreen
                />
            </div>
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
