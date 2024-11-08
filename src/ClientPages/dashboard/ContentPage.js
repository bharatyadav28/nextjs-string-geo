import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import VideoCard from "../../components/VideoCard";
import { FaArrowLeftLong } from "react-icons/fa6";
// import { Link } from 'react-router-dom'

function ContentPage() {
  const img1 = "../../images/img1.png";
  const img2 = "../../images/img2.png";
  const img3 = "../../images/img3.png";
  const img4 = "../../images/img4.png";
  const img5 = "../../images/img5.png";
  const img6 = "../../images/img6.png";

  const videoData = [
    {
      id: 1,
      title: "Video 1",
      description: "Description for Video 1",
      tags: ["Cultural", "20 Nov 2023", "Marathi"],
      thumbnailUrl: img1,
      videoUrl: "url_for_video_1",
    },
    {
      id: 2,
      title: "Video 2",
      description:
        "lorem ipsum lorem ipsum hrtion ghyyit paor jgiopa frit adgioa lajape drforka adss",
      tags: ["Facts", "20 Dec 2021", "Hindi"],
      thumbnailUrl: img2,
      videoUrl: "url_for_video_2",
    },
    {
      id: 3,
      title: "Video 3",
      description: "Description for Video 3",
      tags: ["Cultural", "20 Nov 2023", "English"],
      thumbnailUrl: img3,
      videoUrl: "url_for_video_3",
    },
    {
      id: 4,
      title: "Video 4",
      description: "Description for Video 4",
      tags: ["News", "01 May 2020", "Marathi"],
      thumbnailUrl: img4,
      videoUrl: "url_for_video_4",
    },
    {
      id: 5,
      title: "Video 5",
      description: "Description for Video 5",
      tags: ["Facts", "17 March 2023", "Marathi"],
      thumbnailUrl: img5,
      videoUrl: "url_for_video_5",
    },
    {
      id: 6,
      title: "Video 6",
      description: "Description for Video 6",
      tags: ["Cultural", "10 Jan 2023", "Hindi"],
      thumbnailUrl: img6,
      videoUrl: "url_for_video_6",
    },
    {
      id: 1,
      title: "Video 1",
      description: "Description for Video 1",
      tags: ["Cultural", "20 Nov 2023", "Marathi"],
      thumbnailUrl: img1,
      videoUrl: "url_for_video_1",
    },
    {
      id: 2,
      title: "Video 2",
      description:
        "lorem ipsum lorem ipsum hrtion ghyyit paor jgiopa frit adgioa lajape drforka adss",
      tags: ["Facts", "20 Dec 2021", "Hindi"],
      thumbnailUrl: img2,
      videoUrl: "url_for_video_2",
    },
    {
      id: 3,
      title: "Video 3",
      description: "Description for Video 3",
      tags: ["Cultural", "20 Nov 2023", "English"],
      thumbnailUrl: img3,
      videoUrl: "url_for_video_3",
    },
    {
      id: 4,
      title: "Video 4",
      description: "Description for Video 4",
      tags: ["News", "01 May 2020", "Marathi"],
      thumbnailUrl: img4,
      videoUrl: "url_for_video_4",
    },
    {
      id: 5,
      title: "Video 5",
      description: "Description for Video 5",
      tags: ["Facts", "17 March 2023", "Marathi"],
      thumbnailUrl: img5,
      videoUrl: "url_for_video_5",
    },
    {
      id: 6,
      title: "Video 6",
      description: "Description for Video 6",
      tags: ["Cultural", "10 Jan 2023", "Hindi"],
      thumbnailUrl: img6,
      videoUrl: "url_for_video_6",
    },
  ];

  return (
    <section className="p-3  account-bg full-section ">
      <h3 className="text-white text-center fw-bold">Popular Content</h3>
      {/* <Link to={-1} className='text-white'> <FaArrowLeftLong/> Go back </Link> */}

      <Row xs={2} sm={2} md={3} lg={4} xl={5} className="mx-4 mt-5 ">
        {/* Map through the videoData array and render VideoCard for each item */}
        {videoData?.map((video, index) => (
          <Col key={index} className="my-2">
            <VideoCard
              title={video.title}
              description={video.description}
              tags={video.tags.join(" | ")}
              thumbnailUrl={video.thumbnailUrl}
              videoUrl={video.videoUrl}
            />
          </Col>
        ))}
      </Row>
    </section>
  );
}

export default ContentPage;
