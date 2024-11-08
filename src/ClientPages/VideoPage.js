"use client";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { PiShareFatLight } from "react-icons/pi";
import {
  baseAddr,
  imgAddr,
  useGetFreeVideoByIdMutation,
  useGetShareImageMutation,
  useGetVideoByIdMutation,
} from "../features/api.js";
import { useRouter, usePathname } from "next/navigation.js";
import Skeleton from "react-loading-skeleton";
import AllCategories from "../components/AllCategories.js";
import { useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice.js";
import VideoPlayer from "../components/VideoPlayer.js";
import { getError } from "../utils/error.js";
import toast from "react-hot-toast";
import "share-api-polyfill";
import axios from "axios";

function VideoPage({ id }) {
  const [getVideoById, { error }] = useGetVideoByIdMutation();
  const [getFreeVideoById] = useGetFreeVideoByIdMutation();
  const { accessToken, isActivePlan } = useSelector(selectAuth);
  const [notFound, setNotFound] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [getShareImage] = useGetShareImageMutation();
  // const [getAllCategories,{isLoading}] = useGetAllCategoriesMutation();
  const [videoData, setVideoData] = useState(null);
  const [videoLoading, SetVideoLoading] = useState(false);
  // const { id } = useParams();
  // const navigate = useNavigate();
  const router = useRouter();
  const pathname = usePathname();

  // const location = useLocation();
  const isFreePage = pathname.includes("free-video");

  const fetchVideo = async () => {
    try {
      SetVideoLoading(true);
      const data = isFreePage
        ? await getFreeVideoById(id).unwrap()
        : await getVideoById(id).unwrap();
      SetVideoLoading(false);
      console.log(data);
      if (data?.status === 404) {
        setNotFound(true);
      } else {
        setVideoData(data?.video);
      }
    } catch (error) {
      SetVideoLoading(false);
      console.log(error);
      if (error?.status === 404 || error?.status === 500) {
        setNotFound(true);
      }
      if (error?.status === 402) {
        // toast.error("Please buy a subscription plan to watch this video");
        router.push("/auth/billing");
      }
      // getError(error);
    }
  };

  const handleShare = async () => {
    try {
      const response = await axios.post(
        `${baseAddr}/fetch-image`,
        {
          link: `${imgAddr}/${videoData?.thumbnail_url}`,
        },
        {
          responseType: "blob",
        }
      );

      const blob = response.data;
      const file = new File([blob], "image.png", { type: "image/png" });
      await navigator.share({
        title: "Video:",
        url: window.location.href,
        files: [file],
      });
    } catch (error) {
      console.error("Error sharing:", error);
      await navigator.share({
        title: "Video:",
        url: window.location.href,
      });
    }
  };

  useEffect(() => {
    if (id) {
      fetchVideo();
      setNotFound(false);
      window.scrollTo(0, 0);
      setExpanded(false);
    } else {
      router.push("/auth/billing");
    }
  }, [id]);

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <>
      {notFound ? (
        <Container className="video-container text-white d-flex justify-content-center align-items-center p-5">
          <h1>Video not found</h1>
        </Container>
      ) : (
        <section className="">
          {videoLoading ? (
            <div className="video-container text-white d-flex justify-content-center align-items-center">
              <Spinner
                variant="border"
                style={{ height: "5rem", width: "5rem", borderWidth: "0.5rem" }}
              />
            </div>
          ) : (
            <div>
              {videoData && (
                <VideoPlayer
                  source={videoData?.video_url}
                  poster={videoData?.thumbnail_url}
                />
              )}
            </div>
          )}

          <Container className="text-white py-2">
            <Row>
              {videoLoading ? (
                <>
                  <Col>
                    <Skeleton width={"50%"} height={"1.5rem"} />
                    <Skeleton count={3} />
                    <Skeleton width={"25%"} />
                  </Col>
                </>
              ) : (
                <Col className="py-4">
                  <h3 className="fw-bold">{videoData?.title}</h3>

                  <div
                    style={{
                      maxHeight: `${expanded ? "100%" : "50px"}`,
                      transition: "all 0.3s",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{ fontSize: "0.9rem" }}
                      dangerouslySetInnerHTML={createMarkup(
                        videoData?.description
                      )}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "1px",
                        backgroundColor: "gray",
                      }}
                    />
                    <Button
                      onClick={() => {
                        if (expanded) {
                          window.scrollTo(0, 0);
                        }
                        setExpanded(!expanded);
                      }}
                      variant="transparent"
                      className="border rounded-pill text-nowrap text-white px-2 my-1 py-0"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {expanded ? "See Less" : "See More"}
                    </Button>
                    <div
                      style={{
                        width: "100%",
                        height: "1px",
                        backgroundColor: "gray",
                      }}
                    />
                  </div>

                  <Row>
                    <Col xs={6} className="text-secondary fw-bold">
                      <p>
                        {videoData?.genres
                          ?.map((genre) => genre?.name)
                          .join(" | ")}{" "}
                        |{" "}
                        {videoData?.createdAt &&
                          new Date(videoData?.createdAt).toLocaleDateString(
                            "en-GB"
                          )}{" "}
                        | {videoData?.language?.name}{" "}
                      </p>
                    </Col>
                    <Col className="text-end">
                      {/* {videoData?.views} Views  */}
                      <Button
                        disabled={!videoData?.title}
                        className="rounded-pill mx-md-3 mx-1"
                        variant="secondary"
                        onClick={handleShare}
                      >
                        <PiShareFatLight size={20} /> Share
                      </Button>
                    </Col>
                  </Row>
                </Col>
              )}
            </Row>
          </Container>
        </section>
      )}

      {/* <VideoCarousel data={allVideos} loading={isLoading}/> */}
      {isFreePage ? null : <AllCategories />}
    </>
  );
}

export default VideoPage;

// function VideoPage() {
//   return (
//     <section className='full-section account-bg d-flex justify-content-center align-items-center'>
//         <Container>
//       <h1 className='text-white display-2 text-center'>Video Page, Under Construction </h1>
//       <Row>
//         <Col className='text-center'>
//         <LuConstruction size={200} color='#CAA257'/>

//         </Col>
//       </Row>
//       </Container>
//       </section>
//   )
// }

//  export default VideoPage
