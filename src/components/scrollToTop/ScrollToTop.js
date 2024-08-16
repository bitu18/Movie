import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp } from '@fortawesome/free-regular-svg-icons';

import Button from '~/components/Button';
import styles from './ScrollToTop.module.scss';

const cx = classNames.bind(styles);

function ScrollToTop() {
    return (
        <Button
            primary
            small
            className={cx('icon-top')}
            leftIcon={<FontAwesomeIcon icon={faCircleUp} />}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
    );
}

export default ScrollToTop;
