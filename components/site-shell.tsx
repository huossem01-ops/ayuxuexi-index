import Link from "next/link";
import Image from "next/image";

const navigation = [
  ["备考指南", "/guide"],
  ["专四说明", "/zhuansi"],
  ["常见问题", "/faq"],
  ["关于项目", "/about"],
] as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  return <>
    <header className="siteHeader">
      <Link className="brand" href="/about">
        <Image src="/seo-assets/logo.png" alt="" width={40} height={40} priority />
        <span><strong>阿语百宝箱</strong><small>公开学习资料</small></span>
      </Link>
      <nav aria-label="公开资料导航">
        {navigation.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
      </nav>
      <a className="appLink" href="/">进入刷题应用 <span aria-hidden="true">↗</span></a>
    </header>
    {children}
    <footer>
      <div>
        <strong>阿语百宝箱</strong>
        <p>公开学习资料与项目说明。完整刷题应用位于网站首页。</p>
      </div>
      <nav aria-label="页脚导航">
        {navigation.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
      </nav>
      <p>独立学习项目，不代表任何考试主管机构。</p>
    </footer>
  </>;
}

export function Breadcrumbs({ current }: { current: string }) {
  return <nav className="breadcrumbs" aria-label="面包屑">
    <Link href="/guide">公开资料</Link><span>/</span><span aria-current="page">{current}</span>
  </nav>;
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return <section className="pageHero">
    <div className="heroGlow" aria-hidden="true" />
    <p className="eyebrow">{eyebrow}</p>
    <h1>{title}</h1>
    <p className="intro">{intro}</p>
  </section>;
}

export function Cta() {
  return <section className="cta">
    <div><p>准备好开始了吗？</p><h2>回到阿语百宝箱，继续你的学习进度。</h2></div>
    <a href="/">进入刷题应用 <span aria-hidden="true">↗</span></a>
  </section>;
}
