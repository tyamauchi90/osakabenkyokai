import { useEffect, useState } from "react";

const useNoImage = () => {
  const [noImage, setNoImage] = useState("");
  const noImages = [
    "no_image0.jpg",
    "no_image1.jpg",
    "no_image2.jpg",
    "no_image3.jpg",
    "no_image4.jpg",
    "no_image5.jpg",
    "no_image6.jpg",
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * noImages.length);
    setNoImage(noImages[randomIndex]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return noImage;
};

export default useNoImage;
