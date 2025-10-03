// myntraScraper.js
import puppeteer from "puppeteer";

export async function scrapeMyntra(productName) {
  const searchUrl = `https://www.myntra.com/${encodeURIComponent(productName)}`;
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
    );
    await page.goto(searchUrl, { waitUntil: "networkidle2", timeout: 60000 });
    await page.waitForSelector("li.product-base", { timeout: 30000 });

    const products = await page.$$eval("li.product-base", (items) =>
      items.map((el) => {
        const brand = el.querySelector("h3.product-brand")?.innerText.trim() || "";
        const name = el.querySelector("h4.product-product")?.innerText.trim() || "";

        let price =
          el.querySelector("span.product-discountedPrice")?.innerText.trim() ||
          el.querySelector("span.product-price")?.innerText.trim() ||
          el.querySelector("div.product-price span")?.innerText.trim() ||
          "";
        price = price.replace(/Rs\.?/i, "").replace(/[^\d]/g, "");
        const priceNumber = price ? Number(price) : null;

        const linkEl = el.querySelector("a");
        const link = linkEl ? linkEl.href : null;

        return {
          title: `${brand} ${name}`,
          price: priceNumber !== null ? priceNumber : "Not Available",
          link,
        };
      })
    );

    return products;
  } catch (err) {
    console.error("❌ Error scraping Myntra:", err.message);
    return [];
  } finally {
    await browser.close();
  }
}
