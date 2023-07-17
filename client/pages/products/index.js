import ProductCard from "@/components/ui/products/ProductCard";
import Layout from "@/components/layouts/Layout";
import ProductFilter from "@/components/ui/products/ProductFilter";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [link, setLink] = useState(`/api/products?isActive=true`);

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await axios.get(`http://localhost:8000${link}`);
            setProducts(data?.products);
            setLoading(false);
        };

        getProducts().catch(() => {
            console.error;
            setLoading(false);
        });

        console.log("done");
    }, [link]);

    return (
        <Layout>
            <div className="mx-auto max-w-[1200px] px-4 md:px-0 flex flex-col md:flex-row md:space-x-6">
                <ProductFilter />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mt-4 md:mt-0">
                    {products?.length !== 0 ? (
                        products.map((product, i) => (
                            <ProductCard key={i} product={product} />
                        ))
                    ) : (
                        <div className="text-center">Product not found.</div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
