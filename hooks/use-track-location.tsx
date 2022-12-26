import { useContext, useState } from "react";
import { ACTION_TYPES, StoreContext } from "../pages/_app";

interface UseTrackLocation {
  isGeoLocating: boolean;
  latLong: string;
  handleTrackLocation: () => void;
  locationErrorMsg: string;
}

const useTrackLocation = (): UseTrackLocation => {

  const [locationErrorMsg, setLocationErrorMsg] = useState<string>('');
  // const [latLong, setLatLong] = useState<string>('');
  const [isGeoLocating, setisGeoLocating] = useState<boolean>(false);
  
  const { dispatch } = useContext(StoreContext);


  const success = (position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // setLatLong(`${latitude},${longitude}`);
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: {
        latLong: `${latitude},${longitude}`
      },
    });
    setLocationErrorMsg('');
    setisGeoLocating(false);
  };

  const error = () => {
    setisGeoLocating(false);
    setLocationErrorMsg('Unable to retrieve your location');
  };

  const handleTrackLocation = () => {
    setisGeoLocating(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg('Geolocation is not supported by your browser');
      setisGeoLocating(false);
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    isGeoLocating,
    // latLong,
    handleTrackLocation,
    locationErrorMsg
  };
};

export default useTrackLocation;