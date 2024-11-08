import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import "./ShortsCard.css";
import { imgAddr } from "../features/api";
// import { useNavigate } from 'react-router-dom'
import { useRouter } from "next/navigation";
function ShortsCard({ id, description, thumbnailUrl }) {
  const thumbnail = `${imgAddr}/${thumbnailUrl}`;

  // const navigate = useNavigate();
  const router = useRouter();

  const handleClick = () => {
    console.log(id);
    router.push(`/shorts/${id}`);
  };

  return (
    <Card
      className="shorts-card rounded-4 border-0 bg-transparent d-flex justify-content-end"
      style={{
        backgroundImage: `url(${thumbnail})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
      onClick={handleClick}
    >
      {/* <Image src={thumbnailUrl} alt={title} className="shorts-thumbnail"  /> */}

      {/* <Row className='p-2 text-white search-glass ' 
    //   style={{position:'absolute',bottom:'0'}}
      > */}
      {/* <Col > */}
      <div
        className="p-2 text-white rounded-bottom-4"
        style={{ backdropFilter: "blur(5px)", height: "15%" }}
      >
        <p className="" style={{ fontSize: "0.8rem" }}>
          {description}
        </p>
      </div>

      {/* </Col>
        </Row> */}
    </Card>
  );
}

export default ShortsCard;
