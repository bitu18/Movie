import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import PropTypes from 'prop-types';

import styles from './MenuOption.module.scss';
import Popper from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';
import { useForm } from '~/store';

const cx = classNames.bind(styles);

function MenuOption({ children, options = [], hideOnClick = false, onChange }) {
    const [history, setHistory] = useState([{ data: options }]);

    const { logOut } = useForm();

    const currentState = history[history.length - 1];

    const renderOptions = () => {
        return currentState.data.map((option, index) => {
            const parent = !!option.children;

            return (
                <MenuItem
                    key={index}
                    data={option}
                    onClick={() => {
                        if (parent) {
                            setHistory((prev) => [...prev, option.children]);
                        } else {
                            onChange(option);

                            if (option.title === 'Log out') {
                                logOut();
                            }
                        }
                    }}
                />
            );
        });
    };

    const handleResettoFirstPage = () => setHistory((prev) => prev.slice(0, 1));

    return (
        <Tippy
            interactive
            offset={[0, 5]}
            delay={[0, 700]}
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-options')} tabIndex="-1" {...attrs}>
                    <Popper className={cx('menu-popper-option')}>
                        {history.length > 1 && (
                            <Header
                                title={currentState.title}
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                }}
                            />
                        )}
                        {renderOptions()}
                    </Popper>
                </div>
            )}
            onHide={handleResettoFirstPage}
        >
            {children}
        </Tippy>
    );
}

MenuOption.propTypes = {
    children: PropTypes.node.isRequired,
    options: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default MenuOption;
