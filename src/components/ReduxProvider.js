"use client";
import React, { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { SkeletonTheme } from "react-loading-skeleton";
import Aos from "aos";

import Header from "@/components/Header";

import store from "@/store";
import Footer from "./Footer";
function ReduxProvider({ children }) {
  const pathname = usePathname();
  const isAccountPage = pathname.includes("account");
  const isAuthPage = pathname.includes("auth");
  const isShortsPage = pathname.match("/shorts");

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <GoogleOAuthProvider clientId="6324397489-81envusj0p5170flss2evhqec45o4kfo.apps.googleusercontent.com">
      <Provider store={store}>
        {!isShortsPage && <Header />}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 5000 }}
        />
        <SkeletonTheme
          baseColor="rgba(0,0,0,0.1)"
          highlightColor="rgba(250,250,250,0.1)"
          enableAnimation={true}
          duration={1}
        ></SkeletonTheme>

        {children}
        {isAccountPage || isAuthPage || isShortsPage ? null : <Footer />}
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default ReduxProvider;
