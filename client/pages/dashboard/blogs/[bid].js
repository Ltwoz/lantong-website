import Layout from "@/components/layouts/Layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instanceApi from "@/config/axios-config";
import { useUser } from "@/contexts/user-context";
import NoPermission from "@/components/ui/custom-pages/403";
import { z } from "zod";
import { useRouter } from "next/router";
import { withInitProps } from "@/utils/get-init-props";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const EditBlogPage = ({ id }) => {
    const router = useRouter();

    const [blog, setBlog] = useState({});

    // State ของ Product
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [address, setAddress] = useState("");
    const [mapUrl, setMapUrl] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const [isActive, setIsActive] = useState(true);

    // CRUD State
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const validateSchema = z.object({
        name: z.string().min(1, { message: "ใส่ชื่อเรื่อง" }),
        description: z.string().min(1, { message: "ใส่เนื้อหา" }),
        category: z.string().min(1, { message: "ใส่หมวดหมู่" }),
        address: z.string().min(1, { message: "ใส่ที่อยู่" }),
    });

    // Toastify
    useEffect(() => {
        if (isSuccess) {
            toast.success("แก้ไขสำเร็จ", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setIsSuccess(false);
            router.replace(`/dashboard/blogs/${id}`);
        }

        if (error) {
            toast.error(error, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setError(null);
        }
    }, [isSuccess, error, router, id]);

    // Fetch Blog
    useEffect(() => {
        const getBlogById = async () => {
            const { data } = await instanceApi.get(`/api/blog/${id}`);
            setBlog(data?.blog);
            setLoading(false);
        };

        getBlogById().catch(() => {
            console.error;
            setLoading(false);
        });
    }, [id]);

    useEffect(() => {
        setName(blog.name);
        setDescription(blog.description);
        setCategory(blog.category);
        setAddress(blog.address);
        setMapUrl(blog.google_map);
        setPhoneNo(blog.phone_no);
        setImages(blog.images);
        setImagesPreview(blog.images);
        setIsActive(blog.isActive);
    }, [blog]);

    function handleUploadImage(e) {
        const files = Array.from(e.target.files);

        files.forEach((file) => {
            setFiles((old) => [...old, file]);

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });

        e.target.value = null;
    }

    function removeImage(index) {
        const filteredImagesPreview = imagesPreview.filter(
            (_, idx) => idx !== index
        );
        setImagesPreview(filteredImagesPreview);

        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);

        const newFiles = [...files];
        newFiles.splice(index - images.length, 1);
        setFiles(newFiles);
    }

    async function submitForm(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.set("name", name);
        formData.set("description", description);
        formData.set("category", category);
        formData.set("address", address);
        formData.set("phone_no", phoneNo);
        formData.set("google_map", mapUrl);
        formData.set("isActive", isActive);

        images.forEach((image) => {
            formData.append("images[]", JSON.stringify(image));
        });
        files.forEach((file) => {
            formData.append("files", file);
        });

        const data = Object.fromEntries(formData);

        const validatedForm = validateSchema.safeParse(data);

        if (!validatedForm.success) {
            validatedForm.error.issues.map((err) => {
                toast.error(err.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            });
            return false;
        }

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        try {
            setLoading(true);

            const { data } = await instanceApi.put(
                `/api/admin/blog/${id}`,
                formData,
                config
            );

            setIsSuccess(data.success);
        } catch (error) {
            setError(error.message);
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const { user, isAuthenticated } = useUser();

    if (!user || user.role !== "admin" || !isAuthenticated) {
        return <NoPermission />;
    }

    return (
        <Layout isDashboard={true}>
            <Head>
                <title>แก้ไขรีวิว - หจก.ลานทองเชียงใหม่</title>
            </Head>
            {/* ชื่อหน้า */}
            <div className="w-full">
                <div
                    id="header"
                    className="flex flex-col md:flex-row gap-4 py-6 items-start md:items-center justify-between"
                >
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">แก้ไขรีวิว</h2>
                    </div>
                </div>
            </div>
            {/* Form แก้ไขรีวิว */}
            <section id="main" className="w-full mb-6 flex flex-col gap-4">
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
                                    ชื่อเรื่อง
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-medium tracking-wide">
                                    หมวดหมู่
                                </label>
                                <input
                                    type="text"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-medium tracking-wide">
                                    เบอร์โทรศัพท์
                                </label>
                                <input
                                    type="text"
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4">
                                <label className="block text-xs md:text-sm font-medium tracking-wide">
                                    ที่อยู่
                                </label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4">
                                <label className="block text-xs md:text-sm font-medium tracking-wide">
                                    Google Map URL
                                </label>
                                <input
                                    type="url"
                                    value={mapUrl}
                                    onChange={(e) => setMapUrl(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                                <label className="block text-indigo-800 text-xs md:text-sm font-medium tracking-wide mt-1">
                                    *ต้องมีเลขตำแหน่ง เช่น{" "}
                                    <span className="font-bold break-words">
                                        https://www.google.com/maps/@18.7685198,98.9727598,15z
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <hr className="w-full" />

                    <div
                        tag="form-sections"
                        className="flex flex-col md:flex-row w-full gap-6"
                    >
                        <h3 className="font-semibold w-full md:w-1/3">
                            รายละเอียด
                        </h3>
                        <div className="grid grid-cols-4 gap-6 w-full md:w-2/3">
                            <div className="col-span-4">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    เนื้อหา
                                </label>
                                <ReactQuill
                                    value={description}
                                    onChange={(value) => setDescription(value)}
                                    className="mt-1"
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
                            รูปภาพ
                        </h3>
                        <div className="grid grid-cols-4 gap-6 w-full md:w-2/3">
                            <div className="col-span-4">
                                <label
                                    htmlFor="dropzone-file"
                                    className={`flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 transition-all duration-300 ${
                                        imagesPreview?.length > 0
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
                                        accept=".jpeg, .jpg, .png, .mp4"
                                        multiple
                                        onChange={handleUploadImage}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {imagesPreview?.length > 0 && (
                                <div className="col-span-4">
                                    <p className="mt-1 text-sm text-gray-600 mb-4">
                                        ทั้งหมด{" "}
                                        <span className="font-semibold">
                                            {images.length}
                                        </span>{" "}
                                        ไฟล์
                                    </p>

                                    <hr className="w-full mb-4" />

                                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 overflow-hidden">
                                        {imagesPreview?.map((image, i) => (
                                            <>
                                                {image.url ? (
                                                    image.url.includes(
                                                        "images"
                                                    ) ? (
                                                        <div className="w-full aspect-video relative flex items-center rounded-lg overflow-hidden col-span-2">
                                                            <Image
                                                                alt={
                                                                    "preview_image"
                                                                }
                                                                src={image.url}
                                                                draggable="false"
                                                                fill
                                                                className="select-none object-cover"
                                                            />
                                                            <div className="flex absolute top-1 right-1 z-[1]">
                                                                <button
                                                                    onClick={() =>
                                                                        removeImage(
                                                                            i
                                                                        )
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
                                                    ) : (
                                                        <div className="w-full aspect-video relative flex items-center rounded-lg overflow-hidden col-span-2">
                                                            <video
                                                                className="w-full h-full"
                                                                controls
                                                            >
                                                                <source
                                                                    src={
                                                                        image.url
                                                                    }
                                                                    type="video/mp4"
                                                                />
                                                                Your browser
                                                                does not support
                                                                the video tag.
                                                            </video>
                                                            <div className="flex absolute top-1 right-1 z-[1]">
                                                                <button
                                                                    onClick={() =>
                                                                        removeImage(
                                                                            i
                                                                        )
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
                                                    )
                                                ) : files[
                                                      i - images.length
                                                  ].type.startsWith("image") ? (
                                                    <div className="w-full aspect-video relative flex items-center rounded-lg overflow-hidden col-span-2">
                                                        <Image
                                                            alt={
                                                                "preview_image"
                                                            }
                                                            src={image}
                                                            draggable="false"
                                                            fill
                                                            className="select-none object-cover"
                                                        />
                                                        <div className="flex absolute top-1 right-1 z-[1]">
                                                            <button
                                                                onClick={() =>
                                                                    removeImage(
                                                                        i
                                                                    )
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
                                                ) : (
                                                    <div className="w-full aspect-video relative flex items-center rounded-lg overflow-hidden col-span-2">
                                                        <video
                                                            className="w-full h-full"
                                                            controls
                                                        >
                                                            <source
                                                                src={image}
                                                                type="video/mp4"
                                                            />
                                                            Your browser does
                                                            not support the
                                                            video tag.
                                                        </video>
                                                        <div className="flex absolute top-1 right-1 z-[1]">
                                                            <button
                                                                onClick={() =>
                                                                    removeImage(
                                                                        i
                                                                    )
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
                                                )}
                                            </>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <hr className="w-full" />

                    <div
                        tag="form-sections"
                        className="flex flex-col md:flex-row w-full gap-6"
                    >
                        <h3 className="font-semibold w-full md:w-1/3">
                            ตั้งค่ารีวิว
                        </h3>
                        <div className="grid grid-cols-4 gap-6 w-full md:w-2/3">
                            <div className="col-span-4 flex items-center justify-between">
                                <div>
                                    <h4 className="text-xs md:text-sm font-semibold tracking-wide">
                                        แสดงรีวิว
                                    </h4>
                                    <p className="mt-2 text-xs md:text-sm text-gray-600">
                                        หาก
                                        <span className="text-red-500 font-semibold">
                                            ปิด
                                        </span>
                                        รีวิวจะไม่แสดงบนเว็บไซต์
                                    </p>
                                </div>
                                <label className="inline-flex relative items-center">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={isActive}
                                        readOnly
                                    />
                                    <div
                                        onClick={() => {
                                            setIsActive(!isActive);
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
                                    {loading ? "กำลังแก้ไข" : "แก้ไขรีวิว"}
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default EditBlogPage;

export const getServerSideProps = withInitProps(async (ctx) => {
    const id = ctx.params.bid;

    return {
        props: {
            id,
        },
    };
});
