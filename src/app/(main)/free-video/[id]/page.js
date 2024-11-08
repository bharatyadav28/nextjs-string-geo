import React from "react";
import { headers } from "next/headers";

import VideoPage from "@/ClientPages/VideoPage";

// Generate metadata for the video page
export async function generateMetadata({ params }, parent) {
  const rVideo = await fetch(
    `https://api.stringgeo.com/api/free-video/get-video/${params.id}`
  );

  const { video } = await rVideo.json();

  console.log("videodatataa", video);

  const thumbnailUrl = `https://dewv7gdonips4.cloudfront.net/${video.thumbnail_url}`;

  console.log("thumbnail_url", thumbnailUrl);
  return {
    title: video.title.substring(0, 100),
    description: video.description,
    openGraph: {
      title: video.title,
      description: video.description,
      images: [
        {
          url: thumbnailUrl,
          width: 1200,
          height: 630,
          alt: video.title,
        },
      ],
      // Specify the type as 'video.other' for video content
      type: "video.other",
      videos: [
        {
          url: video.video_url, // Add if you want to enable video preview
          width: 1280,
          height: 720,
          type: "video/mp4",
        },
      ],
    },
    // Twitter Card metadata
    twitter: {
      card: "summary_large_image",
      title: video.title,
      description: video.description,
      images: [thumbnailUrl],
    },
  };
}

async function Page({ params }) {
  const id = (await params).id;
  return <VideoPage id={id} />;
}

export default Page;
