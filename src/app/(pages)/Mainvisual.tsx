import { easeIn, motion, useAnimation } from "framer-motion";
import { BookOpenCheck } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/shadcn/ui/popover";
import LatestEvent from "./circle/schedule/LatestEvent";

const Mainvisual = () => {
  const images = [
    "/img/top/mainvisual/img1.jpg",
    "/img/top/mainvisual/img2.jpg",
    "/img/top/mainvisual/img3.jpg",
    "/img/top/mainvisual/img4.jpg",
    "/img/top/mainvisual/img5.jpg",
    "/img/top/mainvisual/img6.jpg",
  ];
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

  const changes = "学び、成長、交流、";
  const changeArray = changes.split("");
  const chances = '"きっかけ"がここに。';
  const chanceArray = chances.split("");
  const words = "おおさか勉強会";
  const wordArray = words.split("");

  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const getRandomDirection = () => {
    return Math.random() > 0.5 ? Math.random() * 50 : -Math.random() * 50;
  };

  const getRandomRotation = () => {
    return Math.random() * 180;
  };

  const imageVariants = {
    hidden: { opacity: 0, x: "100% " },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        // type: "spring",
        // damping: 60,
        // stiffness: 150,
        ease: "backInOut",
        duration: 3,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const visibleVariants = {
    hidden: {
      opacity: 0,
      x: getRandomDirection(),
      y: getRandomDirection(),
      rotate: getRandomRotation(),
    },
    visible: {
      backgroundColor: "#fff",
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        duration: 1.8,
        damping: 10,
        stiffness: 100,
      },
    },
  };

  const reserveVariants = {
    hidden: { opacity: 0, x: "-100% " },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 60,
        stiffness: 100,
        delay: 3,
        duration: 2,
      },
    },
  };

  const subtextVariants = {
    hidden: { opacity: 0, x: "-100% " },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 60,
        stiffness: 100,
        delay: 2.5,
        staggerChildren: 0.2,
        duration: 2,
      },
    },
  };

  const bgWhiteVariants = {
    hidden: { opacity: 0, x: "-100% ", scale: 0 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        ease: "backInOut",
        delay: 2,
        duration: 2,
      },
    },
  };

  return (
    <>
      <div className="max-w-[1400px] mx-auto relative w-full h-customMainvisual">
        <motion.div
          className="absolute top-0 right-0 w-full md:w-customMainvisual h-full md:h-customMainvisual overflow-hidden rounded-l-[100px]"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full h-full">
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
        </motion.div>
        <div className="absolute z-10 top-1/2 transform -translate-y-1/2 ml-[1rem]">
          <motion.div
            className="text-customMainvisualText font-bold tracking-[0.1em] text-justify rounded-md"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {changeArray.map((change, i) => (
              <motion.span
                key={i}
                className="inline-block"
                variants={visibleVariants}
              >
                {change}
              </motion.span>
            ))}
            <br />
            {chanceArray.map((chance, i) => (
              <motion.span
                key={i}
                className="inline-block my-10"
                variants={visibleVariants}
              >
                {chance}
              </motion.span>
            ))}
          </motion.div>

          <motion.div className="inline-block text-customMainvisualCircleName font-bold tracking-[0.2em] leading-[2em] text-justify">
            <motion.div
              className="inline-flex items-center px-2 bg-white rounded-md "
              variants={bgWhiteVariants}
              initial="hidden"
              animate="visible"
            >
              {wordArray.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  variants={subtextVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {word}
                </motion.span>
              ))}
              <Popover>
                <PopoverTrigger>
                  <motion.div
                    variants={reserveVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.3, ease: easeIn },
                    }}
                  >
                    <BookOpenCheck className="mx-2 w-customMainvisualReservation h-customMainvisualReservation" />
                  </motion.div>
                </PopoverTrigger>
                <PopoverContent className="min-w-[375px]">
                  <LatestEvent className="border-none shadow-none" />
                </PopoverContent>
              </Popover>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Mainvisual;
