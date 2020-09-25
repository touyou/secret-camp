import { useEffect, useState } from "react";

const Index = () => {
  const [currentIndex, setIndex] = useState(0);
  const mediaArray = ["test", "test2", "test3", "test4"];

  const backIndex = () => {
    if (currentIndex > 0) {
      setIndex(currentIndex - 1);
    } else {
      setIndex(Math.max(mediaArray.length - 1, 0));
    }
  };

  const nextIndex = () => {
    if (currentIndex < mediaArray.length - 1) {
      setIndex(currentIndex + 1);
    } else {
      setIndex(0);
    }
  };

  return (
    <div>
      <button onClick={backIndex}>Back</button>
      <p>{mediaArray[currentIndex]}</p>
      <button onClick={nextIndex}>Next</button>
    </div>
  );
};

export default Index;
