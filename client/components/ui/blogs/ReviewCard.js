import Image from "next/image";

const ReviewCard = ({ review }) => {
    return (
        <>
            <div className="w-full h-full px-5 py-4 rounded-lg border border-zinc-200 justify-start items-start gap-4 inline-flex">
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
            </div>
        </>
    );
};

export default ReviewCard;
