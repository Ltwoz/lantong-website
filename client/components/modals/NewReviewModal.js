import { useState } from "react";
import ModalLayout from "./modal-layout";

const NewReviewModal = (props) => {
    const { setIsOpen, handler } = props;
    const { rating, setRating, comment, setComment } = props.state;

    const [hover, setHover] = useState(0);

    return (
        <ModalLayout setIsOpen={setIsOpen}>
            <div className="w-[95vw] md:w-[24rem] flex flex-col items-center justify-between select-none divide-y">
                <div className="w-full px-5 py-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">เพิ่มรีวิว</h2>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center font-medium text-black py-2 rounded-md transition-all hover:scale-125"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <form
                    autoComplete="off"
                    className="px-5 py-4 w-full grid grid-cols-3 gap-4"
                >
                    <div className="col-span-3 flex justify-center">
                        {[...Array(5)].map((star, index) => {
                            index += 1;
                            return (
                                <button
                                    type="button"
                                    key={index}
                                    className={`${
                                        index <= (hover || rating)
                                            ? "text-[#F2DD1F]"
                                            : "text-zinc-200"
                                    } overflow-hidden px-1`}
                                    onClick={() => setRating(index)}
                                    onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(rating)}
                                >
                                    <span className="text-4xl">&#9733;</span>
                                </button>
                            );
                        })}
                    </div>
                    <div className="col-span-3">
                        <label className="block text-sm font-medium tracking-wide">
                            คอมเมนท์
                        </label>
                        <textarea
                            type="text"
                            rows="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                        />
                    </div>
                </form>
                <div className="w-full px-5 py-4 flex items-center justify-end gap-x-4">
                    <button
                        type="button"
                        onClick={handler}
                        className="inline-flex items-center bg-primary rounded-md transition-all overflow-hidden"
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
                                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span className="block">เพิ่ม</span>
                        </div>
                    </button>
                </div>
            </div>
        </ModalLayout>
    );
};

export default NewReviewModal;
