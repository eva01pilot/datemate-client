import { AxiosInstance } from "axios";
import { LocationStore, UserSettings } from "~/store/user-settings";

export default class User {
  instance: AxiosInstance;
  constructor(instance: AxiosInstance) {
    this.instance = instance
  }

  async updateUser(userSettings: UserSettings){
    const response = await this.instance.post('/api/user/update', {
      ...userSettings,
      gallery: {
        images: userSettings.gallery.images.map(el=>el.type==='base64' ? el.blob : el.src)
      }
    })
    console.log(response)
  }
}