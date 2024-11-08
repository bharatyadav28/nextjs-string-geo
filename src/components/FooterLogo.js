import React from "react";
import { Image } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";

function FooterLogo() {
  // const navigate = useNavigate();
  const router = useRouter();

  return (
    <Image
      style={{ cursor: "pointer", maxHeight: "45px" }}
      fluid
      onClick={() => router.push("/")}
      src="/logo/string-geo-logo-white.png"
    />
  );
}

export default FooterLogo;
