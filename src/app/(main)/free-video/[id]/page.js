import React from "react";

import VideoPage from "@/ClientPages/VideoPage";

async function Page({ params }) {
  const id = (await params).id;
  return <VideoPage id={id} />;
}

export default Page;
