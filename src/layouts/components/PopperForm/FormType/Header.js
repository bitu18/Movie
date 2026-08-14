import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './FormType.module.scss';
import { Trans } from 'react-i18next';

const cx = classNames.bind(styles);

function Header({ title, des }) {
    return (
        <>
            <h2 className={cx('header')}>
                <Trans>{title}</Trans>
            </h2>
            <p className={cx('des')}>
                <Trans>{des}</Trans>
            </p>
        </>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    des: PropTypes.string,
};

export default Header;
