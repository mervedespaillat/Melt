import { Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";
import './map.css'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { getShop, getShops } from "../../store/shops";


// default
const MeltMapWrapper=()=> {

  const { shopId } = useParams();
  console.log(shopId)
  const shop = useSelector(getShop(shopId));
  console.log(shop)
  const lat = shop.latitude;
  const lng = shop.longitude;
  const center = { lat: lat, lng: lng };
  const zoom = 10;

  const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY


    return (
        <div className="map">
       <Wrapper apiKey={key}>
         <MyMapComponent center={center} zoom={13} />
       </Wrapper>
         </div>
    )
}

export function MyMapComponent({ center, zoom }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
    });
    const marker = new window.google.maps.Marker({position: center, map: map})
  },[center, zoom]);

  return <div ref={mapRef} className="map" />;
}

export default MeltMapWrapper