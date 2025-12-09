import { Metadata } from "next";
import FeedbackClient from "./FeedbackClient";

export const metadata: Metadata = {
  title: "アルゴリズムへのフィードバック",
  description:
    "診断精度向上のための詳細なフィードバックを受け付けています。あなたのデータが次世代のアルゴリズムを進化させます。",
};

export default function FeedbackPage() {
  return <FeedbackClient />;
}
