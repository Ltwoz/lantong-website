import ProductCard from "@/components/products/ProductCard";
import Layout from "@/components/layouts/Layout";
import SearchBar from "@/components/ui/ProductFilter";

export default function CatalogPage() {
    return (
        <Layout>
            <div className="mx-auto max-w-[1200px] px-4 flex md:flex-row md:space-x-6">
                <SearchBar />
                <div className="w-full mx-auto border grid grid-cols-3 gap-y-5 max-[767px]:grid-cols-1  ">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </Layout>
    );
}
