import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const out = new URL("../out/", import.meta.url);

async function page(name) {
  return readFile(new URL(`${name}.html`, out), "utf8");
}

test("exports only the approved public content routes", async () => {
  await Promise.all(["faq", "guide", "zhuansi", "about"].map((name) => access(new URL(`${name}.html`, out))));
  await assert.rejects(access(new URL("index.html", out)));
});

test("uses same-domain canonicals and isolated static assets", async () => {
  const pages = await Promise.all(["faq", "guide", "zhuansi", "about"].map(page));
  pages.forEach((html, index) => {
    const route = ["faq", "guide", "zhuansi", "about"][index];
    assert.match(html, new RegExp(`rel="canonical" href="https://ayuxuexi\\.com/${route}"`));
    assert.match(html, /\/_seo\/_next\/static\//);
    assert.match(html, /href="\/"/);
    assert.doesNotMatch(html, /app\.ayuxuexi\.com|www\.ayuxuexi\.com/);
  });
});

test("exports discovery files with the intended ownership boundary", async () => {
  const [robots, sitemap, llms] = await Promise.all([
    readFile(new URL("robots.txt", out), "utf8"),
    readFile(new URL("sitemap.xml", out), "utf8"),
    readFile(new URL("llms.txt", out), "utf8"),
  ]);
  assert.match(robots, /Disallow: \/api\//);
  assert.match(sitemap, /https:\/\/ayuxuexi\.com\/guide/);
  assert.match(sitemap, /https:\/\/ayuxuexi\.com\/training/);
  assert.match(llms, /公开资料页不读取或修改完整应用的学习进度/);
});
