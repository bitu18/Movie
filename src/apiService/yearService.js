import request from '~/untils/httpRequest';

export const year = async (slug, page = 1) => {
    try {
        const res = await request.get(`/films/nam-phat-hanh/${slug}`, {
            params: {
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.error('Error fetching year:', error);
        throw error;
    }
};
