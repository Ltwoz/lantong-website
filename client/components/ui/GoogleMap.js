import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { useEffect, useState } from "react";

function getCoordinatesFromMapsUrl(url) {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const matches = url?.match(regex);
    if (matches && matches.length >= 3) {
        const lat = parseFloat(matches[1]);
        const lng = parseFloat(matches[2]);
        return { lat, lng };
    }
    return null;
}

export default function GoogleMapComponent({ url }) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    });

    const [coordinate, setCoordinate] = useState({
        lat: undefined,
        lng: undefined,
    });
    const [center, setCenter] = useState({
        lat: 18.788,
        lng: 98.985,
    });

    useEffect(() => {
        const coordinate = getCoordinatesFromMapsUrl(url);
        if (coordinate) {
            setCoordinate(coordinate);
            setCenter(coordinate);
        } else {
            console.log("Invalid input.");
        }
    }, [url]);

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>;
    }

    return (
        <>
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <GoogleMap
                        mapContainerClassName="w-full h-[400px] xl:h-[500px]"
                        center={center}
                        zoom={14}
                    >
                        {coordinate.lat && coordinate.lng ? (
                            <MarkerF position={coordinate} />
                        ) : null}
                    </GoogleMap>
                </>
            )}
        </>
    );
}
