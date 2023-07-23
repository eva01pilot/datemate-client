import { defineStore } from "pinia";

interface UserStore {
  user: UserProps;
}

interface UserProps {
  username: string | null;
  avatar: string | null;
  id: number | null;
  description: string | null;
  gallery: string[] | null;
}

export const useUserStore = defineStore("user", () => {
  const state = reactive<UserStore>({
    user: {
      username: null,
      avatar: null,
      id: null,
      description: null,
      gallery: null,
    },
  });

  const getters = {
    getUser() {
      return state.user;
    },
  };

  const actions = {
    setUser(userData: UserProps) {
      state.user = userData;
    },
  };
  return { state, getters, actions };
});
