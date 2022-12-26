import FourSquareSDK from 'api';
import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';
import { resourceLimits } from 'worker_threads';

const fourSquareApi = FourSquareSDK(process.env.FOURSQUARE_DEV_ID as string);

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: nodeFetch,
} as any);

export default class CoffeeStoresApi {
  static async fetchCoffeeStores(): Promise<Array<any>> {
    try {
      fourSquareApi.auth(process.env.FOURSQUARE_API_KEY as string);
      const { data: fourSquareApiData } = await fourSquareApi
        .placeSearch({ query: 'coffee', ll: '43.65910%2C-79.48215', limit: '6' });
      const photos = await CoffeeStoresApi.fetchCoffeeStorePhotos();
      const fourSquareApiDataWithPhotos = fourSquareApiData?.results.map((r: any, index: number) => {
        return {
          id: r.fsq_id,
          address: r.location.address,
          name: r.name,
          neighborhood: r?.location?.neighborhood?.length > 0 ? r?.location?.neighborhood[0] : '',
          imgUrl: photos[index]
        }
      });
      return fourSquareApiDataWithPhotos;
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
      return data || {};
    } catch (error) {
      console.log('Error in CoffeeStoresApi.fetchCoffeeStoreByFSQID');
      console.log(error);
      return [];
    }
  }

  static async fetchCoffeeStorePhotos(): Promise<Array<any>> {
    try {
      const photos = await unsplash.search.getPhotos({
        query: 'coffee shop',
        page: 1,
        perPage: 30,
      }) as any;
      const unsplashResults = photos?.response?.results ?? [];
      const unsplashUrls = unsplashResults.map((r: any) => r?.urls['small']);
      return unsplashUrls;
    } catch (error) {
      console.log('Error in CoffeeStoresApi.CoffeeStorePhotos');
      console.log(error);
      return [];
    }
  }
}