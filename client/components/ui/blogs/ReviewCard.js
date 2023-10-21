import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import DeleteModal from "@/components/modals/delete-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instanceApi from "@/config/axios-config";
import { useUser } from "@/contexts/user-context";

const ReviewCard = ({ review, blogId, isDeleted, setIsDeleted }) => {
    const { user } = useUser();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [error, setError] = useState(null);

    // Toastify
    useEffect(() => {
        if (isDeleted) {
            toast.success("ลบคอมเมนท์แล้ว", {
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
    }, [error, isDeleted, setIsDeleted]);

    const deleteHandler = async (e) => {
        try {
            const { data } = await instanceApi.delete(
                `/api/blog/reviews?id=${review._id}&blogId=${blogId}`
            );

            setIsDeleted(data.success);
        } catch (error) {
            setError(error.message);
            console.error(error.message);
        }
    };

    return (
        <>
            <AnimatePresence>
                {showDeleteModal && (
                    <DeleteModal
                        title={`ลบคอมเมนท์ ?`}
                        message={"คอมเมนท์นี้จะหายไปจากเว็บไซต์"}
                        buttonLabel={"ตกลง, ลบเลย!"}
                        setIsOpen={setShowDeleteModal}
                        handler={deleteHandler}
                    />
                )}
            </AnimatePresence>
            <div className="w-full h-full px-5 py-4 rounded-lg border border-zinc-200 justify-start items-start gap-4 inline-flex relative">
                <div className="aspect-square w-7 h-7 relative overflow-hidden rounded-full">
                    <Image
                        alt="avatar"
                        src={`https://alumni.engineering.utoronto.ca/files/2022/05/Avatar-Placeholder-400x400-1.jpg`}
                        draggable="false"
                        fill
                        unoptimized
                        className="select-none object-cover"
                    />
                </div>
                <div className="flex-col justify-start items-start gap-2 inline-flex">
                    <div className="flex flex-row">
                        {[...Array(5)].map((star, index) => {
                            index += 1;
                            return (
                                <div
                                    key={index}
                                    className={`${
                                        index <= review.rating
                                            ? "text-[#F2DD1F]"
                                            : "text-zinc-200"
                                    } overflow-hidden pr-1`}
                                >
                                    <span className="text-3xl">&#9733;</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="text-black text-base font-normal leading-[30px]">
                        {review.comment}
                    </div>
                </div>
                {(review.user === user?._id || user?.role === "admin") && (
                    <button
                        type="button"
                        onClick={() => {
                            setShowDeleteModal((prev) => !prev);
                        }}
                        className="absolute right-4 inline-flex items-center font-medium text-red-600 py-2 rounded-md transition-all hover:scale-125"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </>
    );
};

export default ReviewCard;
