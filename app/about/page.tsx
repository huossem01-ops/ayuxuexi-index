import type { Metadata } from "next";
import { Breadcrumbs, Cta, PageHero, SiteShell } from "@/components/site-shell";
import { StructuredData } from "@/components/structured-data";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于阿语百宝箱",
  description: "了解阿语百宝箱的项目定位、公开内容边界、数据保护方式与独立项目声明。",
  alternates: { canonical: "/about" },
  openGraph: { title: "关于阿语百宝箱", description: "项目定位、公开内容边界与数据保护说明。", url: "/about" },
};

export default function AboutPage() {
  return <SiteShell>
    <StructuredData data={{
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "阿语百宝箱",
      url: absoluteUrl("/"),
      description: "面向中文母语学习者的阿语专四备考与词汇学习工具。",
    }} />
    <main>
      <Breadcrumbs current="关于项目" />
      <PageHero eyebrow="ABOUT" title="让阿语学习更有方向，也更尊重内容边界。" intro="阿语百宝箱是一个独立学习项目。完整学习应用与公开资料采用两个物理隔离的代码仓库，由同一域名提供连续体验。" />
      <section className="contentSection split">
        <div className="sectionTitle"><span>项目定位</span><h2>完整应用与公开资料，各自承担清晰职责</h2></div>
        <div className="prose">
          <h3>完整学习应用</h3><p>负责真题训练、词汇学习和本机进度，相关代码与数据保存在私密仓库。</p>
          <h3>公开资料</h3><p>负责学习指南、常见问题和项目说明，不包含完整词库、原题、答案或私密接口。</p>
        </div>
      </section>
      <section className="contentSection warm">
        <div className="sectionTitle"><span>数据原则</span><h2>公开仓库的明确禁区</h2></div>
        <ul className="boundaryList">
          <li><b>不包含</b><span>完整词库、历年原题、答案与私有解析</span></li>
          <li><b>不连接</b><span>私密仓库、运行数据库或学习进度</span></li>
          <li><b>不收集</b><span>公开资料页不写入刷题与背词进度</span></li>
          <li><b>不代表</b><span>任何考试主管机构或官方组织</span></li>
        </ul>
      </section>
      <Cta />
    </main>
  </SiteShell>;
}
