import instanceApi from "@/config/axios-config";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const BannerSlider = () => {
    // Get State
    const [allBanners, setAllBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await instanceApi.get(
                `/api/banners`
            );
            setAllBanners(data?.banners);
            setLoading(false);
        };

        getProducts().catch(() => {
            console.error;
            setLoading(false);
        });
    }, []);

    return (
        <>
            <Splide
                className=""
                hasTrack={false}
                options={{
                    perPage: 1,
                    flickPower: 100,
                    type: "loop",
                    autoplay: true,
                    pagination: false,
                }}
            >
                <SplideTrack>
                    {loading ? (
                        <>
                            <div className="w-full max-h-[700px] h-full aspect-[16/6]" />
                        </>
                    ) : allBanners.length > 0 ? (
                        allBanners?.map((banner) => (
                            <SplideSlide key={banner.public_id}>
                                <div className="w-full max-h-[700px] aspect-[16/6] relative flex items-center">
                                    <Image
                                        alt="property-image"
                                        src={banner.url}
                                        draggable="false"
                                        fill
                                        className="select-none object-cover"
                                    />
                                    {banner.isOverlay && (
                                        <div className="absolute z-[1] inset-0 w-full h-full overflow-hidden bg-black/50" />
                                    )}
                                    {(banner.label || banner.description) && (
                                        <div className="absolute left-0 right-0 mx-auto flex flex-col text-center w-[80%] xl:max-w-[1200px] text-white z-[2]">
                                            {banner.label && (
                                                <h2 className="font-semibold text-sm md:text-lg xl:text-[64px] xl:leading-relaxed mb-1">
                                                    {banner.label}
                                                </h2>
                                            )}
                                            {banner.description && (
                                                <p className="font-semibold text-xs md:text-base xl:text-[32px]  xl:leading-relaxed">
                                                    {banner.description}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </SplideSlide>
                        ))
                    ) : (
                        <div className="w-full max-h-[700px] aspect-[16/6] relative flex items-center">
                            <Image
                                alt="property-image"
                                src={`https://dummyimage.com/1920x700`}
                                draggable="false"
                                fill
                                unoptimized
                                className="select-none object-cover"
                            />
                        </div>
                    )}
                </SplideTrack>
            </Splide>
        </>
    );
};

export default BannerSlider;
