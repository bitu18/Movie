import classNames from 'classnames/bind';

import styles from './LoadingSpinner.module.scss';
import Image from '../Image';
import img from '~/assets/imgs';

const cx = classNames.bind(styles);
function LoadingSpinner() {
    return (
        <div className={cx('loading')}>
            <div className={cx('loading-icon')}>
                <Image src={img.loading} alt="Loading..." />
            </div>
        </div>
    );
}

export default LoadingSpinner;
