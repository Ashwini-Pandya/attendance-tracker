import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: "📚",
      title: "Track Multiple Subjects",
      description:
        "Add all your subjects with total hours and attendance criteria",
      subHours: "50",
      ClassesMissed: "3",
      leavesLeft: "7", // 50 - (50*0.8) - 3 = 50 - 40 - 3 = 7
    },
    {
      icon: "⚡",
      title: "Smart Leave Calculator",
      description: "Instantly see how many classes you can still miss",
      subHours: "60",
      ClassesMissed: "10",
      leavesLeft: "2", // 60 - (60*0.8) - 10 = 60 - 48 - 10 = 2
    },
    {
      icon: "🎯",
      title: "Visual Warnings",
      description: "Color-coded cards warn you when attendance is critical",
      subHours: "45",
      ClassesMissed: "10",
      leavesLeft: "0", // 45 - (45*0.8) - 10 = 45 - 36 - 10 = -1 → 0 (No leaves)
    },
  ];

  useEffect(() => {
    setIsDisplayed(true);

    // Auto-cycle through features
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();
  const handleGetStarted = () => navigate("/dashboard");

  const getCardStyle = (leavesLeft) => {
    const leaves = Number(leavesLeft);
    if (leaves <= 0) return "bg-red-200 border-red-400";
    if (leaves <= 2) return "bg-orange-300 border-amber-500";
    return "bg-amber-100 border-amber-300";
  };

  const getInputBorder = (leavesLeft) => {
    const leaves = Number(leavesLeft);
    if (leaves <= 0) return "border-red-200";
    if (leaves <= 2) return "border-orange-300";
    return "border-amber-100";
  };

  const currentCard = features[currentFeature];

  return (
    <div
      className={`min-h-screen bg-gray-50 transition-opacity duration-1000 ${
        isDisplayed ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Header Section */}
        <div
          className={`text-center mb-8 transform transition-all duration-1000 delay-300 ${
            isDisplayed
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="inline-block p-4 rounded-full bg-amber-100 border-2 border-amber-300 mb-6 animate-bounce">
            <span className="text-4xl">🎓</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 leading-tight">
            <span className="text-amber-600">Absent</span>{" "}
            <span className="text-gray-800">Tracker</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Track your class attendance with smart calculations and visual
            warnings. Never miss important attendance requirements again.
          </p>
        </div>

        {/* Demo Card Section */}
        <div
          className={`w-full max-w-md mb-8 transform transition-all duration-1000 delay-500 ${
            isDisplayed
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <h3 className="text-center text-gray-700 font-semibold mb-4 text-lg">
            See how it works:
          </h3>

          {/* Animated Subject Card Demo */}
          <div
            className={`relative flex justify-between border-2 rounded-lg p-4 shadow-lg mb-4 transition-all duration-500 ${getCardStyle(
              currentCard.leavesLeft
            )}`}
          >
            <button className="absolute top-1 right-1 border-amber-100 bg-text-red-500 ml-2 hover:bg-gray-400 text-xs">
              ⛔
            </button>
            <div>
              <h2 className="text-lg text-gray-800 font-bold uppercase">
                {currentCard.title.split(" ")[0]} SUBJECT
              </h2>
              <div className="flex flex-row">
                <h2 className="flex pt-3 text-sm text-gray-600">
                  Lectures:
                  <span className="font-semibold pl-1">
                    {currentCard.subHours}
                  </span>
                </h2>
              </div>
            </div>
            <div className="flex items-end justify-end flex-row space-x-3 pr-1">
              <div className="flex flex-col">
                <h3 className="text-center text-2xl font-semibold text-gray-800">
                  {currentCard.leavesLeft === "0"
                    ? "No"
                    : currentCard.leavesLeft}
                </h3>
                <h2 className="text-center text-md text-gray-600 font-md">
                  Leaves Left
                </h2>
              </div>
              <div className="flex flex-col items-center">
                <input
                  type="number"
                  value={currentCard.ClassesMissed}
                  readOnly
                  className={`text-center text-2xl font-semibold border rounded-sm focus:outline-none w-10 text-gray-800 ${getInputBorder(
                    currentCard.leavesLeft
                  )}`}
                />
                <label className="text-md text-center text-gray-600 font-md">
                  Missed
                </label>
              </div>
            </div>
          </div>

          {/* Feature Description */}
          <div className="bg-white border border-amber-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-3">{currentCard.icon}</span>
              <h4 className="text-lg font-semibold text-gray-800">
                {currentCard.title}
              </h4>
            </div>
            <p className="text-gray-600 text-sm">{currentCard.description}</p>
          </div>

          {/* Feature Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-4">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFeature(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentFeature
                    ? "bg-amber-500 scale-125"
                    : "bg-gray-400 hover:bg-amber-300"
                }`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleGetStarted}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg mb-5"
        >
          Start Tracking Attendance
        </button>

        {/* Features List */}
        <div
          className={`w-full max-w-md mb-8 transform transition-all duration-1000 delay-700 ${
            isDisplayed
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center bg-amber-50 border border-amber-200 rounded-lg p-3">
              <span className="text-xl mr-3">✅</span>
              <span className="text-gray-700 text-sm">
                Add unlimited subjects
              </span>
            </div>
            <div className="flex items-center bg-amber-50 border border-amber-200 rounded-lg p-3">
              <span className="text-xl mr-3">⏱️</span>
              <span className="text-gray-700 text-sm">
                Real-time leave calculations
              </span>
            </div>
            <div className="flex items-center bg-amber-50 border border-amber-200 rounded-lg p-3">
              <span className="text-xl mr-3">🎨</span>
              <span className="text-gray-700 text-sm">
                Color-coded warning system
              </span>
            </div>
            <div className="flex items-center bg-amber-50 border border-amber-200 rounded-lg p-3">
              <span className="text-xl mr-3">💾</span>
              <span className="text-gray-700 text-sm">
                Saves data automatically
              </span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          className={`transform transition-all duration-1000 delay-900 ${
            isDisplayed
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-gray-500 text-sm mt-4 text-center">
            Free • No signup required • Works offline
          </p>
        </div>

        {/* Bottom Stats */}
        <div
          className={`transform transition-all duration-1000 delay-1100 mt-8 ${
            isDisplayed
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex justify-center space-x-8 text-center">
            <div>
              <div className="text-lg font-bold text-amber-600">Smart</div>
              <div className="text-xs text-gray-500">Algorithm</div>
            </div>
            <div>
              <div className="text-lg font-bold text-amber-600">Visual</div>
              <div className="text-xs text-gray-500">Interface</div>
            </div>
            <div>
              <div className="text-lg font-bold text-amber-600">Simple</div>
              <div className="text-xs text-gray-500">To Use</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
