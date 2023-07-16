import Image from "next/image";
export default function ProductCard() {
  return (
    // กล่อง card
    <div class="max-w-sm rounded overflow-hidden shadow-lg w-[273px] hover:scale-110 max-[767px]:w-full">
      <Image class="w-full"
        src={"/example.avif"}
        alt="Sunset in the mountains" width={20} height={20} />
        

      <div class="px-6 py-4">
        <p class="text-gray-700 text-base mb-12">
        Lorem ipsum dolor sit amet consectetura
        </p>
      </div> 

      <hr/>

      <div class="px-6 pt-4 pb-2 flex justify-between">
        <p>#A084</p>
        <p>9500฿</p>
      </div>
    </div>
  );
}
