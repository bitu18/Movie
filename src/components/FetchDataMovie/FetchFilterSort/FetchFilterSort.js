import * as apiService from '~/apiService';

export const FetchFilterSort = async ({ type, value }, page = 1) => {
    let yearData = null,
        genreData = null,
        nationData = null;

    try {
        if (type.year) {
            yearData = await apiService.year(value, page);
        }
        if (type.genre) {
            genreData = await apiService.genre(value, page);
        }
        if (type.nation) {
            nationData = await apiService.nation(value, page);
        }

        return { yearData, genreData, nationData };
    } catch (err) {
        console.error('Error fetching year data:', err);
    }
};
