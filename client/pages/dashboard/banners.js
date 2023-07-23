import Layout from "@/components/layouts/Layout";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const WebsiteCOnfigPage = () => {
    const [label, setLabel] = useState("");
    const [banner, setBanner] = useState([]);
    const [bannerPreview, setBannerPreview] = useState([]);

    // CRUD State
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            toast.success("สร้างสำเร็จ", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setIsSuccess(false);
        }

        if (error) {
            toast.error(error, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setError(null);
        }
    }, [isSuccess, error]);

    function handleUploadImage(e) {
        const files = Array.from(e.target.files);

        files.forEach((file) => {
            setBanner([file]);

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setBannerPreview([reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });

        e.target.value = null;
    }

    function removeImage(index) {
        const filteredImagesPreview = bannerPreview.filter(
            (_, idx) => idx !== index
        );
        setBannerPreview(filteredImagesPreview);

        const newImages = [...banner];
        newImages.splice(index, 1);
        setBanner(newImages);
    }

    async function submitForm(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.set("label", label);
        banner.forEach((bannerItem) => {
            formData.append("banner", bannerItem);
        });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        try {
            setLoading(true);

            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_PATH}/api/admin/banner/new`,
                formData,
                config
            );

            setIsSuccess(data.success);
        } catch (error) {
            setError(error.message);
            console.error(error.message);
        } finally {
            setLoading(false);
            setBanner([]);
            setBannerPreview([]);
        }
    }

    return (
        <Layout isDashboard={true}>
            <Head>
                <title>จัดการแบนเนอร์ - หจก.ลานทองเชียงใหม่</title>
            </Head>
            {/* ชื่อหน้า */}
            <div className="w-full">
                <div
                    id="header"
                    className="flex flex-col md:flex-row gap-4 py-6 items-start md:items-center justify-between"
                >
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">จัดการแบนเนอร์</h2>
                    </div>
                </div>
            </div>
            {/* Form สร้างแบนเนอร์ */}
            <section
                id="create-banner"
                className="w-full mb-6 flex flex-col gap-4"
            >
                <div className="flex flex-col w-full bg-white border rounded-md gap-4 md:gap-6 p-4 md:p-6">
                    <div
                        tag="form-sections"
                        className="flex flex-col md:flex-row w-full gap-6"
                    >
                        <h3 className="font-semibold w-full md:w-1/3">
                            รูปภาพ
                        </h3>
                        <div className="grid grid-cols-4 gap-6 w-full md:w-2/3">
                            <div className="col-span-4">
                                <label
                                    htmlFor="dropzone-file"
                                    className={`flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 transition-all duration-300 ${
                                        bannerPreview?.length > 0
                                            ? "h-14"
                                            : "h-40"
                                    }`}
                                >
                                    <span className="flex items-center space-x-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-gray-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            />
                                        </svg>
                                        <span className="font-medium text-gray-600">
                                            คลิ๊กเพื่ออัพโหลดรูปภาพ
                                        </span>
                                    </span>
                                    <input
                                        id="dropzone-file"
                                        type="file"
                                        accept=".jpeg, .jpg, .png"
                                        onChange={handleUploadImage}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {bannerPreview?.length > 0 && (
                                <div className="col-span-4">
                                    {bannerPreview?.map((image, i) => (
                                        <div
                                            key={i}
                                            className="w-full aspect-[16/6] relative flex items-center rounded-lg overflow-hidden"
                                        >
                                            <Image
                                                alt={"preview_image"}
                                                src={
                                                    image.url
                                                        ? image.url
                                                        : image
                                                }
                                                draggable="false"
                                                fill
                                                className="select-none object-cover"
                                            />
                                            <div className="flex absolute top-1 right-1 z-[1]">
                                                <button
                                                    onClick={() =>
                                                        removeImage(i)
                                                    }
                                                    className="bg-white text-red-600 transition-all border border-transparent hover:border-red-600 rounded-lg p-1"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        className="w-4 h-4 md:w-5 md:h-5"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="col-span-4">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    ข้อความ
                                </label>
                                <input
                                    type="text"
                                    value={label}
                                    onChange={(e) => setLabel(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="w-full" />

                    <div className="col-span-12 flex items-center justify-end gap-x-4">
                        <button
                            onClick={submitForm}
                            disabled={loading ? true : false}
                            className="inline-flex items-center bg-[#12A53B] disabled:bg-gray-400 rounded-md transition-all overflow-hidden disabled:cursor-not-allowed"
                        >
                            <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>
                                <span className="block">
                                    {loading ? "กำลังสร้าง" : "สร้างแบนเนอร์"}
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            {/* แบนเนอร์ทั้งหมด */}
            <section
                id="all-banners"
                className="w-full mb-6 flex flex-col gap-4"
            >
                <div className="flex flex-col w-full bg-white border rounded-md gap-4 md:gap-6 p-4 md:p-6">
                    <div className="flex flex-col md:flex-row w-full gap-6">
                        {/*  */}
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default WebsiteCOnfigPage;
