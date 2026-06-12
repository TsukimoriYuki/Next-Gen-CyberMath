import { redirect } from "next/navigation";

// 旧「授業スキルツリー」は「講座集」（/courses）に統合されました。
// 個別の授業ページ /lessons/[slug] は引き続き利用可能です。
export default function LessonsRedirectPage() {
  redirect("/courses");
}
