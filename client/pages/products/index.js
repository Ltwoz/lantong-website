import ProductCard from "@/components/catalog/ProductCard";
import Layout from "@/components/layouts/Layout";
import SearchBar from "@/components/ui/ProductFilter";

export default function CatalogPage() {
  return (
    <Layout>
      <div className="mx-auto min-[767px]:w-[1200px]">
        <div className="flex max-[767px]:block">
          <div className="">
            <SearchBar />
          </div>
          <div className="w-full ml-6 mx-auto mt-5 border grid grid-cols-3 gap-y-5 max-[767px]:grid-cols-1  ">
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </Layout>
  );
}
