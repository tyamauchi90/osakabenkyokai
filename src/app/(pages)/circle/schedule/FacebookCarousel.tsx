"use client";
import { Button } from "@/app/components/shadcn/ui/button";
import { ScrollArea, ScrollBar } from "@/app/components/shadcn/ui/scroll-area";
import { LoadingSkelton } from "@/app/components/ui/LoadingSkelton";
import useAllFacebookPosts from "@/app/swr/useAllFacebookPosts";
import { SelectedFacebookPostType } from "@/app/type/facebookPostType";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/shadcn/ui/dialog";

type SlideType = {
  style: {
    filter?: string;
    transform?: string;
    cursor?: string;
    pointerEvents?: string;
    zIndex?: number;
    opacity?: number;
  };
};

type EventType = {
  slide: SlideType;
};

type SplideType = {
  on: (eventName: string, callback: (e: EventType) => void) => void;
};

const FacebookCarousel = () => {
  const { data: posts, error, isLoading } = useAllFacebookPosts();
  const [imgUrls, setImgUrls] = useState<string | string[] | undefined>(
    undefined
  );
  const [selectedPost, setSelectedPost] =
    useState<SelectedFacebookPostType | null>(null);

  useEffect(() => {
    const updateImageUrls = () => {
      if (selectedPost) {
        setImgUrls(imgUrls);
      }
    };

    updateImageUrls();
  }, [imgUrls, selectedPost]);

  return (
    <>
      <div className="container flex flex-col items-center overflow-x-hidden">
        {!posts ||
          (isLoading && (
            <div className="w-full h-screen">
              <LoadingSkelton />
            </div>
          ))}
        {error && (
          <div className="w-full h-screen">
            データ取得に失敗しました。もう一度やり直してください。
          </div>
        )}

        <Splide
          options={{
            type: "loop",
            autoplay: true,
            speed: 500,
            easing: "ease",
            cover: true,
            fixedWidth: "34%",
            fixedHeight: "400px",
            width: "100%",
            // height: 600,
            focus: "center",
            rewind: true,
            wheel: true,
            wheelMinThreshold: 25,
            wheelSleep: 100,
            perPage: 3,
            pagination: false,
            // arrows: false,
            lazyLoad: "nearby",
            preloadPages: 1,
            breakpoints: {
              768: {
                fixedWidth: "50%",
                perPage: 3,
              },
              640: {
                fixedWidth: "100%",
                perPage: 1,
              },
            },
          }}
          onMounted={(splide: SplideType) => {
            splide.on("active", (e) => {
              e.slide.style.filter = "none";
              e.slide.style.transform = "scale(1.1)";
              e.slide.style.cursor = "pointer";
              e.slide.style.pointerEvents = "unset";
              e.slide.style.zIndex = 10;
              e.slide.style.opacity = 1;
            });
            splide.on("inactive", (e) => {
              e.slide.style.filter = "grayscale(100%)";
              e.slide.style.transform = "scale(0.9)";
              e.slide.style.cursor = "unset";
              e.slide.style.pointerEvents = "none";
              e.slide.style.zIndex = 1;
              e.slide.style.opacity = 0.5;
            });
          }}
        >
          {posts?.map((post) => {
            return (
              <Dialog key={post.id}>
                <DialogTrigger asChild>
                  <SplideSlide
                    key={post.id}
                    className="overflow-hidden grayscale scale-90 duration-300 opacity-50 pointer-events-none"
                    onClick={() => {
                      setSelectedPost(post);
                    }}
                  >
                    <p className="text-center text-gray-500 py-4 opacity-100">
                      {post.formattedDate}
                    </p>
                    <div className="relative min-w-[400px] min-h-[400px] overflow-hidden">
                      {post.full_picture ? (
                        <img
                          src={post.full_picture}
                          alt="Facebook Post"
                          className="absolute inset-0 object-cover duration-500 hover:scale-110 hover:duration-500"
                        />
                      ) : (
                        <p>{post.message}</p>
                      )}
                    </div>
                    {/* <div className="relative min-w-[600px] min-h-[300px] overflow-hidden">
                      {post.full_picture ? (
                        <Image
                          layout="fill"
                          objectFit="cover"
                          placeholder="empty"
                          className="absolute inset-0 object-cover duration-500 hover:scale-110 hover:duration-500"
                          src={post.full_picture}
                          alt={`Facebook Post${post.formattedDate}`}
                        />
                      ) : (
                        <p>{post.message}</p>
                      )}
                    </div> */}
                  </SplideSlide>
                </DialogTrigger>
                <DialogContent className="m-auto p-7 max-w-[90vw] max-h-[90vh] overflow-y-auto">
                  <div className="w-[80vw] mx-auto my-[5vh]">
                    <DialogHeader>
                      {selectedPost &&
                        Array.isArray(selectedPost.imgUrls) &&
                        selectedPost.imgUrls.length > 0 && (
                          <ScrollArea className="w-[80vw] mb-8 whitespace-nowrap">
                            <div className="flex justify-center space-x-1">
                              {selectedPost.imgUrls.map((imgurl) => (
                                <img
                                  className="object-cover max-w-sm sm:max-w-[50vw] lg:max-w-[40vw]"
                                  key={selectedPost.id}
                                  src={imgurl}
                                  alt={`Image ${selectedPost.created_time}`}
                                />
                              ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                          </ScrollArea>
                          //   <ScrollArea className="mb-8">
                          //   <div className="flex justify-center gap-4">
                          //     {selectedPost.imgUrls.map((imgurl) => (
                          //       <div
                          //         key={selectedPost.id}
                          //         className="relative w-[70vw] h-[40vw]"
                          //       >
                          //         <Image
                          //           layout="fill"
                          //           objectFit="cover"
                          //           placeholder="empty"
                          //           className="w-full h-auto"
                          //           src={imgurl}
                          //           alt={`Image ${selectedPost.created_time}`}
                          //         />
                          //       </div>
                          //     ))}
                          //   </div>
                          //   <ScrollBar orientation="horizontal" />
                          // </ScrollArea>
                        )}
                    </DialogHeader>
                    <DialogTitle className="text-center text-lg">
                      {selectedPost && selectedPost.formattedDate}
                    </DialogTitle>
                    <DialogDescription className="text-center text-lg break-words mb-8">
                      {selectedPost && selectedPost.message}
                    </DialogDescription>

                    <DialogFooter className="sm:justify-center">
                      <DialogClose asChild>
                        <Button className="">閉じる</Button>
                      </DialogClose>
                    </DialogFooter>
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </Splide>
      </div>
    </>
  );
};

export default FacebookCarousel;
