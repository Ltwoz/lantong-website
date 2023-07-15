import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";

const BannerSlider = () => {
    return (
        <>
            <Splide
                className="mb-4"
                hasTrack={false}
                options={{
                    perPage: 1,
                    flickPower: 100,
                    type: "loop",
                }}
            >
                <SplideTrack>
                    <SplideSlide>
                        <div className="w-full max-h-[700px] aspect-[16/6] relative flex items-center">
                            <Image
                                alt="property-image"
                                src={`https://dummyimage.com/1920x700`}
                                unoptimized
                                draggable="false"
                                fill
                                className="select-none object-cover"
                            />
                        </div>
                    </SplideSlide>
                </SplideTrack>
            </Splide>
        </>
    );
};

export default BannerSlider;
