import instance from '../utils/request'
export default {
    //获取列表接口
    querymusic: (data) => instance.get('/api/querymusic', data),
    //删除歌曲接口
    deletemusic: (data) => instance.get('/api/deletemusic', data),
    //修改歌曲接口
    updatemusic: (data) => instance.post('/api/updatemusic', data),
    //添加歌曲接口
    addmusic: (data) => instance.post('/api/addmusic', data),
    //上传图片接口
    lodingImg: data => instance.post('/api/upload', data)
}