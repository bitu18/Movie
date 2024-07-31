import request from '~/untils/httpRequest';

export const lastestMovies = async (page) => {
    try {
        const res = await request.get(`/films/phim-moi-cap-nhat?`, {
            params: {
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.error('Error fetching last movies:', error);
        throw error;
    }
};
