
export default function SearchBar() {
  return (
    <>
      <div className="border-[2px] border-black p-5 w-fit mt-5 h-fit max-[767px]:w-full">
        <form>
          <div>
            <label>Label</label> <br />
            <input className="border" /> <br />
            <label className="">Label</label> <br />
            {/* select box */}
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
        </form>
      </div>
    </>
  );
}
