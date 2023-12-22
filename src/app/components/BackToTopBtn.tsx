import { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";

const BackToTopBtn: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", scrollWindow);
    return () => {
      window.removeEventListener("scroll", scrollWindow);
    };
  }, []);

  const scrollWindow = () => {
    const bottom = 50;
    let scroll = 0;
    scroll = window.scrollY;
    if (bottom <= scroll) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const scrollToTop = () => {
    scroll.scrollToTop({ duration: 800 });
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 w-14 h-14 text-xl text-white bg-gray-500 rounded-full p-3 shadow-lg transition-opacity duration-500 ease-in-out flex justify-center items-center cursor-pointer ${
        isActive ? "visible" : "invisible"
      }`}
      onClick={scrollToTop}
    >
      ↑
    </div>
  );
};

export default BackToTopBtn;
