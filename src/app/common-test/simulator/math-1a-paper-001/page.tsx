import { redirect } from "next/navigation";

// 旧「冊子画像 + Webマークシート」実装。手動作成PDF正本の第1回へ一本化したため、
// このURLは常に新しい正本へ誘導する。
export default function Math1APaper001Page() {
  redirect("/common-test/simulator/common-test-math-1a-manual-001");
}
