import React from 'react'
import { Col, Row } from 'react-bootstrap'
import VideoCard from './VideoCard'

function VideoMapper({data}) {

    console.log(data);

  return (
    <Row xs={2}  md={3}  className="mx-md- px-lg-1 videos-mapper">
        {data?.map((video, index) => (
          <Col key={index} className="p-md-2 d-flex p-1 align-items-center justify-content-center">
            <VideoCard
            id={video?._id}
              title={video?.title}
              description={video?.description}
            //   keywords={video?.tags.join(" | ")}
              thumbnail_url={video?.thumbnail_url}
              genres={video?.genres?.name?.join(" | ")}
              date={new Date(video?.createdAt).toLocaleDateString('en-GB')}
              language={video?.language?.name}
            />
          </Col>
        ))}
      </Row>
  )
}

export default VideoMapper