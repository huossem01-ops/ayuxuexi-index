export const site = {
  name: "阿语百宝箱",
  origin: "https://ayuxuexi.com",
  description: "面向中文母语学习者的阿语专四备考与词汇学习工具。",
} as const;

export const publicRoutes = ["/faq", "/guide", "/zhuansi", "/about"] as const;

export function absoluteUrl(path: string) {
  return new URL(path, site.origin).toString();
}
