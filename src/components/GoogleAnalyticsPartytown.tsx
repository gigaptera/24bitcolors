"use client";

import Script from "next/script";

interface Props {
  gaId: string;
}

export const GoogleAnalyticsPartytown = ({ gaId }: Props) => {
  return (
    <>
      <Script
        type="text/partytown"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script type="text/partytown" id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
};
