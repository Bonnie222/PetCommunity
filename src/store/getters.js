const getters = {
  id: state => state.user.id,     //用户id
  token: state => state.user.token, //用户令牌
  userInfo: state => state.user.userInfo,//用户所有信息
};
export default getters;
