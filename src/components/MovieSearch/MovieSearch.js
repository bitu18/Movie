import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './MovieSearch.module.scss';
import Image from '../Image';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function MovieSearch({ data, className }) {
    const { t, i18n } = useTranslation();
    const isEnglish = i18n.language === 'en';

    const wrapperClass = cx('wrapper', className);

    return (
        <a href={`/videoDetail/${data.slug}`} className={wrapperClass}>
            <Image src={data.thumb_url} alt={data.name} className={cx('img')} />
            <div className={cx('content')}>
                {isEnglish ? (
                    <>
                        <h5 className={cx('original-name')}>{data.original_name}</h5>
                        <h5 className={cx('name')}>{data.name}</h5>
                    </>
                ) : (
                    <>
                        <h5 className={cx('original-name')}>{data.name}</h5>
                        <h5 className={cx('name')}>{data.original_name}</h5>
                    </>
                )}
            </div>
        </a>
    );
}

MovieSearch.propTypes = {
    data: PropTypes.object.isRequired,
    className: PropTypes.string, // Accept className as prop
};

export default MovieSearch;
