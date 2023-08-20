import { useEffect, useState } from "react";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import instanceApi from "@/config/axios-config";
import FeaturedBlogCard from "../blogs/FeaturedBlogCard";

const FeaturedBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let link = `/api/blogs?isActive=true`;

        const getBlogs = async () => {
            const { data } = await instanceApi.get(`${link}`);
            setBlogs(data?.blogs);
            setLoading(false);
        };

        getBlogs().catch(() => {
            console.error;
            setLoading(false);
        });
    }, []);

    return (
        <div className="flex flex-col w-full">
            {/* Grid รายการ */}
            {blogs?.length < 1 ? (
                <div className="flex items-center justify-center border-t min-h-[340.55px] xl:min-h-[360.77px]">
                    <p className="font-medium text-white">ไม่มีข้อมูลรายการ</p>
                </div>
            ) : (
                <Splide
                    className=""
                    hasTrack={false}
                    options={{
                        mediaQuery: "max",
                        perPage: 4,
                        gap: "1.5rem",
                        flickPower: 100,
                        arrows: true,
                        pagination: false,
                        breakpoints: {
                            768: {
                                gap: "1rem",
                                fixedWidth: "16rem",
                                focus: "center",
                            },
                        },
                    }}
                >
                    <SplideTrack>
                        {blogs?.map((blog) => (
                            <SplideSlide key={blog._id}>
                                <FeaturedBlogCard blog={blog} />
                            </SplideSlide>
                        ))}
                    </SplideTrack>
                </Splide>
            )}
        </div>
    );
};

export default FeaturedBlogs;
