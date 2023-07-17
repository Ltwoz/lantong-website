import ProductCard from "@/components/products/ProductCard";
import Layout from "@/components/layouts/Layout";
import ProductFilter from "@/components/ui/ProductFilter";

export default function CatalogPage() {
    return (
        <Layout>
            <div className="mx-auto max-w-[1200px] px-4 md:px-0 flex flex-col md:flex-row md:space-x-6">
                <ProductFilter />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mt-4 md:mt-0">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard /> 
                </div>
            </div>
        </Layout>
    );
}
