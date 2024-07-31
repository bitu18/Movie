import classNames from 'classnames/bind';

import styles from './NavOptions.module.scss';
import Button from '../Button';
import { Trans } from 'react-i18next';

const cx = classNames.bind(styles);
function NavOptionItem({ onClick, title, to }) {
    return (
        <Button className={cx('btn')} onClick={onClick} to={to}>
            <Trans>{title}</Trans>
        </Button>
    );
}

export default NavOptionItem;
