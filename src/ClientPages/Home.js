"use client";

import React from "react";
import HomeCarousel from "../components/HomeCarousel";
import HomeSearch from "../components/HomeSearch";
import HomeContent from "../components/HomeContent";
import { HomePackages } from "../components/HomePackages";
import HomeFAQ from "../components/HomeFAQ";
import HomeTrailer from "../components/HomeTrailer";
import WatchEverywhere from "../components/WatchEverywhere";

function Home() {
  return (
    <>
      <HomeCarousel />
      <HomeSearch />
      <HomeContent />
      <HomeTrailer />

      <HomePackages />
      <WatchEverywhere />
      <HomeFAQ />
    </>
  );
}

export default Home;
