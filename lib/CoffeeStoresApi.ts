import FourSquareSDK from 'api';
import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';

const fourSquareApi = FourSquareSDK(process.env.FOURSQUARE_DEV_ID as string);

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: nodeFetch,
} as any);

export default class CoffeeStoresApi {
  static async fetchCoffeeStores(): Promise<any> {
    try {
      fourSquareApi.auth(process.env.FOURSQUARE_API_KEY as string);
      const { data } = await fourSquareApi
        .placeSearch({ query: 'coffee', ll: '43.65910%2C-79.48215', limit: '6' });
      return data.results || [];
    } catch (error) {
      console.log('Error in CoffeeStoresApi.fetchCoffeeStores');
      console.log(error);
      return [];
    }
  }
  
  static async fetchCoffeeStoreByFSQID(fsq_id: string): Promise<any> {
    try {
      fourSquareApi.auth(process.env.FOURSQUARE_API_KEY as string);
      const { data } = await fourSquareApi.placeDetails({ fsq_id });
      return data;
    } catch (error) {
      console.log('Error in CoffeeStoresApi.fetchCoffeeStoreByFSQID');
      console.log(error);
      return [];
    }
  }
}