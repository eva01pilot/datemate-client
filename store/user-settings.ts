import { defineStore } from "pinia";
import isSuccess from "~/helpers/is-success";
import { Location, Gallery } from "~/plugins/api/auth";
import { Interest } from "~/plugins/api/interest";

export type GalleryImage = {
  src: string;
} & (GalleryImageBlob | GalleryImageFromStorage);

export interface GalleryImageBlob {
  type: "base64";
  blob: File | null;
}

export interface GalleryImageFromStorage {
  type: "storageImg";
}

interface GalleryLocal {
  id: number;
  userId: number;
  images: GalleryImage[];
}

export interface LocationStore {
  country: LocationItem | null;
  city: LocationItem | null;
  region: LocationItem | null;
}

export type UserSettings = LocationStore & {
  username: string | null;
  avatar: string | null;
  description: string | null;
  gallery: GalleryLocal;
  interests: number[] | null;
  gender: number | null;
  targetGender: Set<number> | null;
};

interface LocationItem {
  id: string;
  value: {
    selected: boolean;
    name: string;
    nameLocale: string;
  };
}

export const useUserSettingsStore = defineStore("userSettings", () => {
  const { $api } = useNuxtApp();

  const state = ref<UserSettings>({
    username: null,
    avatar: null,
    description: null,
    gallery: {
      id: -1,
      userId: -1,
      images: Array(5)
        .fill("")
        .map((img: string) => ({
          type: "base64" as "base64",
          src: img,
          blob: null,
        })),
    },
    interests: null,
    gender: null,
    targetGender: new Set<number>(),
    city: null,
    country: null,
    region: null,
  });
  $api.auth.verifyLogin().then((res) => {
    const {
      avatar,
      description,
      gallery,
      username,
      interests,
      gender,
      targetGender,
      city,
      country,
      region,
    } = isSuccess(res)
      ? {
          ...res.data.user,
          gallery: res.data.user.gallery
            ? {
                id: res.data.user.gallery.id,
                userId: res.data.user.gallery.userId,
                images: res.data.user.gallery.images.map((img) => ({
                  type: "storageImg" as 'storageImg',
                  src: img,
                })),
              }
            : ({
                id: -1,
                userId: -1,
                images: Array(5)
                  .fill("")
                  .map((img: string) => ({
                    type: "base64" as "base64", //lol
                    src: img,
                    blob: null,
                  })),
              } as GalleryLocal),
        }
      : {
          avatar: null,
          description: null,
          gallery: {
            id: -1,
            userId: -1,
            images: Array(5)
              .fill("")
              .map((img: string) => ({
                type: "base64" as "base64", //lol
                src: img,
                blob: null,
              })),
          },
          username: null,
          interests: null,
          gender: null,
          targetGender: new Set<number>(),
          city: null,
          country: null,
          region: null,
        };
    actions.setState({
      avatar,
      description,
      gallery: gallery?.id
        ? {
            id: gallery.id,
            userId: gallery.userId,
            images: gallery.images,
          }
        : {
            id: -1,
            userId: -1,
            images: Array(5)
              .fill("")
              .map((img) => ({
                type: "base64",
                src: img,
                blob: null,
              })),
          },
      username,
      interests: interests?.map((int) => int.id) ?? [],
      gender,
      targetGender: new Set<number>(targetGender),
      region: region
        ? {
            id: (country as Location).id.toString(),
            value: {
              name: (country as Location).name,
              nameLocale: (country as Location).nameRUS,
              selected: true,
            },
          }
        : null,
      country: country
        ? {
            id: (country as Location).id.toString(),
            value: {
              name: (country as Location).name,
              nameLocale: (country as Location).nameRUS,
              selected: true,
            },
          }
        : null,
      city: city
        ? {
            id: (city as Location).id.toString(),
            value: {
              name: (city as Location).name,
              nameLocale: (city as Location).nameRUS,
              selected: true,
            },
          }
        : null,
    });
  });

  const getters = {
    getDescription() {
      console.log(state.value.description);
      return state.value.description;
    },
    getGallery() {
      return state.value.gallery;
    },
    getGender() {
      return state.value.gender;
    },
    getTargetGenders() {
      return state.value.targetGender;
    },
  };

  const actions = {
    setState(settings: UserSettings) {
      state.value = settings;
    },
    setUserName(username: string) {
      state.value.username = username;
    },

    setAvatar(avatar: string) {
      state.value.avatar = avatar;
    },
    setDescription(description: string) {
      console.log(description);
      state.value.description = description;
    },

    setGallery(gallery: GalleryLocal) {
      state.value.gallery = gallery;
    },

    setInterests(interests: Interest[]) {
      state.value.interests = interests.map((int) => int.id);
    },

    setGender(gender: 0 | 1 | 2) {
      state.value.gender = gender;
    },

    addTargetGender(gender: 0 | 1 | 2) {
      state.value.targetGender?.add(gender);
    },
    removeTargetGender(gender: 0 | 1 | 2) {
      state.value.targetGender?.delete(gender);
    },

    setCountry(country: LocationItem | null) {
      state.value.country = country;
    },
    setCity(city: LocationItem | null) {
      state.value.city = city;
    },
    setRegion(region: LocationItem | null) {
      state.value.region = region;
    },

    async updateSettings() {
      const { $api } = useNuxtApp();
      await $api.user.updateUser(state.value);
    },
  };

  return { state, getters, actions };
});
