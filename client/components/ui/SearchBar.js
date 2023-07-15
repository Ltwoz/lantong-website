import { useEffect , useState } from "react";
export default function SearchBar() {
  const [value, setValue] = useState(50);
  useEffect(() => {
    const range = document.querySelector("input[type=range]");
    const tooltip = document.getElementById("tooltip");

    let thumbSize = 8;
    const ratio = (range.value - range.min) / (range.max - range.min);
    let amountToMove =
      ratio * (range.offsetWidth - thumbSize - thumbSize) + thumbSize;
    tooltip.style.left = amountToMove + "px";
  }, [value]);
  return (
    <>
      <div className="border-[2px] border-black p-5 w-fit mt-5">
        <form>
          <div className="">
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
            <div className="range-wrap relative flex h-[24px] w-full items-center">
              <input
                className="range relative flex w-full"
                aria-valuemin={0}
                type="range"
                min="0"
                max="100"
                value={value}
                id="slider"
                onChange={({ target: { value: radius } }) => {
                  setValue(radius);
                }}
              />
              <div id="progress"></div>
              <div
                id="tooltip"
                className={`bubble absolute top-[-40px] flex h-[38px] w-[32px] -translate-x-1/2 items-center justify-center rounded-full bg-purple-400 align-middle text-body-medium text-white`}
              >
                {value}
              </div>
            </div>
          </div>
          <button className="bg-[#2d3648] font-bold rounded-xl p-2 text-white">Large</button>
        </form>
      </div>
    </>
  );
}
