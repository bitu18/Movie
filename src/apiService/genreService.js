import request from '~/untils/httpRequest';

export const genre = async (slug, page = 1) => {
    try {
        const res = await request.get(`/films/the-loai/${slug}`, {
            params: {
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.error('Error fetching genres:', error);
        throw error;
    }
};
