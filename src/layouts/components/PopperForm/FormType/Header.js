import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './FormType.module.scss';

const cx = classNames.bind(styles);

function Header({ title, des }) {
    return (
        <>
            <h2 className={cx('header')}>{title}</h2>
            <p className={cx('des')}>{des}</p>
        </>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    des: PropTypes.string,
};

export default Header;
