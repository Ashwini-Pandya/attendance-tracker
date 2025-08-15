import { useState, useEffect } from "react";
import "./App.css";
import LandingPage from "./landingPage";
function App() {
  const [change, setChange] = useState(false);
  const [subName, setSubName] = useState("");
  const [subHours, setSubHours] = useState();
  const [minAttendance, setMinAttendance] = useState(80);
  const [subToDel, setSubToDel] = useState(null);
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("subjects");
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(data));
  }, [data]);

  const isDataValid =
    subName.trim() !== "" &&
    subHours !== "" &&
    !isNaN(subHours) &&
    subHours != 0;

  const handleClick = () => {
    setChange(!change);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      subName,
      subHours,
      ClassesMissed: "0",
      MinClassesToAttend: (minAttendance / 100) * Number(subHours),
    };
    console.log(minAttendance);

    setData([...data, newData]);
    handleClick();
    setSubName("");
    setSubHours(0);
  };

  const updateMissed = (index, value) => {
    const newData = [...data];
    newData[index].ClassesMissed = Number(value);
    setData(newData);
  };

  const removeSubject = () => {
    const newData = data.filter((_, i) => i !== subToDel);
    setData(newData);
    setSubToDel(null);
  };

  return (
    <div className="flex p-4 flex-col h-screen space-y-6 w-full mx-auto">
      {change && (
        <div className="fixed inset-0 bg-black/40 backdrop-filter backdrop-blur z-10 flex items-center justify-center">
          <div className="bg-white rounded-lg mx-2 shadow-xl p-6 space-y-4 w-full max-w-sm ">
            <div>
              <form>
                <div>
                  <label className="text-gray-700 font-semibold">
                    {" "}
                    Subject Name
                  </label>
                  <input
                    type="text"
                    value={subName}
                    onChange={(e) => setSubName(e.target.value)}
                    className="border border-gray-300 rounded-md text-sm w-full p-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-semibold">
                    Maximum Hours
                  </label>
                  <input
                    type="number"
                    value={subHours}
                    onChange={(e) => setSubHours(e.target.value)}
                    className="border border-gray-300 rounded-md text-sm w-full p-2 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label> Attendance Criteria</label>
                  <input
                    type="number"
                    value={minAttendance}
                    onChange={(e) => setMinAttendance(e.target.value)}
                    className="border border-gray-300 rounded-md text-sm w-full p-2 focus:outline-none"
                  />
                </div>
              </form>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={!isDataValid}
                className="bg-blue-500 text-white rounded-md px-4 py-2 disabled:bg-gray-300"
              >
                Submit
              </button>
              <button
                onClick={handleClick}
                className="border border-gray-300 rounded-md px-4 py-2"
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}

      {subToDel !== null && (
        <div className="flex justify-center items-center fixed inset-0 backdrop-filter backdrop-blur z-10">
          <div className="border-gray-500 mx-3 h-40  rounded-lg p-4 flex justify-center bg-white shadow-xl max-w-sm">
            <div className="">
              <div>
                <h2 className="text-wrap w-full">
                  {" "}
                  Are you sure you want to remove this subject?
                </h2>{" "}
              </div>

              <div className="h-20 flex justify-end items-end space-x-2 w-full">
                <button
                  onClick={removeSubject}
                  className="border bg-red-500 text-white px-2 py-1 rounded-md hover:shadow-xl hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSubToDel(null)}
                  className="border px-2 py-1 bg-gray-400 border-gray-400 rounded-md hover:bg-gray-500 hover:shadow-xl "
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        className="rounded-md bg-gray-500 text-white px-4 py-2 hover:bg-gray-800"
        onClick={handleClick}
      >
        Add Subject
      </button>
      <div>
        {data.map((sub, i) => {
          const leavesLeft = Math.floor(
            Number(sub.subHours) -
              Number(sub.MinClassesToAttend) -
              Number(sub.ClassesMissed)
          );
          const warning = leavesLeft < 1 ? "No" : leavesLeft;
          const bgColor =
            leavesLeft <= 0
              ? "bg-red-200 border-red-400"
              : leavesLeft <= 2
              ? "bg-orange-300 border-amber-500"
              : "bg-amber-100 border-amber-300";
          const inputBorder =
            leavesLeft <= 0
              ? "border-red-200"
              : leavesLeft <= 2
              ? "border-orange-300"
              : "border-amber-100";

          return (
            <div
              key={i}
              className={`relative flex justify-between border-2 rounded-lg p-4 shadow-lg mb-2 ${bgColor}`}
            >
              <button
                onClick={() => setSubToDel(i)}
                className="absolute top-1 right-1 border-amber-100 bg-text-red-500 ml-2 hover:bg-gray-400 text-xs"
              >
                ⛔
              </button>
              <div>
                <h2 className="text-lg text-gray-800 font-bold uppercase">
                  {sub.subName}
                </h2>
                <div className="flex flex-row">
                  <h2 className="flex pt-3 mt text-sm text-gray-600">
                    Lectures:
                    <span className="font-semibold pl-1">{sub.subHours}</span>
                  </h2>
                </div>
              </div>
              <div className="flex items-end justify-end flex-row space-x-3 pr-1">
                <div className="flex flex-col">
                  <h3 className="text-center text-2xl font-semibold text-gray-800">
                    {warning}
                  </h3>
                  <h2 className="text-center text-md text-gray-600 font-md">
                    Leaves Left
                  </h2>
                </div>
                <div className="flex flex-col items-center">
                  <input
                    type="number"
                    placeholder="Tap to add"
                    value={sub.ClassesMissed}
                    onChange={(e) => updateMissed(i, e.target.value)}
                    className={`text-center text-2xl font-semibold border rounded-sm focus:outline-none w-10 text-gray-800 ${inputBorder}`}
                  />
                  <label className="text-md text-center text-gray-600 font-md">
                    Missed
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
