import axios, { AxiosInstance } from "axios";

export default class Overpass {
  instance: AxiosInstance;
  apiURL: string;
  constructor(instance: AxiosInstance) {
    this.instance = instance;
    this.apiURL = "https://www.overpass-api.de/api/interpreter?";
  }

  async getCountries() {
    const res = await axios.post(
      this.apiURL,
      `[out:json];relation["admin_level"="2"][boundary=administrative][type!=multilinestring];out;`
    );
    const answer = res.data;
    return answer;
  }

  async getRegions(countryCode: string) {
    const res = await axios.post(
      this.apiURL,
      `[timeout:900][out:json];
      area["ISO3166-1:numeric"="${countryCode}"]["admin_level"="2"];(rel(area)["admin_level"="4"];);
      out;`
    );
    const answer = res.data;
    return answer;
  }

  async getCitiesByRegion(regionCode: string, countryCode?: string) {
    const res = await axios.post(
      this.apiURL,
      // `[timeout:900][out:json];area['ISO3166-1:numeric'='${countryCode}']['admin_level'='4']['name'='${regionCode}'];
      // (relation['admin_level'='8'](area););`
      `data=[out:json];area["ISO3166-2"="${regionCode}"]->.a1;(nwr[place="city"](area.a1););out body;`
    );
    const answer = res.data;
    return answer;
  }

  async getCities(countryCode: string) {
    const res = await axios.post(
      this.apiURL,
      `data=[out:json];area["ISO3166-1:numeric"="${countryCode}"]->.a1;(nwr[place="city"](area.a1););out body;`
    );
    const answer = res.data;
    return answer;
  }

  async getCity(id?: string) {
    const res = await axios.post(
      this.apiURL,
      `[out:json][timeout:25];
      node(${id});
      out body;`
    );
    const answer = res.data;
    return answer;
  }

  async getCityByNumeric(code: string) {
    const res = await axios.post(
      this.apiURL,
      `[out:json];rel[admin_level=1]["ISO3166-1:numeric"~"^${code}-"];out;`
    );
    const answer = res.data;
    return answer;
  }

  getCountryByNumeric(code: string) {}
}
