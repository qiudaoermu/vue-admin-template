
const state = {
  lf: "",
};

const mutations = {
  transformLf: (state, lf) => {
    state.lf = lf
  }
};

export default {
  namespaced: true,
  state,
  mutations,
};
