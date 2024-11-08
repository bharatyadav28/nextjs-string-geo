import React, { useEffect, useState } from "react";
import { Button, Carousel, Col, Image, Row } from "react-bootstrap";
// import { useNavigate } from 'react-router-dom'
import { useRouter } from "next/navigation";
import "./HomeCarousel.css";
import { imgAddr, useGetOuterCarouselQuery } from "../features/api";
import { clickSubBtn } from "../utils/functions";
import VideoPlayer from "./VideoPlayer";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "react-responsive";
function HomeCarousel() {
  // const navigate = useNavigate();
  const router = useRouter();
  const { data, isLoading } = useGetOuterCarouselQuery();
  const [poster, setPoster] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobileDevice = useMediaQuery({ maxWidth: 900 });

  useEffect(() => {
    setPoster(data?.carousels);
  }, [data]);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <section className="home-section">
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
          <Carousel
            interval={null}
            controls={!isMobileDevice}
            indicators={true}
            pause={"hover"}
            style={{ height: "100%" }}
            onSelect={handleSelect}
          >
            {poster?.map((data, index) => (
              <Carousel.Item
                className="section-height position-relative"
                key={index}
              >
                <div
                  className={
                    "d-flex justify-content-center thumbnail-container"
                  }
                  style={{
                    height: "100%",
                    width: "100%",
                    zIndex: 99,
                    background: "rgba(0,0,0)",
                  }}
                >
                  <Image
                    src={`${imgAddr}/${data?.poster_url}`}
                    style={{
                      height: "100%",
                      width: "100%",
                      maxWidth: "1800px",
                      aspectRatio: "16/9",
                    }}
                  />
                </div>

                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {(data?.video_id?.video_url ||
                    data?.free_video_id?.video_url) &&
                    activeIndex === index && (
                      <VideoPlayer
                        tooltipView={true}
                        source={
                          data?.video_id?.video_url ||
                          data?.free_video_id?.video_url
                        }
                        poster={data?.poster_url}
                      />
                    )}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        )
      )}
    </section>
  );
}

export default HomeCarousel;
