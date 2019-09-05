import instance from '../utils/request';
export default {
    login: (data) => instance.post('/api/login', data),
    registry: (data) => instance.post('/api/registry', data)
}