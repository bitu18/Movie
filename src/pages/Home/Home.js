import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './Home.module.scss';
import Movie from '~/components/Movie';
import HeaderListMovie from '~/components/HeaderListMovie';
import * as apiService from '~/apiService/categoryService';

const cx = classNames.bind(styles);

function Home() {
    const [listType, setListType] = useState(apiService.typesList);

    const [listMovieType, setListMovieType] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const types = listType.map((type) =>
                    apiService.category(type.slug).then((res) => ({ type, movies: res.items })),
                );
                const responses = await Promise.all(types);

                setListMovieType(responses);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchData();
    }, []);

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
        </>
    );
}

export default Home;
