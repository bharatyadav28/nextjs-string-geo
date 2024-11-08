import React, { Suspense } from "react";

import MobilePaymentRedirection from "@/ClientPages/MobilePaymentRedirection";
function MobilePaymentRedirectionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {" "}
      <MobilePaymentRedirection />
    </Suspense>
  );
}

export default MobilePaymentRedirectionPage;
