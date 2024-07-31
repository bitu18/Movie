import classNames from 'classnames/bind';

import styles from './NavOptions.module.scss';

const cx = classNames.bind(styles);
function Header({ title }) {
    return <h3 className={cx('title-heading')}>{title}</h3>;
}

export default Header;
