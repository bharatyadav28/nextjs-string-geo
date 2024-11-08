import React from "react";
import { Image } from "react-bootstrap";
// import { useNavigate } from 'react-router-dom'
import { useRouter } from "next/navigation";

function HeaderLogo({ maxHeight, height }) {
  // const navigate = useNavigate();
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("")}
      src={"/logo/string-geo-logo-white.png"}
      alt="String Geo"
      style={{
        maxHeight: `${maxHeight}`,
        height: `${height}`,
        cursor: "pointer",
      }}
      fluid
    />
  );
}

export default HeaderLogo;
