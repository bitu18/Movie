import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import styles from './FetchDataMovie.module.scss';
import HeaderListMovie from '~/components/HeaderListMovie';
import * as apiService from '~/apiService';
import { FetchFilterSort } from './FetchFilterSort/FetchFilterSort';
import Movie from '~/components/Movie';
import Sort from '~/layouts/components/Sort';
import Image from '~/components/Image';
import img from '~/assets/imgs';
import LoadingSpinner from '../loadingSpinner';

const cx = classNames.bind(styles);

function FetchDataMovie({ title, slug }) {
    const [updateMovies, setUpdateMovies] = useState([]);
    const [currentPageNumb, setCurrentPageNumb] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filterMovies, setFilterMovies] = useState({ type: '', value: '', slug });

    const [loading, setLoading] = useState(false);
    const sortRef = useRef(null);

    const handleMoveNextPage = () => {
        setLoading(true);
        setCurrentPageNumb((prev) => (currentPageNumb < totalPages ? prev + 2 : currentPageNumb));

        if (sortRef.current) {
            sortRef.current.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
        }
    };

    const handleMovePrevPage = () => {
        setLoading(true);
        setCurrentPageNumb((prev) => (currentPageNumb > 1 ? prev - 2 : 1));

        if (sortRef.current) {
            sortRef.current.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
        }
    };

    const handleSortChange = (type, value) => {
        setFilterMovies({ type, value, slug });
        setCurrentPageNumb(1); // Reset to the first page on sort change
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response1, response2;

                switch (filterMovies.type) {
                    case 'year':
                        response1 = await apiService.year(filterMovies.value, currentPageNumb);
                        response2 =
                            currentPageNumb < response1.paginate.total_page
                                ? await apiService.year(filterMovies.value, currentPageNumb + 1)
                                : { items: [] };
                        break;
                    case 'genre':
                        response1 = await apiService.genre(filterMovies.value, currentPageNumb);
                        response2 =
                            currentPageNumb < response1.paginate.total_page
                                ? await apiService.genre(filterMovies.value, currentPageNumb + 1)
                                : { items: [] };
                        break;
                    case 'nation':
                        response1 = await apiService.nation(filterMovies.value, currentPageNumb);
                        response2 =
                            currentPageNumb < response1.paginate.total_page
                                ? await apiService.nation(filterMovies.value, currentPageNumb + 1)
                                : { items: [] };
                        break;
                    default:
                        response1 = await apiService.category(filterMovies.slug, currentPageNumb);
                        response2 =
                            currentPageNumb < response1.paginate.total_page
                                ? await apiService.category(filterMovies.slug, currentPageNumb + 1)
                                : { items: [] };
                }

                const movies = [...response1.items, ...response2.items];

                setUpdateMovies(movies);
                setTotalPages(response1.paginate.total_page);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [filterMovies, currentPageNumb]);

    return (
        <>
            <Sort
                ref={sortRef}
                moveNextPage={handleMoveNextPage}
                movePrevPage={handleMovePrevPage}
                onHandleSortChange={handleSortChange}
            />
            <div className={cx('wrapper')}>
                <HeaderListMovie title={title} viewAll={false} />
                <div className={cx('row')}>
                    {updateMovies.map((movie, index) => (
                        <div className={cx('movie-item', 'col l-2 m-3 c-6')} key={index}>
                            <Movie seriesMovie={movie} />
                        </div>
                    ))}
                </div>
            </div>
            <Sort showControlSelect={false} moveNextPage={handleMoveNextPage} onHandleSortChange={handleSortChange} />

            {/* Loading spinner when the data fetch */}
            {loading && <LoadingSpinner />}
        </>
    );
}

FetchDataMovie.propTypes = {
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
};

export default FetchDataMovie;
