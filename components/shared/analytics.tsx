"use client";

import { hotjar } from "react-hotjar";
import { init as initFullStory, FullStory } from "@fullstory/browser";

export default function ClientAnalytics() {

   initFullStory({ orgId: "o-1XVGW4-na1" });

   FullStory("trackEvent", {
     name: "Ziran Init",
     properties: {
       myprop: "somedata",
     },
   });

   hotjar.initialize({ id: 4956812, sv: 6 });

  return (
    <></>
  );
}
