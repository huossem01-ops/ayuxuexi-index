import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, Cta, PageHero, SiteShell } from "@/components/site-shell";
import { StructuredData } from "@/components/structured-data";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "阿拉伯语学习与备考指南",
  description: "面向中文母语学习者的阿拉伯语学习指南：确定目标、安排词汇与专项训练、建立稳定复习循环。",
  alternates: { canonical: "/guide" },
  openGraph: { title: "阿拉伯语学习与备考指南", description: "建立清晰、可持续的阿语学习节奏。", url: "/guide" },
};

const steps = [
  ["先确定训练目标", "把目标缩小到可以执行的范围，例如近反义词辨析、基础词汇巩固或按年份完成专项训练。"],
  ["新内容与复习并行", "每天既接触少量新内容，也回看已经标记为不确定的内容，避免只追求数量。"],
  ["用结果调整节奏", "连续答错或反复遗忘时，降低当天新增量，把时间留给真正薄弱的部分。"],
  ["保留稳定的入口", "尽量在同一浏览器和设备上学习，让本机进度能够连续承接。"],
] as const;

export default function GuidePage() {
  return <SiteShell>
    <StructuredData data={{
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "阿拉伯语学习与备考指南",
      description: metadata.description,
      inLanguage: "zh-CN",
      mainEntityOfPage: absoluteUrl("/guide"),
      publisher: { "@type": "Organization", name: "阿语百宝箱" },
    }} />
    <main>
      <Breadcrumbs current="备考指南" />
      <PageHero eyebrow="LEARNING GUIDE" title="把零散努力，整理成一条能坚持的路。" intro="真正有效的备考，不是一次塞进更多内容，而是明确下一步、留下反馈，再稳定地回来。" />
      <section className="contentSection split">
        <div className="sectionTitle"><span>01</span><h2>一个简单的学习循环</h2></div>
        <ol className="stepList">
          {steps.map(([title, text], index) => <li key={title}><b>0{index + 1}</b><div><h3>{title}</h3><p>{text}</p></div></li>)}
        </ol>
      </section>
      <section className="contentSection warm">
        <div className="sectionTitle"><span>02</span><h2>按当前状态选择入口</h2></div>
        <div className="cardGrid">
          <article><p>目标明确</p><h3>准备阿语专四</h3><span>先了解专项训练、词汇积累与复习安排之间的关系。</span><Link href="/zhuansi">查看专四说明 →</Link></article>
          <article><p>刚开始使用</p><h3>了解学习记录</h3><span>确认进度保存方式、设备限制以及常见使用问题。</span><Link href="/faq">查看常见问题 →</Link></article>
          <article><p>了解项目</p><h3>内容与隐私边界</h3><span>了解公开资料与完整学习应用为什么采用物理隔离。</span><Link href="/about">查看项目说明 →</Link></article>
        </div>
      </section>
      <Cta />
    </main>
  </SiteShell>;
}
