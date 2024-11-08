import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
// import { useNavigate } from 'react-router-dom'
import { useRouter } from "next/navigation";
import VideoCard from "./VideoCard";
import { useGetWhateverywhereMutation } from "../features/api";
import VideoMapper from "./VideoMapper";
import { clickSubBtn } from "../utils/functions";

function WatchEverywhere() {
  // const navigate = useNavigate();
  const router = useRouter();
  const [getWhateverywhere, { isLoading }] = useGetWhateverywhereMutation();
  const [videoData, setVideoData] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getWhateverywhere().unwrap();

      setVideoData(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <Container className="py-md-5">
        <Row className="mx-md-5">
          <Col className="p-3" md={5}>
            <h1 className="text-white my-md-4 nexa-heavy">Watch Everywhere</h1>
            <p className="text-white  my-md-5 ">
              Our OTT platform is your gateway to a treasure trove of unique
              narratives. Spanning the rich topestry of Bharat’s heritage and
              contemporary life.
            </p>
            <Button
              size="md"
              variant="transparent"
              className="sub-btn my-3 fs-5 px-5 fw-bold"
              onClick={() => {
                // navigate('/auth/signup')
                clickSubBtn();
              }}
            >
              Get Started
            </Button>
          </Col>
          <Col>
            {/* <Image fluid src='images/vidcollage.svg' /> */}
            {/* {videoData &&
                   <VideoMapper data={videoData?.video_array}/>

         } */}

            <Row xs={2} md={3} className="mx-md- px-lg-1 videos-mapper">
              {videoData?.video_array?.map((data, index) => (
                <Col
                  key={data?.video?._id}
                  className="p-md-2 d-flex p-1 align-items-center justify-content-center"
                >
                  <VideoCard
                    id={data?.video?._id}
                    title={data?.video?.title}
                    description={data?.video?.description}
                    // tags={video.tags.join(" | ")}
                    thumbnail_url={data?.video?.thumbnail_url}
                    // videoUrl={video.videoUrl}
                    access={data?.video?.access}
                    genres={data?.video?.genres[0]?.name}
                    date={new Date(data?.video?.createdAt).toLocaleDateString(
                      "en-GB"
                    )}
                    language={data?.video?.language?.name}
                    loading={isLoading}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default WatchEverywhere;
