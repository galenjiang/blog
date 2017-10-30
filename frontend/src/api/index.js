import querryString from 'querystring';
import axios from '../axios';

export default {
  createResource: (data) => {
    return axios.post('/api/ads', data);
  },

  updateResource: (id, data) => {
    return axios.put(`/api/ads/${id}`, data);
  },

  deleteResource: (id) => {
    return axios.delete(`/api/ads/${id}`);
  },

  distributionResource: (id, data) => {
    return axios.put(`/api/ads/${id}`, data);
  },

  deDistributionResource: (id, data) => {
    return axios.put(`/api/ads/${id}`, data);
  },

  getAdminResourceList: (data) => {
    const query = querryString.stringify(data);
    return axios.get(`/api/ads/admin_list?${query}`);
  },

  getPlatformList: () => {
    return axios.get('/api/users/videojj/list?pn=0&ps=9999&no_stat=1');
  },
};

