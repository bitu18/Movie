import request from '~/untils/httpRequest';

export const movieInfor = async (slug) => {
    try {
        const res = await request.get(`/film/${slug}`, {
            params: {},
        });
        return res.data;
    } catch (error) {
        console.error('Error fetching movie information:', error);
        throw error;
    }
};
