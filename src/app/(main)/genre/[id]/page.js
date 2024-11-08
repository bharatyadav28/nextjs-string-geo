import React from "react";

import VideoCollection from "@/ClientPages/VideoCollection";

async function GenrePage({ params }) {
  const id = (await params).id;

  return <VideoCollection id={id} />;
}

export default GenrePage;
