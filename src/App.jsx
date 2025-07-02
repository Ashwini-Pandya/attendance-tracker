import { useState } from "react";
import "./App.css";

function App() {
  const [change, setChange] = useState(false);
  const handle_click = () => {
    setChange(!change);
  };
  return (
    <div className="flex gap-4 flex-col relative border-4 h-screen">
      {change && (
        <div
          className="absolute inset-0 bg-black/20 backdrop-filter backdrop-blur z-10"
          onClick={handle_click}
        >
          <div className="text-indigo-500 text-xl py-4 px-12 border bg-amber-50 h-80 w-80 flex flex-col justify-center items-center m-auto absolute inset-0 z-20">
            <p>hello world</p>
            <button onClick={handle_click} className="border px-2 py-1">
              close modal
            </button>
          </div>
        </div>
      )}
      <button
        className="border border-amber-500 px-3 py-1 rounded bg-gray-600 text-white hover:bg-gray-800 hover:text-blue-500 hover:shadow-xl w-40"
        onClick={handle_click}
      >
        clickme
      </button>
    </div>
  );
}

export default App;
