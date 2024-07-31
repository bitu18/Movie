import request from '~/untils/httpRequest';

export const nation = async (slug, page = 1) => {
    try {
        const res = await request.get(`/films/quoc-gia/${slug}`, {
            params: {
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.error('Error fetching nation:', error);
        throw error;
    }
};
