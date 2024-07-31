import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import styles from './Movie.module.scss';
import Image from '~/components/Image';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);
function Movie({ seriesMovie }) {
    const { t, i18n } = useTranslation();
    const isEnglish = i18n.language === 'en';
    return (
        <a href={`/videoDetail/${seriesMovie.slug}`} className={cx('link')}>
            <div className={cx('poster')}>
                <Image src={seriesMovie.thumb_url} alt={seriesMovie.name} className={cx('img')} />
                <div className={cx('status')}>{`${seriesMovie.quality} ${t(seriesMovie.language)}`}</div>
                <FontAwesomeIcon icon={faPlay} className={cx('play-icon')} />
            </div>

            <div className={cx('title')}>
                {isEnglish ? (
                    <>
                        <h3 className={cx('title--eng')}>{seriesMovie.original_name}</h3>
                        <p className={cx('title--vi')}>{seriesMovie.name}</p>
                    </>
                ) : (
                    <>
                        <h3 className={cx('title--eng')}>{seriesMovie.name}</h3>
                        <p className={cx('title--vi')}>{seriesMovie.original_name}</p>
                    </>
                )}
            </div>
        </a>
    );
}

Movie.propTypes = {
    seriesMovie: PropTypes.object.isRequired,
};

export default Movie;
