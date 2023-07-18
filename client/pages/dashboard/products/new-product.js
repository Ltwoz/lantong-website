import Layout from "@/components/layouts/Layout";
import Head from "next/head";
import { useState } from "react";

const NewProductPage = () => {
    // State ของ Product
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [salePrice, setSalePrice] = useState("");
    const [category, setCategory] = useState("");
    
    const [description, setDescription] = useState("");
    const [width, setWidth] = useState("");
    const [length, setLength] = useState("");
    const [height, setHeight] = useState("");
    const [weigthAccept, setWeightAccept] = useState("");
    
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const [isActive, setIsActive] = useState(true);
    const [isFeatured, setIsFeatured] = useState(false);
    const [isGift, setIsGift] = useState(false);
    const [giftDetail, setGiftDetail] = useState("");
    const [isOnSale, setIsOnSale] = useState(false);

    return (
        <Layout isDashboard={true}>
            <Head>
                <title>เพิ่มสินค้า - หจก.ลานทองเชียงใหม่</title>
            </Head>
            
        </Layout>
    );
}

export default NewProductPage;