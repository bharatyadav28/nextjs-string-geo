import React, { useEffect, useState } from "react";
import { Button, Carousel, Col, Image, Row } from "react-bootstrap";
// import { useNavigate } from 'react-router-dom';
import { useRouter } from "next/navigation";
import { imgAddr, useGetInnerCarouselQuery } from "../features/api";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";
import Skeleton from "react-loading-skeleton";
import { IoPlayCircleOutline } from "react-icons/io5";
import "./DashHomeCarousel.css";
function DashHomeCarousel() {
  const { data, isLoading } = useGetInnerCarouselQuery();
  const [poster, setPoster] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobileDevice = useMediaQuery({ maxWidth: 900 });
  const { accessToken, isActivePlan } = useSelector(selectAuth);
  // const navigate = useNavigate();
  const router = useRouter();

  const hasAccess = accessToken && isActivePlan;

  useEffect(() => {
    setPoster(data?.carousels);
  }, [data]);

  const handleViewVideo = (item) => {
    if (item?.video_id?._id && isActivePlan) {
      router.push(`/video/${item?.video_id?._id}`);
    } else if (item?.free_video_id?._id) {
      router.push(`/free-video/${item?.free_video_id?._id}`);
    } else {
      router.push("/auth/billing");
    }
  };

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <section>
      {isLoading ? (
        <Skeleton
          style={{
            height: "100%",
            width: "100%",
            aspectRatio: "16/9",
            maxHeight: "100vh",
          }}
        />
      ) : (
        poster?.length > 0 && (
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            {/* Carousel Section */}
            <Carousel
              controls={!isMobileDevice}
              indicators={true}
              pause={false}
              style={{ height: "100%" }}
              onSelect={handleSelect}
            >
              {poster?.map((item, index) => (
                <Carousel.Item className="section-height" key={index}>
                  <div
                    className={
                      "d-flex justify-content-center thumbnail-container"
                    }
                    style={{ height: "100%", width: "100%" }}
                  >
                    <Image
                      src={`${imgAddr}/${item?.poster_url}`}
                      style={{
                        height: "100%",
                        width: "100%",
                        maxWidth: "1800px",
                        aspectRatio: "16/9",
                      }}
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>

            {(poster?.[activeIndex]?.video_id?.title ||
              poster?.[activeIndex]?.free_video_id?.title) && (
              <div className={`hero-text p-2`}>
                <div className="p-3 ">
                  <h3 className="hero-title">
                    {poster?.[activeIndex]?.video_id?.title ||
                      poster?.[activeIndex]?.free_video_id?.title ||
                      "Video"}
                  </h3>
                </div>
                <div className="watch-now-btn-div">
                  <Button
                    variant="transparent"
                    className="text-white py-xs-2 watch-now-btn my-md-1  form-btn rounded-3"
                    onClick={() => handleViewVideo(poster?.[activeIndex])}
                  >
                    Watch Now
                    {/* <IoPlayCircleOutline size={25}/> */}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )
      )}
    </section>
  );
}

export default DashHomeCarousel;
