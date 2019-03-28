export default {
  strict: true,
  // namespaced: true,
  state: {
    messages: []
  },
  actions: {
    updateMessage(context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000);
      console.log("更新訊息", {
        message,
        status,
        timestamp
      });
      context.commit("PUSH_MESSAGE", {
        message,
        status,
        timestamp
      });
      context.dispatch("removeMessageWithTiming", timestamp);
    },
    removeMessage(context) {
      context.commit("REMOVE_MESSAGE");
    },
    removeMessageWithTiming(context, timestamp) {
      setTimeout(() => {
        context.state.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            context.commit("REMOVE_MESSAGE", i);
          }
        });
      }, 5000);
    }
  },
  mutations: {
    PUSH_MESSAGE(state, message) {
      state.messages.push(message);
    },
    REMOVE_MESSAGE(state, i) {
      state.messages.splice(i, 1);
    }
  },
  getters: {
    messages(state) {
      return state.messages;
    }
  }
};
