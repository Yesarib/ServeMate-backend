import axios from 'axios';

export const fetchProductsByIds = async (productIds: string[]) => {
    const query = `
        query GetProductsByIds($ids: [String!]!) {
            getProductsByIds(productIds: $ids) {
                id
                name
                price
            }
        }
    `;

    const variables = { ids: productIds };

    try {
        const response = await axios.post('http://localhost:8083/graphql', { query, variables });
        return response.data.data.getProductsByIds;
    } catch (error) {
        console.error('Error fetching products by IDs:', error);
        return []; // Hata durumunda boş bir dizi döndür
    }
};