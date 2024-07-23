import axios from 'axios';

const client = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '45059083-8ad77475a4982aeafbefc4919',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  },
});

class SearchImageApi {
  static async search(q, parameters = {}) {
    const response = await client.get('/', { params: { ...parameters, q } });
    return response.data;
  }
}

export default SearchImageApi;
