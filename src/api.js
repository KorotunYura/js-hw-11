import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

async function servicesGallery(name, currentPage = '1', perPage = '40') {
  const API_KEY = '42207298-a2052037ed8fea0fbf832b5c2';

  const params = new URLSearchParams({
    key: API_KEY,
    q: name,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: currentPage,
    per_page: perPage,
  });

  const response = await axios.get(`?${params}`);

  return response.data;
}

export { servicesGallery };
