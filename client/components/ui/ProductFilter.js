export default function SearchBar() {
    return (
        <>
            <form
                autoComplete="off"
                className="border-2 border-[#2D3648] rounded p-10 w-full md:w-[309px] grid grid-cols-4 gap-4"
            >
                <div className="col-span-4">
                    <label className="block text-xs md:text-sm font-medium tracking-wide">
                        ชื่อสินค้า
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                    />
                </div>
                <div className="col-span-4">
                    <label className="block text-xs md:text-sm font-medium tracking-wide">
                        หมวดหมู่
                    </label>
                    <select className="border w-full mt-1 p-2 rounded-md text-sm md:text-base">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <div className="col-span-4">
                    <label className="block text-xs md:text-sm font-medium tracking-wide">
                        ราคา
                    </label>
                    <div className="flex flex-row mt-1 w-full space-x-4">
                        <input
                            type="text"
                            name="name"
                            className="p-2 w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                        />
                        <input
                            type="text"
                            name="name"
                            className="p-2 w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                        />
                    </div>
                </div>
                <div className="col-span-4 flex items-center justify-start gap-x-4">
                    <button
                        className="inline-flex items-center bg-[#2D3648] disabled:bg-gray-400 rounded-md transition-all overflow-hidden disabled:cursor-not-allowed"
                    >
                        <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="w-5 h-5 mr-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span className="block">
                                {"ค้นหา"}
                            </span>
                        </div>
                    </button>
                </div>
            </form>
            {/* <form>
          <div>
            <label>Label</label> <br />
            <input className="border" /> <br />
            
            <label className="">Label</label> <br />
            <select name="cars" id="cars" className="border">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>

          <div className="mt-5 mb-5">
            <label>Label</label> <br />
            <input
              type="checkbox"
              id="vehicle1"
              name="vehicle1"
              value="value"
            />
            <label for="vehicle1"> value</label>
            <br />
            <input
              type="checkbox"
              id="vehicle2"
              name="vehicle2"
              value="value"
            />
            <label for="vehicle2"> value</label>
            <br />
            <input
              type="checkbox"
              id="vehicle3"
              name="vehicle3"
              value="value"
            />
            <label for="vehicle3"> value</label>
            <br />
          </div>

          <div>
            <label>ราคาต่ำสุด</label> <br/>
            <input type="text" placeholder="Min" className="border" /><br/>
            <label>ราคาสูงสุด</label><br/>
            <input type="text" placeholder="Max" className="border mb-2" />
          </div>
          <button className="bg-[#2d3648] font-bold rounded-xl p-2 text-white">Large</button>
        </form> */}
        </>
    );
}
