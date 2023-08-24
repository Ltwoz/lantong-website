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

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const NewProductPage = () => {
    // State ของ Product
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [salePrice, setSalePrice] = useState();
    const [category, setCategory] = useState("");

    const [description, setDescription] = useState("");
    const [width, setWidth] = useState("");
    const [length, setLength] = useState("");
    const [height, setHeight] = useState("");
    const [weightAccept, setWeightAccept] = useState("");

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const [isActive, setIsActive] = useState(true);
    const [isFeatured, setIsFeatured] = useState(false);
    const [isPopular, setIsPopular] = useState(false);
    const [isGift, setIsGift] = useState(false);
    const [giftDetail, setGiftDetail] = useState("");
    const [isPromotion, setIsPromotion] = useState(false);
    const [promotionDetail, setPromotionDetail] = useState("");
    const [isOnSale, setIsOnSale] = useState(false);

    // State ของ Categories
    const [allCategories, setAllCategories] = useState([]);

    // CRUD State
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const validateSchema = z.object({
        productId: z.string().min(1, { message: "ใส่รหัสสินค้า" }),
        name: z.string().min(1, { message: "ใส่ชื่อสินค้า" }),
        description: z.string().min(1, { message: "ใส่รายละเอียด" }),
        price: z.string().min(1, { message: "ใส่ราคา" }),
    });

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

    // Fetch get all categories
    useEffect(() => {
        const getCategories = async () => {
            const { data } = await instanceApi.get(`/api/admin/categories`);
            setAllCategories(data?.categories);
            setCategory(data?.categories[0]?._id);
        };

        getCategories().catch(() => {
            console.error;
        });
    }, []);

    function handleUploadImage(e) {
        const files = Array.from(e.target.files);

        files.forEach((file) => {
            setImages((old) => [...old, file]);

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
    }

    async function submitForm(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.set("productId", productId);
        formData.set("name", name);
        formData.set("price", price);
        formData.set("salePrice", salePrice);
        formData.set("category", category);

        formData.set("description", description);
        formData.set("width", width);
        formData.set("length", length);
        formData.set("height", height);
        formData.set("weightAccept", weightAccept);

        formData.set("isActive", isActive);
        formData.set("isFeatured", isFeatured);
        formData.set("isPopular", isPopular);
        formData.set("isGift", isGift);
        formData.set("giftDetail", giftDetail);
        formData.set("isPromotion", isPromotion);
        formData.set("promotionDetail", promotionDetail);
        formData.set("isOnSale", isOnSale);

        images.forEach((image) => {
            formData.append("images", image);
        });

        const data = Object.fromEntries(formData);

        console.log(data);

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

            const { data } = await instanceApi.post(
                `/api/admin/product/new`,
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
                <title>สร้างสินค้า - หจก.ลานทองเชียงใหม่</title>
            </Head>
            {/* ชื่อหน้า */}
            <div className="w-full">
                <div
                    id="header"
                    className="flex flex-col md:flex-row gap-4 py-6 items-start md:items-center justify-between"
                >
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">สร้างสินค้า</h2>
                    </div>
                </div>
            </div>
            {/* Form สร้างสินค้า */}
            <section id="main" className="w-full mb-6 flex flex-col gap-4">
                <div
                    id="products-main"
                    className="flex flex-col w-full bg-white border rounded-md gap-4 md:gap-6 p-4 md:p-6"
                >
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
                                    รหัสสินค้า
                                </label>
                                <input
                                    type="text"
                                    value={productId}
                                    onChange={(e) =>
                                        setProductId(e.target.value)
                                    }
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    ชื่อสินค้า
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-1">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    ราคาปกติ
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-1">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    ราคาที่ลดแล้ว
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    value={salePrice}
                                    onChange={(e) =>
                                        setSalePrice(e.target.value)
                                    }
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-medium tracking-wide">
                                    หมวดหมู่
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                >
                                    {allCategories?.map((categoryItem) => (
                                        <option
                                            key={categoryItem._id}
                                            value={categoryItem._id}
                                        >
                                            {categoryItem.name}
                                        </option>
                                    ))}
                                </select>
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
                                    รายละเอียด
                                </label>
                                <ReactQuill
                                    value={description}
                                    onChange={(value) => setDescription(value)}
                                    className="mt-1"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    ความกว้าง
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    value={width}
                                    onChange={(e) => setWidth(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    ความยาว
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    value={length}
                                    onChange={(e) => setLength(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    ความสูง
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4 md:col-span-2">
                                <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                    น้ำหนักที่รับได้
                                </label>
                                <input
                                    type="number"
                                    min={0}
                                    value={weightAccept}
                                    onChange={(e) =>
                                        setWeightAccept(e.target.value)
                                    }
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
                                        accept=".jpeg, .jpg, .png"
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
                                            <div
                                                key={i}
                                                className="w-full aspect-square relative flex items-center rounded-lg overflow-hidden"
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
                            ตั้งค่าสินค้า
                        </h3>
                        <div className="grid grid-cols-4 gap-6 w-full md:w-2/3">
                            <div className="col-span-4 flex items-center justify-between">
                                <div>
                                    <h4 className="text-xs md:text-sm font-semibold tracking-wide">
                                        มีของแถม
                                    </h4>
                                    <p className="mt-2 text-xs md:text-sm text-gray-600">
                                        หาก
                                        <span className="text-green-500 font-semibold">
                                            เปิด
                                        </span>
                                        จะสามารถใส่ของแถมให้สินค้านี้ได้
                                    </p>
                                </div>
                                <label className="inline-flex relative items-center">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={isGift}
                                        readOnly
                                    />
                                    <div
                                        onClick={() => {
                                            setIsGift(!isGift);
                                        }}
                                        className="w-11 h-6 cursor-pointer bg-gray-300 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                                    />
                                </label>
                            </div>
                            {isGift && (
                                <div className="col-span-4 md:col-span-2">
                                    <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                        ของแถมที่ได้รับ
                                    </label>
                                    <input
                                        type="text"
                                        value={giftDetail}
                                        onChange={(e) =>
                                            setGiftDetail(e.target.value)
                                        }
                                        className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                    />
                                </div>
                            )}
                            <div className="col-span-4 flex items-center justify-between">
                                <div>
                                    <h4 className="text-xs md:text-sm font-semibold tracking-wide">
                                        มีโปรโมชั่น
                                    </h4>
                                    <p className="mt-2 text-xs md:text-sm text-gray-600">
                                        หาก
                                        <span className="text-green-500 font-semibold">
                                            เปิด
                                        </span>
                                        จะสามารถใส่โปรโมชั่นให้สินค้านี้ได้
                                    </p>
                                </div>
                                <label className="inline-flex relative items-center">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={isPromotion}
                                        readOnly
                                    />
                                    <div
                                        onClick={() => {
                                            setIsPromotion(!isPromotion);
                                        }}
                                        className="w-11 h-6 cursor-pointer bg-gray-300 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                                    />
                                </label>
                            </div>
                            {isPromotion && (
                                <div className="col-span-4 md:col-span-2">
                                    <label className="block text-xs md:text-sm font-semibold tracking-wide">
                                        โปรโมชั่นของสินค้า
                                    </label>
                                    <input
                                        type="text"
                                        value={promotionDetail}
                                        onChange={(e) =>
                                            setPromotionDetail(e.target.value)
                                        }
                                        className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                    />
                                </div>
                            )}
                            <div className="col-span-4 flex items-center justify-between">
                                <div>
                                    <h4 className="text-xs md:text-sm font-semibold tracking-wide">
                                        สินค้าแนะนำ
                                    </h4>
                                    <p className="mt-2 text-xs md:text-sm text-gray-600">
                                        หาก
                                        <span className="text-green-500 font-semibold">
                                            เปิด
                                        </span>
                                        จะแสดงสินค้านี้ในสินค้าแนะนำ
                                    </p>
                                </div>
                                <label className="inline-flex relative items-center">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={isFeatured}
                                        readOnly
                                    />
                                    <div
                                        onClick={() => {
                                            setIsFeatured(!isFeatured);
                                        }}
                                        className="w-11 h-6 cursor-pointer bg-gray-300 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                                    />
                                </label>
                            </div>
                            <div className="col-span-4 flex items-center justify-between">
                                <div>
                                    <h4 className="text-xs md:text-sm font-semibold tracking-wide">
                                        สินค้ายอดนิยม
                                    </h4>
                                    <p className="mt-2 text-xs md:text-sm text-gray-600">
                                        หาก
                                        <span className="text-green-500 font-semibold">
                                            เปิด
                                        </span>
                                        จะแสดงสินค้านี้ในสินค้ายอดนิยม
                                    </p>
                                </div>
                                <label className="inline-flex relative items-center">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={isPopular}
                                        readOnly
                                    />
                                    <div
                                        onClick={() => {
                                            setIsPopular(!isPopular);
                                        }}
                                        className="w-11 h-6 cursor-pointer bg-gray-300 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                                    />
                                </label>
                            </div>
                            <div className="col-span-4 flex items-center justify-between">
                                <div>
                                    <h4 className="text-xs md:text-sm font-semibold tracking-wide">
                                        ลดราคาสินค้า
                                    </h4>
                                    <p className="mt-2 text-xs md:text-sm text-gray-600">
                                        หาก
                                        <span className="text-green-500 font-semibold">
                                            เปิด
                                        </span>
                                        จะแสดงเป็นราคาสินค้าที่ลดแล้ว
                                    </p>
                                </div>
                                <label className="inline-flex relative items-center">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={isOnSale}
                                        readOnly
                                    />
                                    <div
                                        onClick={() => {
                                            setIsOnSale(!isOnSale);
                                        }}
                                        className="w-11 h-6 cursor-pointer bg-gray-300 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                                    />
                                </label>
                            </div>
                            <div className="col-span-4 flex items-center justify-between">
                                <div>
                                    <h4 className="text-xs md:text-sm font-semibold tracking-wide">
                                        แสดงสินค้า
                                    </h4>
                                    <p className="mt-2 text-xs md:text-sm text-gray-600">
                                        หาก
                                        <span className="text-red-500 font-semibold">
                                            ปิด
                                        </span>
                                        สินค้าจะไม่แสดงบนเว็บไซต์
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
                                    {loading ? "กำลังสร้าง" : "สร้างสินค้า"}
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default NewProductPage;

export { getServerSideProps } from "@/utils/get-init-props";
