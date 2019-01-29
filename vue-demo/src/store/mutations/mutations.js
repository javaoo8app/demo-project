export const mutationsMsg = (state, payload) => {
  state.changeMsgTimes++
  if (state.changeMsgTimes % 2 === 0) {
    state.msg = payload.msg
  } else {
    state.msg = '我已經不是原始数据'
  }
}
export const upDateMenu = (state, payload) => {
  state.menu = payload.menu
}
