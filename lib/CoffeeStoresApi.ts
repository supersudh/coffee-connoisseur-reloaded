import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
} as any);

export default class CoffeeStoresApi {
  static async fetchCoffeeStores(latLong = '43.65910%2C-79.48215', limit = 6): Promise<Array<any>> {
    try {
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY
        }
      };
      const response = await fetch(
        `https://api.foursquare.com/v3/places/search?query=coffee&ll=${latLong}&limit=${limit}`,
        options as any
      );
      const fourSquareApiData = await response.json();
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

  // todo: (supersudh) Refactor
  // static async fetchCoffeeStoreByFSQID(fsq_id: string): Promise<any> {
  //   try {
  //     fourSquareApi.auth(process.env.FOURSQUARE_API_KEY as string);
  //     const { data } = await fourSquareApi.placeDetails({ fsq_id });
  //     return data || {};
  //   } catch (error) {
  //     console.log('Error in CoffeeStoresApi.fetchCoffeeStoreByFSQID');
  //     console.log(error);
  //     return [];
  //   }
  // }

  static async fetchCoffeeStorePhotos(): Promise<Array<any>> {
    try {
      const photos = await unsplash.search.getPhotos({
        query: 'coffee shop',
        page: 1,
        perPage: 40,
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