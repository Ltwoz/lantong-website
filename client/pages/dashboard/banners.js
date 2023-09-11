import Layout from "@/components/layouts/Layout";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instanceApi from "@/config/axios-config";
import NoPermission from "@/components/ui/custom-pages/403";
import { useUser } from "@/contexts/user-context";
import { AnimatePresence } from "framer-motion";
import DeleteModal from "@/components/modals/delete-modal";

const WebsiteCOnfigPage = ({ config }) => {
    // Post State
    const [label, setLabel] = useState("");
    const [description, setDescription] = useState("");
    const [isOverlay, setIsOverlay] = useState(false);
    const [banner, setBanner] = useState([]);
    const [bannerPreview, setBannerPreview] = useState([]);

    // Get State
    const [allBanners, setAllBanners] = useState([]);

    // CRUD State
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [createLoading, setCreateLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const [selectedBanner, setSelectedBanner] = useState({});

    // Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            toast.success("สร้างสำเร็จ", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setIsSuccess(false);
        }

        if (isDeleted) {
            toast.success("ลบสำเร็จ", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setIsDeleted(false);
        }

        if (error) {
            toast.error(error, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setError(null);
        }
    }, [isSuccess, error, isDeleted]);

    useEffect(() => {
        const getBanners = async () => {
            const { data } = await instanceApi.get(`/api/admin/banners`);
            setAllBanners(data?.banners);
            setLoading(false);
        };

        getBanners().catch(() => {
            console.error;
            setLoading(false);
        });
    }, [isSuccess, isDeleted]);

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
        formData.set("description", description);
        formData.set("isOverlay", isOverlay);
        banner.forEach((bannerItem) => {
            formData.append("banner", bannerItem);
        });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        try {
            setCreateLoading(true);

            const { data } = await instanceApi.post(
                `/api/admin/banner/new`,
                formData,
                config
            );

            setIsSuccess(data.success);
        } catch (error) {
            setError(error.message);
            console.error(error.message);
        } finally {
            setCreateLoading(false);
            setBanner([]);
            setBannerPreview([]);
        }
    }

    async function deleteHandler() {
        try {
            const { data } = await instanceApi.delete(
                `/api/admin/banner/${selectedBanner._id}`
            );

            setIsDeleted(data.success);
        } catch (error) {
            setError(error.message);
            console.error(error.message);
        }
    }

    const { user, isAuthenticated } = useUser();

    if (!user || user.role !== "admin" || !isAuthenticated) {
        return <NoPermission />;
    }

    return (
        <Layout isDashboard={true}>
            <Head>
                <title>จัดการแบนเนอร์ - {config.website_title}</title>
            </Head>
            {/* Modal */}
            <AnimatePresence>
                {showDeleteModal && (
                    <DeleteModal
                        title={`ลบแบนเนอร์นี้ ?`}
                        message={"แบนเนอร์นี้จะหายไปจากเว็บไซต์"}
                        buttonLabel={"ตกลง, ลบเลย!"}
                        setIsOpen={setShowDeleteModal}
                        handler={deleteHandler}
                    />
                )}
            </AnimatePresence>
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
                            สร้างแบนเนอร์
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
                                        disabled={createLoading ? true : false}
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
                                    หัวข้อ
                                </label>
                                <input
                                    type="text"
                                    value={label}
                                    onChange={(e) => setLabel(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    ข้อความ
                                </label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 flex items-center justify-between">
                                <div>
                                    <h4 className="text-xs md:text-sm font-semibold tracking-wide">
                                        ลดความสว่างของภาพ
                                    </h4>
                                    <p className="mt-2 text-xs md:text-sm text-gray-600">
                                        หาก
                                        <span className="text-green-500 font-semibold">
                                            เปิด
                                        </span>
                                        จะลดความสว่างของแบนเนอร์
                                    </p>
                                </div>
                                <label className="inline-flex relative items-center">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={isOverlay}
                                        readOnly
                                    />
                                    <div
                                        onClick={() => {
                                            setIsOverlay(!isOverlay);
                                        }}
                                        className="w-11 h-6 cursor-pointer bg-gray-300 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <hr className="w-full" />

                    <div className="col-span-12 flex items-center justify-end gap-x-4">
                        <button
                            onClick={submitForm}
                            disabled={createLoading ? true : false}
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
                                    {createLoading
                                        ? "กำลังสร้าง"
                                        : "สร้างแบนเนอร์"}
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
                    <div className="grid grid-cols-4 w-full gap-6">
                        {allBanners.length > 0 &&
                            allBanners?.map((banner, i) => (
                                <div
                                    key={i}
                                    className="col-span-4 w-full aspect-[16/6] relative flex items-center rounded-lg overflow-hidden"
                                >
                                    <Image
                                        alt={"banner_image"}
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
                                                <p className="font-semibold text-xs md:text-base xl:text-[32px] xl:leading-relaxed">
                                                    {banner.description}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                    {/* Delete button */}
                                    <div className="flex absolute top-4 right-4 z-[1]">
                                        <button
                                            onClick={() => {
                                                setSelectedBanner(banner);
                                                setShowDeleteModal(
                                                    (prev) => !prev
                                                );
                                            }}
                                            className="bg-white text-red-600 transition-all border border-transparent hover:border-red-600 rounded-xl p-1"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                className="w-6 h-6"
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
                </div>
            </section>
        </Layout>
    );
};

export default WebsiteCOnfigPage;

export { getServerSideProps } from "@/utils/get-init-props";
