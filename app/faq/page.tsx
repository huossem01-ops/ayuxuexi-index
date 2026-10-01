import type { Metadata } from "next";
import { Breadcrumbs, Cta, PageHero, SiteShell } from "@/components/site-shell";
import { StructuredData } from "@/components/structured-data";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "常见问题",
  description: "阿语百宝箱常见问题：适用人群、学习模式、本机进度、设备更换、隐私与项目性质。",
  alternates: { canonical: "/faq" },
  openGraph: { title: "阿语百宝箱常见问题", description: "了解学习模式、进度保存和内容边界。", url: "/faq" },
};

const faqs = [
  ["阿语百宝箱适合谁？", "主要面向阿拉伯语专业四级备考者，也适合希望巩固阿拉伯语词汇和近反义词辨析的中文母语学习者。"],
  ["需要安装软件或注册账号吗？", "当前版本通过浏览器使用，不要求安装独立软件。是否需要访问权限，以完整学习应用当时的开放方式为准。"],
  ["学习进度保存在哪里？", "进度默认保存在当前浏览器的本机存储中。只要域名、浏览器数据和进度结构保持不变，重新打开网站时可以继续原来的位置。"],
  ["更换设备后进度会自动同步吗？", "当前没有账号级云同步。更换设备、浏览器或清理浏览器数据后，原设备上的本地进度可能无法自动迁移。"],
  ["公开资料页会读取学习进度吗？", "不会。公开资料页与完整学习应用物理隔离，不读取、不修改浏览器里的刷题和背词进度。"],
  ["这是官方考试网站吗？", "不是。阿语百宝箱是独立学习项目，不代表任何考试主管机构。具体考试安排和要求应以相关主管机构发布的信息为准。"],
] as const;

export default function FaqPage() {
  return <SiteShell>
    <StructuredData data={{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      url: absoluteUrl("/faq"),
      mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
    }} />
    <main>
      <Breadcrumbs current="常见问题" />
      <PageHero eyebrow="FAQ" title="关于使用、进度与内容边界。" intro="这里回答公开信息层面最常见的问题，不展示任何私密题库或词库内容。" />
      <section className="contentSection faqSection">
        {faqs.map(([question, answer], index) => <article key={question}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{question}</h2><p>{answer}</p></div></article>)}
      </section>
      <Cta />
    </main>
  </SiteShell>;
}
