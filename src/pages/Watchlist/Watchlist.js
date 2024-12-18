import classNames from 'classnames/bind';
import styles from './Watchlist.module.scss';
import HeaderListMovie from '~/components/HeaderListMovie';
import { useWatchlist } from '~/store';
import Movie from '~/components/Movie';
import { useState } from 'react';
import { Trans } from 'react-i18next';

const cx = classNames.bind(styles);
function Watchlist() {
    const { watchlist } = useWatchlist();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <HeaderListMovie title="Watchlist" viewAll={false} />
            </div>
            {watchlist.length > 0 ? (
                <div className={cx('watchlist-content')}>
                    <div className="row">
                        {watchlist.map((movie, index) => (
                            <div className={cx('movie-item', 'col l-2 m-3 c-6')} key={index}>
                                <Movie seriesMovie={movie} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className={cx('empty')}>
                    <Trans>Movie list is empty, please choose watch-later to add it to your watchlist</Trans>.
                </p>
            )}
        </div>
    );
}

export default Watchlist;
