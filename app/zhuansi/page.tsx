import type { Metadata } from "next";
import { Breadcrumbs, Cta, PageHero, SiteShell } from "@/components/site-shell";
import { StructuredData } from "@/components/structured-data";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "阿语专四备考说明",
  description: "阿拉伯语专业四级备考的公开说明：词汇基础、近反义词辨析、专项训练与复习节奏。",
  alternates: { canonical: "/zhuansi" },
  openGraph: { title: "阿语专四备考说明", description: "从词汇基础到专项训练，建立连续的阿语专四备考节奏。", url: "/zhuansi" },
};

const modules = [
  ["词汇基础", "把常见词义、词形和基本用法放在第一层，减少做题时的无效猜测。"],
  ["近反义词辨析", "不仅记住中文释义，还要留意语义范围、使用场景和容易混淆的选项。"],
  ["历年专项训练", "按年份观察题目表达方式，用稳定练习建立对考查形式的熟悉度。"],
  ["复习与回流", "把不确定内容重新带回后续学习，而不是做完一次就永久跳过。"],
] as const;

export default function ZhuansiPage() {
  return <SiteShell>
    <StructuredData data={{
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "阿语专四备考说明",
      description: metadata.description,
      inLanguage: "zh-CN",
      mainEntityOfPage: absoluteUrl("/zhuansi"),
      about: ["阿拉伯语专业四级", "阿拉伯语词汇学习", "近义词与反义词"],
    }} />
    <main>
      <Breadcrumbs current="专四说明" />
      <PageHero eyebrow="ARABIC TEM-4" title="阿语专四备考，不只是把词背得更多。" intro="词汇量是基础，辨析能力、训练反馈和持续复习共同决定了学习能否真正转化为稳定表现。" />
      <section className="contentSection">
        <div className="sectionTitle"><span>核心结构</span><h2>四个互相连接的训练模块</h2></div>
        <div className="moduleGrid">
          {modules.map(([title, text], index) => <article key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>
      <section className="contentSection split dark">
        <div className="sectionTitle"><span>节奏建议</span><h2>用小周期代替临时突击</h2></div>
        <div className="prose">
          <p>可以把一次学习拆成三个部分：少量新内容、当前专项训练、当天错误与不确定内容的回看。每部分不必很长，但要保留连续性。</p>
          <p>当某一阶段错误明显增加时，先减少新增内容，而不是单纯延长学习时间。稳定理解比短期完成数量更重要。</p>
          <aside>本页面只提供一般学习建议，不发布考试原题、标准答案或任何主管机构内部信息。</aside>
        </div>
      </section>
      <Cta />
    </main>
  </SiteShell>;
}
