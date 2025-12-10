import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "24bitColors",
    short_name: "24bitColors",
    description: "20の質問であなたの好きな色を1677万色の中から特定します。",
    start_url: "/",
    display: "standalone",
    background_color: "#E8E8E8",
    theme_color: "#E8E8E8",
    icons: [
      {
        src: "/icon",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
