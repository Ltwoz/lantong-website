export function getCoordinatesFromMapsUrl(url) {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const matches = url?.match(regex);
    if (matches && matches.length >= 3) {
        const lat = parseFloat(matches[1]);
        const lng = parseFloat(matches[2]);
        return { lat, lng };
    }
    return null;
}
