import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';

import styles from './Image.module.scss';
import image from '~/assets/imgs';

const cx = classNames.bind(styles);

const Image = forwardRef(({ src, alt, className, customFallback = image.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const hangleError = () => {
        setFallback(customFallback);
    };
    return (
        <img
            className={cx('wrapper', className)}
            ref={ref}
            src={fallback || src}
            alt={alt}
            {...props}
            onError={hangleError}
        />
    );
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    customFallback: PropTypes.string,
};

export default Image;
