import classNames from 'classnames/bind';
import { memo } from 'react';
import PropTypes from 'prop-types';

import styles from './VideoDetail.module.scss';

const cx = classNames.bind(styles);

const FetchVideo = memo(
    ({ movieDetail }) => {
        // Return null or a placeholder if no movieDetail is provided
        if (!movieDetail || !movieDetail.embed) {
            return <div>Loading video...</div>;
        }

        console.log(movieDetail.embed);

        return (
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
