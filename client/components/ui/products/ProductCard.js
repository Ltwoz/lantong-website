import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product?._id}`}>
      <div className="w-full bg-white border rounded-lg overflow-hidden">
        <div className="w-full aspect-[9/7] relative flex items-center">
          <div className="absolute z-[1] right-0 bottom-0 left-0 w-full h-[60%] overflow-hidden bg-gradient-to-t from-black/80 to-white/0 opacity-100" />
          {product.images[0]?.url.includes("videos") ? (
            <video className="h-full object-cover pointer-events-none">
              <source src={product?.images[0]?.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              alt="property-image"
              src={
                product?.images[0]?.url
                  ? product?.images[0]?.url
                  : `https://dummyimage.com/273x273`
              }
              unoptimized
              draggable="false"
              fill
              className="select-none object-cover"
            />
          )}
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
            <div className="flex flex-row items-center">
              {product.isOnSale && (
                <p className="font-semibold text-sm mr-2 line-through text-red-600">
                  {product?.price.toLocaleString()}฿
                </p>
              )}
              <p className="font-semibold text-xl">
                {product.isOnSale
                  ? `${product?.salePrice.toLocaleString()}฿`
                  : product?.price === 0
                  ? "ราคาพิเศษ"
                  : `${product?.price.toLocaleString()}฿`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
