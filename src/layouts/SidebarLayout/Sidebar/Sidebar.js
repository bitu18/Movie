import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from '../SidebarLayout.module.scss';
import MovieSearch from '~/components/MovieSearch';
import * as apiService from '~/apiService/categoryService';
import Image from '~/components/Image';
import img from '~/assets/imgs';
import { Trans } from 'react-i18next';

const cx = classNames.bind(styles);

function Sidebar() {
    const [pageNumber, setPageNumber] = useState(2);
    const [updateMovies, setUpdateMovies] = useState([]);

    useEffect(() => {
        apiService
            .category('phim-dang-chieu', pageNumber)
            .then((res) => setUpdateMovies(res.items))
            .catch((err) => console.log('Error: ' + err));
    }, []);

    return (
        <>
            <div className={cx('title-wrapper')}>
                <div className={cx('logo')}>
                    <Image src={img.posterSidebar} className={cx('logo-sidebar')} />
                </div>
                <h2 className={cx('title', 'front-slash')}>
                    <Trans>Newest Movie</Trans>
                </h2>
            </div>
            <div className={cx('list-wrapper')}>
                {updateMovies.map((movie) => (
                    <MovieSearch key={movie.slug} data={movie} className={cx('sidebar-movie-search')} />
                ))}
            </div>
        </>
    );
}

export default Sidebar;
