import Layout from "@/components/layouts/Layout";
import SearchBar from "@/components/ui/SearchBar";

export default function CatalogPage() {
  return (
    <Layout>
      <div className="w-[1200px] mx-auto border">
        <SearchBar />
      </div>
    </Layout>
  );
}
