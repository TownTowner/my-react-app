import Mock from 'mockjs';

export default Mock.mock(/api\/Account\/Login/, 'post', options => {
    const ret = Mock.mock({ email: 'fff', token: 'fff' });
    return { success: true, message: 'success', data: ret };
});
