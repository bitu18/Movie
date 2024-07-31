import { useEffect, useState } from 'react';

import * as apiService from '~/apiService/categoryService';

function useFetchData(typeSlug, pageNumbs = [1, 2, 3]) {
    const [listMovies, setListMovies] = useState([]);
    const [pageNumber, setPageNumber] = useState([1, 2, 3]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(pageNumber.map((page) => apiService.category(typeSlug, page)));

                const movies = responses.flatMap((res) => res.items);
                setListMovies(movies);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchData();
    }, [listMovies, pageNumber, pageNumbs, typeSlug]);

    return {};
}

export default useFetchData;
