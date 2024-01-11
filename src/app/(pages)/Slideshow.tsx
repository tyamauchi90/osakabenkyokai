import { useEffect, useState } from "react";
import TextSample from "./TextSample";
import LatestEvent from "./circle/schedule/LatestEvent";

const images = [
  "/img/top/image1.jpg",
  "/img/top/image2.jpg",
  "/img/top/image3.jpg",
  "/img/top/image4.jpg",
  "/img/top/image5.png",
  "/img/top/image6.jpg",
  "/img/top/image7.jpg",
  "/img/top/image8.jpg",
  "/img/top/image9.jpg",
  "/img/top/image10.jpg",
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleImageLoad = () => {
    setIsTransitioning(false);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex, images.length]);

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + index + images.length) % images.length
      );
    }, 2000);
  };

  const goToPrevSlide = () => {
    goToSlide(-1);
  };

  const goToNextSlide = () => {
    goToSlide(1);
  };

  return (
    <div className="relative h-screen">
      <div className="w-full h-full overflow-hidden relative">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`object-cover w-full h-full ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            } duration-1000 transition-opacity ease-in-out absolute top-0 left-0 right-0 bottom-0`}
            onLoad={handleImageLoad}
          />
        ))}
      </div>
      <div className="absolute z-10 top-0">
        <TextSample />
      </div>
      <div className="p-8 bg-white bg-opacity-50 absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-max">
        <LatestEvent />
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 px-4 py-2 bg-customYellow text-white rounded z-10"
        onClick={goToPrevSlide}
      >
        &lt;
      </button>

      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 px-4 py-2 bg-customYellow text-white rounded z-10"
        onClick={goToNextSlide}
      >
        &gt;
      </button>
    </div>
  );
};

export default Slideshow;
