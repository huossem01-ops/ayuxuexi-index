import Link from "next/link";

export default function NotFound() {
  return <main className="notFound"><span>404</span><h1>没有找到这份公开资料</h1><p>你可以查看学习指南，或者返回完整刷题应用。</p><div><Link href="/guide">查看学习指南</Link><a href="/">返回刷题应用</a></div></main>;
}
