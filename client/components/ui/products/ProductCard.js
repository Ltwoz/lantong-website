import Image from "next/image";
import Link from "next/link";

export default function ProductCard({product}) {
    return (
        <Link href={`/products/${product?.id}`}>
            <div className="w-full bg-white border rounded-lg overflow-hidden">
                <div className="w-full aspect-[9/7] relative flex items-center">
                    <div className="absolute z-[1] right-0 bottom-0 left-0 w-full h-[60%] overflow-hidden bg-gradient-to-t from-black/80 to-white/0 opacity-100" />
                    <Image
                        alt="property-image"
                        src={product?.images[0]?.url ? product?.images[0]?.url :`https://dummyimage.com/273x273`}
                        unoptimized
                        draggable="false"
                        fill
                        className="select-none object-cover"
                    />
                </div>
                <div className="p-4 flex flex-col space-y-3">
                    <h1
                        className="text-lg font-semibold overflow-hidden h-[56px]"
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {product?.name}
                    </h1>
                    <hr />
                    <div className="flex items-center justify-between">
                        <p className="font-semibold text-xl">#{product?.productId}</p>
                        <p className="font-semibold text-xl">{product?.price.toLocaleString()}฿</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
