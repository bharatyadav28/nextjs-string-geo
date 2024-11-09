import React from "react";
import VideoPage from "@/ClientPages/VideoPage";

// Generate metadata for the video page
export async function generateMetadata({ params }) {
  // Fetch the video data
  const rVideo = await fetch(
    `https://api.stringgeo.com/api/free-video/get-video/${params.id}`
  );
  const { video } = await rVideo.json();

  // Thumbnail URL Generated
  const thumbnailUrl = `https://dewv7gdonips4.cloudfront.net/${video.thumbnail_url}`;

  console.log("thumbnailUrl", thumbnailUrl);

  return {
    title: video.title.substring(0, 100),
    description: video.description,
    openGraph: {
      type: "video.other",
      title: video.title,
      description: video.description,
      images: [
        {
          url: thumbnailUrl,
          width: 1200, // Set standard width
          height: 630, // Set standard height
        },
      ],
      // url: `https://your-domain.com/video/${video.id}`,
      videos: [
        {
          url: video.video_url,
          width: 1280,
          height: 720,
          type: "video/mp4",
        },
      ],
    },
    twitter: {
      card: "player",
      title: video.title,
      description: video.description,
      images: [thumbnailUrl],
      player: video.video_url,
      playerWidth: 1280,
      playerHeight: 720,
    },
  };
}

async function Page({ params }) {
  const id = params.id;
  // return <div>video page</div>;
  return <VideoPage id={id} />;
}

export default Page;
