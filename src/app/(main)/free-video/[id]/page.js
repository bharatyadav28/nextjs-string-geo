import React from "react";
import { headers } from "next/headers";

import VideoPage from "@/ClientPages/VideoPage";

// Generate metadata for the video page
export async function generateMetadata({ params }, parent) {
  const rVideo = await fetch(
    `https://api.stringgeo.com/api/free-video/get-video/${params.id}`
  );

  const videoData = await rVideo.json();

  const rThumbnail = await fetch(`https://api.stringgeo.com/api/fetch-image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      link: "https://dewv7gdonips4.cloudfront.net/uploads/user-668e5194d73df6053315bb41/profile/1726149009101-Sahebstrailertelugu.jpg.webp",
    }),
  });

  // const thumbnailData = await rThumbnail.json();

  console.log("videodatataa", videoData);
  console.log("thumbnail", await rThumbnail.blob());

  const thumbnailUrl =
    "https://dewv7gdonips4.cloudfront.net/uploads/user-668e5194d73df6053315bb41/profile/1726149009101-Sahebstrailertelugu.jpg.webp";

  return {
    title: videoData.title,
    description: videoData.description,
    openGraph: {
      title: videoData.title,
      description: videoData.description,
      images: [
        {
          url: thumbnailUrl,
          width: 1200,
          height: 630,
          alt: videoData.title,
        },
      ],
      // Specify the type as 'video.other' for video content
      type: "video.other",
      videos: [
        {
          url: videoData.video_url, // Add if you want to enable video preview
          width: 1280,
          height: 720,
          type: "video/mp4",
        },
      ],
    },
    // Twitter Card metadata
    twitter: {
      card: "summary_large_image",
      title: videoData.title,
      description: videoData.description,
      images: [thumbnailUrl],
    },
    // Other metadata
    // Add this section to include the thumbnail for WhatsApp sharing
    "whatsapp-catalog-image": {
      url: thumbnailUrl,
      width: 1200,
      height: 630,
    },
  };
}

async function Page({ params }) {
  const id = (await params).id;
  return <VideoPage id={id} />;
}

export default Page;
