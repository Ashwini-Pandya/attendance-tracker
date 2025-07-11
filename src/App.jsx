import { useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [subName, setSubName] = useState("");
  const [subHours, setSubHours] = useState();
  const [data, setData] = useState([]);
  const handleChange = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSub = {
      subName,
      subHours,
      missedClasses: 0,
      minClassesToAttend: 0.8 * Number(subHours),
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };

    setData([...data, newSub]);
    handleChange();
    setSubName("");
    setSubHours(0);
  };

  return (
    <div className="flex gap-4 flex-col relative border-4 h-screen">
      {isOpen ? (
        <div className="absolute inset-0 bg-black/20 backdrop-filter backdrop-blur z-10">
          <div className="py-4 px-12 bg-gray-50 h-80 w-80 rounded flex flex-col items-center m-auto absolute inset-0 z-20">
            <p className="text-xl font-bold mb-4">Add subject</p>
            <form>
              <div className="">
                <label htmlFor="" className="text-sm">
                  Subject name
                </label>
                <input
                  type="text"
                  placeholder="Anatomy"
                  className="border rounded text-black p-1"
                  value={subName}
                  onChange={(e) => setSubName(e.target.value)}
                />
              </div>
              <div className="my-2">
                <label htmlFor="" className="text-sm">
                  Subject hours
                </label>
                <input
                  type="number"
                  className="border rounded p-1"
                  placeholder="50"
                  value={subHours}
                  onChange={(e) => setSubHours(e.target.value)}
                />
              </div>
              <div className="flex gap-2 justify-start mt-4">
                <button
                  className="rounded px-2 py-1 text-sm hover:shadow bg-gray-700 text-white hover:bg-gray-800"
                  onClick={handleSubmit}
                  type="submit"
                >
                  Submit
                </button>
                <button
                  className="border rounded px-2 py-1 text-sm hover:shadow hover:bg-gray-300"
                  onClick={handleChange}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
      <button
        className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-800 shadow mt-2 mx-2"
        onClick={handleChange}
      >
        Add new subject
      </button>

      <div>
        {data.map((sub, i) => (
          <div
            className="px-4 py-2 bg-gray-50 mx-4 my-2 rounded shadow-md"
            key={i}
          >
            <div className="flex justify-between items-baseline">
              <p className="text-xl font-bold">{sub.subName}</p>
              <p>
                Missed:{" "}
                <span className="text-xl">
                  {sub.missedClasses}/
                  {Number(sub.subHours) - Number(sub.minClassesToAttend)}
                </span>
              </p>
            </div>

            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <p>
                  Total lectures: {sub.minClassesToAttend}/{sub.subHours}
                </p>
                <p className="text-xs text-gray-400">
                  Last updated: {sub?.updatedAt}
                </p>
              </div>
              <button className="border rounded shadow px-2 py-1 text-xs">
                Mark absent
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
