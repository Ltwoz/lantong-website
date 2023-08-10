import Layout from "@/components/layouts/Layout";
import { ColorPicker } from "@/components/ui/ColorPicker";
import NoPermission from "@/components/ui/custom-pages/403";
import { useUser } from "@/contexts/user-context";
import Head from "next/head";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const WebsiteConfigPage = () => {
    // Website Config State
    const [config, setConfig] = useState({});

    // Config Details
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [facebookUrl, setFacebookUrl] = useState("");
    const [lineUrl, setLineUrl] = useState("");
    const [primaryColor, setPrimaryColor] = useState("");
    const [aboutBg, setAboutBg] = useState([]);
    const [aboutBgPreview, setAboutBgPreview] = useState([]);
    const [aboutDetail, setAboutDetail] = useState("");

    // CRUD State
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Toastify
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

    useEffect(() => {
        const getWebsiteConfig = async () => {
            const { data } = await instanceApi.get(
                `/api/website-config`
            );
            setConfig(data?.config);
            setLoading(false);
        };

        getWebsiteConfig().catch(() => {
            console.error;
            setLoading(false);
        });
    }, [isSuccess]);

    useEffect(() => {
        setTitle(config.website_title);
        setName(config.website_name);
        setDesc(config.website_desc);
        setFacebookUrl(config.social?.facebook_url);
        setLineUrl(config.social?.line_url);
        setPrimaryColor(config.style?.primary_color);
        setAboutBg(config.about_bg);
        setAboutBgPreview(config.about_bg);
        setAboutDetail(config.about_detail);
    }, [config])

    function handleUploadImage(e) {
        const files = Array.from(e.target.files);

        files.forEach((file) => {
            setAboutBg((old) => [...old, file]);

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAboutBgPreview((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });

        e.target.value = null;
    }

    function removeImage(index) {
        const filteredImagesPreview = aboutBgPreview.filter(
            (_, idx) => idx !== index
        );
        setAboutBgPreview(filteredImagesPreview);

        const newImages = [...aboutBg];
        newImages.splice(index, 1);
        setAboutBg(newImages);
    }

    const { user, isAuthenticated } = useUser();

    if (!user || user.role !== "admin" || !isAuthenticated) {
        return <NoPermission />;
    }

    return (
        <Layout isDashboard={true}>
            <Head>
                <title>จัดการเว็บไซต์ - หจก.ลานทองเชียงใหม่</title>
            </Head>
            {/* ชื่อหน้า */}
            <div className="w-full">
                <div
                    id="header"
                    className="flex flex-col md:flex-row gap-4 py-6 items-start md:items-center justify-between"
                >
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">จัดการเว็บไซต์</h2>
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
                            ข้อมูลทั่วไป
                        </h3>
                        <div className="grid grid-cols-4 gap-6 w-full md:w-2/3">
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    ชื่อเว็บไซต์
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    ชื่อร้านค้า
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    รายละเอียด
                                </label>
                                <input
                                    type="text"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    รูปเกี่ยวกับร้าน
                                </label>
                                <label
                                    htmlFor="dropzone-file"
                                    className={`flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 transition-all duration-300 ${
                                        aboutBg?.length > 0 ? "h-14" : "h-40"
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
                            {aboutBgPreview?.length > 0 && (
                                <div className="col-span-4">
                                    {aboutBgPreview?.map((image, i) => (
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
                                    เกี่ยวกับร้าน
                                </label>
                                <ReactQuill
                                    value={aboutDetail}
                                    onChange={(value) => setAboutDetail(value)}
                                    className="mt-1"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    Facebook URL
                                </label>
                                <input
                                    type="text"
                                    value={facebookUrl}
                                    onChange={(e) =>
                                        setFacebookUrl(e.target.value)
                                    }
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    Line URL
                                </label>
                                <input
                                    type="text"
                                    value={lineUrl}
                                    onChange={(e) => setLineUrl(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="w-full" />

                    <div
                        tag="form-sections"
                        className="flex flex-col md:flex-row w-full gap-6"
                    >
                        <h3 className="font-semibold w-full md:w-1/3">
                            การแสดงผล
                        </h3>
                        <div className="grid grid-cols-4 gap-6 w-full md:w-2/3">
                            <div className="col-span-4">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    สีหลัก ({primaryColor})
                                </label>
                                <div className="mt-1">
                                    <ColorPicker
                                        color={primaryColor}
                                        onChange={setPrimaryColor}
                                        type="hex"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="w-full" />

                    <div className="col-span-12 flex items-center justify-end gap-x-4">
                        <button
                            // onClick={submitForm}
                            // disabled={loading ? true : false}
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
                                    {/* {loading ? "กำลังสร้าง" : "แก้ไข"} */}
                                    แก้ไข
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default WebsiteConfigPage;
