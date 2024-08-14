import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './Home.module.scss';
import Movie from '~/components/Movie';
import HeaderListMovie from '~/components/HeaderListMovie';
import * as apiService from '~/apiService/categoryService';
import LoadingSpinner from '~/components/loadingSpinner';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Home() {
    const [listType, setListType] = useState(apiService.typesList);
    const [listMovieType, setListMovieType] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const types = listType.map((type) =>
                    apiService.category(type.slug).then((res) => ({ type, movies: res.items })),
                );
                const responses = await Promise.all(types);

                setListMovieType(responses);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleScrollTop = () => {};

    return (
        <>
            {listMovieType.map(({ type, movies }) => (
                <div key={type.slug} className={cx('wrapper')}>
                    <HeaderListMovie title={type.name} viewAll={true} />
                    <div className={cx('movie-wrapper', 'row')}>
                        {movies.map((movie, index) => (
                            <div className={cx('movie-item', 'col l-2-4 m-3 c-6')} key={index}>
                                <Movie seriesMovie={movie} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Loading spinner when the data fetch */}
            {loading && <LoadingSpinner />}
        </>
    );
}

export default Home;
