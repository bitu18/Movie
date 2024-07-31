import classNames from 'classnames/bind';
import styles from '../Navigation.module.scss';
import { memo } from 'react';

import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function NavigationMenu({ list }) {
    return (
        <Button className={cx('item-child')} leftIcon={<FontAwesomeIcon icon={faPlay} className={cx('left-icon')} />}>
            {list.name}
        </Button>
    );
}

export default memo(NavigationMenu);
