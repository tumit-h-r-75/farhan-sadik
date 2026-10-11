// End-to-end check of the portfolio in Microsoft Edge (Playwright).
// Run the dev server first (npm run dev), then: node scripts/verify-portfolio.mjs
// Set PORTFOLIO_URL to test another address. Screenshots are written to .qa/.
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const baseURL = process.env.PORTFOLIO_URL || "http://127.0.0.1:5180";
const output = new URL("../.qa/", import.meta.url);
const artifact = (name) => fileURLToPath(new URL(name, output));
await mkdir(output, { recursive: true });

const EXPECT = {
  name: /Farhan Sadik\s+Susmit\./,
  title: /Farhan Sadik Susmit/,
  sections: ["top", "about", "education", "services", "experience", "exprovia", "process", "contact"],
  service: "Web Applications",
  whatsapp: "https://wa.me/8801714475386",
  email: "mailto:farhansusmit@gmail.com",
  linkedin: "https://www.linkedin.com/in/farhan-sadik-susmit-160646349/",
  facebook: "https://www.facebook.com/farhan.sadik.98031",
  instagram: "https://www.instagram.com/farhansusmit/",
  pastRole: "bKash Limited",
  lastStep: "Step 4: Regular updates",
};
const WIDTHS = [1440, 1280, 1024, 800, 768, 600, 390, 360, 320];

const browser = await chromium.launch({ channel: "msedge", headless: true });
const issues = [];
const watch = (page) => {
  page.on("pageerror", (error) => issues.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") issues.push(message.text());
  });
};
const context = await browser.newContext({
  viewport: { width: 1440, height: 960 },
  reducedMotion: "reduce",
});
await context.grantPermissions(["clipboard-read", "clipboard-write"], {
  origin: new URL(baseURL).origin,
});
const page = await context.newPage();
watch(page);

const checkpoint = (name) => console.log(`PASS ${name}`);
const isOpen = (locator) => locator.evaluate((element) => element.open);

async function assertFits(width) {
  await page.setViewportSize({ width, height: 960 });
  await page.waitForTimeout(150);
  const sizes = await page.evaluate(() => ({
    viewport: window.innerWidth,
    body: document.documentElement.scrollWidth,
    culprits: [...document.querySelectorAll("body *")]
      .filter((element) => element.getBoundingClientRect().right > window.innerWidth + 1)
      .slice(0, 8)
      .map((element) => `${element.tagName.toLowerCase()}.${String(element.className).trim().replace(/\s+/g, ".")}`),
  }));
  assert.ok(
    sizes.body <= sizes.viewport + 1,
    `Horizontal overflow at ${width}px: ${sizes.body}px (${sizes.culprits.join(", ")})`,
  );
}

async function captureSection(target, id, fileName) {
  await target.locator(`#${id}`).scrollIntoViewIfNeeded();
  await target.waitForTimeout(150);
  await target.screenshot({ path: artifact(fileName) });
}

try {
  // 1. Page, metadata, sections and anchors.
  const response = await page.goto(baseURL, { waitUntil: "networkidle" });
  assert.equal(response.status(), 200);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator("h1").count(), 1);
  assert.match(await page.locator("h1").innerText(), EXPECT.name);
  assert.match(await page.title(), EXPECT.title);
  for (const id of EXPECT.sections) {
    assert.equal(await page.locator(`#${id}`).count(), 1, `Missing section #${id}`);
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  }
  const badAnchors = await page
    .locator('a[href^="#"]')
    .evaluateAll((anchors) =>
      anchors
        .map((anchor) => anchor.getAttribute("href"))
        .filter((href) => !href || href === "#" || !document.getElementById(href.slice(1))),
    );
  assert.deepEqual(badAnchors, [], "Anchors without a target");
  const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
  assert.equal(schema["@type"], "Person");
  assert.deepEqual(schema.sameAs, [EXPECT.linkedin, EXPECT.facebook, EXPECT.instagram]);
  const footer = page.locator(".site-footer");
  assert.equal(await footer.getByRole("link", { name: /Facebook/ }).getAttribute("href"), EXPECT.facebook);
  assert.equal(await footer.getByRole("link", { name: /Instagram/ }).getAttribute("href"), EXPECT.instagram);
  assert.equal(await page.locator("text=TODO").count(), 0, "A TODO value is visible on the page");
  checkpoint("page, title, sections, anchors, JSON-LD, footer socials and no visible TODOs");

  // 2. Portrait and reduced motion.
  const portrait = page.locator(".portrait .tilted-card-img");
  assert.equal(await portrait.count(), 1);
  assert.ok(
    await portrait.evaluate((image) => image.complete && image.naturalWidth > 0),
    "Hero portrait did not load",
  );
  assert.deepEqual(
    await page.evaluate(() =>
      [
        [".portrait-glow", null],
        [".scroll-cue-line span", null],
        [".company", "::before"],
        [".pulse-dot", "::after"],
      ].map(([selector, pseudo]) => getComputedStyle(document.querySelector(selector), pseudo).animationName),
    ),
    ["none", "none", "none", "none"],
    "Looping animations still run under reduced motion",
  );
  assert.equal(
    await page.locator(".hero-lead").evaluate((element) => getComputedStyle(element.parentElement).visibility),
    "visible",
  );
  assert.equal((await page.locator(".company-figures dd").first().textContent()).trim(), "350+");
  checkpoint("portrait loads; reduced motion shows content, final figures and no looping animation");

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(150);
  await page.screenshot({ path: artifact("desktop-hero.png") });
  await captureSection(page, "about", "desktop-about.png");
  await captureSection(page, "services", "desktop-services.png");
  await captureSection(page, "experience", "desktop-experience.png");
  await captureSection(page, "exprovia", "desktop-company.png");
  await captureSection(page, "process", "desktop-process.png");
  await captureSection(page, "contact", "desktop-contact.png");
  await page.screenshot({ path: artifact("desktop-full.png"), fullPage: true });

  // 3. Service button, form validation, brief dialog.
  await page.getByRole("button", { name: `Discuss ${EXPECT.service}`, exact: true }).click();
  assert.equal(await page.locator('select[name="service"]').inputValue(), EXPECT.service);
  assert.equal(new URL(page.url()).hash, "#contact");
  const submit = page.getByRole("button", { name: "Prepare my project brief" });
  await submit.click();
  assert.equal(await isOpen(page.locator("dialog")), false, "Empty form opened the dialog");
  await page.getByLabel("Your name").fill("Portfolio QA");
  await page.getByLabel("Work email").fill("qa@example.test");
  await page.getByLabel("Business or website").fill("QA review");
  await page.getByLabel("Your timeline").selectOption("Within a month");
  const project = page.getByLabel("Your project", { exact: false }).first();
  await project.fill("Too short");
  await submit.click();
  assert.equal(await isOpen(page.locator("dialog")), false, "A 9-character project opened the dialog");
  await project.fill("We would like to discuss a custom business web application.");
  await submit.click();
  await page.getByRole("dialog").waitFor({ state: "visible" });
  const brief = await page.getByLabel("Prepared project brief").inputValue();
  assert.match(brief, /^Hi Farhan,/);
  assert.match(brief, /Name: Portfolio QA/);
  assert.match(brief, /Reply email: qa@example\.test/);
  assert.match(brief, new RegExp(`Interested in: ${EXPECT.service}`));
  assert.match(brief, /Timeline: Within a month/);
  assert.match(brief, /custom business web application/);
  await page.screenshot({ path: artifact("desktop-dialog.png") });

  await page.getByRole("button", { name: "Copy project brief", exact: true }).click();
  assert.equal((await page.evaluate(() => navigator.clipboard.readText())).replace(/\r\n/g, "\n"), brief);
  assert.match(await page.getByRole("status").innerText(), /Copied/);
  const whatsappBrief = await page.getByRole("link", { name: /Send on WhatsApp/ }).getAttribute("href");
  assert.ok(whatsappBrief.startsWith(`${EXPECT.whatsapp}?text=`), whatsappBrief);
  assert.equal(decodeURIComponent(whatsappBrief.split("?text=")[1]).replace(/\r\n/g, "\n"), brief);
  const emailBrief = await page.getByRole("link", { name: /Send by email/ }).getAttribute("href");
  assert.ok(emailBrief.startsWith(`${EXPECT.email}?subject=`), emailBrief);
  assert.equal(decodeURIComponent(emailBrief.split("&body=")[1]).replace(/\r\n/g, "\n"), brief);
  assert.equal(
    await page.getByRole("link", { name: /Open Farhan's LinkedIn/ }).getAttribute("href"),
    EXPECT.linkedin,
  );
  await page.keyboard.press("Escape");
  assert.equal(await isOpen(page.locator("dialog")), false, "Escape did not close the dialog");
  assert.equal(
    await page.evaluate(() => document.activeElement?.textContent?.trim()),
    "Prepare my project brief",
    "Focus did not return to the submit button",
  );
  await submit.click();
  await page.getByRole("dialog").waitFor({ state: "visible" });
  await page.mouse.click(8, 8);
  assert.equal(await isOpen(page.locator("dialog")), false, "Backdrop click did not close the dialog");
  checkpoint("service preselect, validation, brief, clipboard, WhatsApp/email/LinkedIn links, Escape, backdrop and focus");

  // 4. Experience disclosure, process stepper, contact channels.
  const pastRole = page.locator("details").filter({ hasText: EXPECT.pastRole });
  assert.equal(await isOpen(page.locator("details").first()), true, "First role is not open");
  await pastRole.locator("summary").click();
  assert.equal(await isOpen(pastRole), true);
  await pastRole.locator("summary").click();
  assert.equal(await isOpen(pastRole), false);

  const stepper = page.locator(".process-stepper");
  const activePane = stepper.locator(".stepper__pane:not(.stepper__pane--leaving)");
  await stepper.scrollIntoViewIfNeeded();
  assert.match(await activePane.innerText(), /goals, timeline and budget/);
  await stepper.getByRole("button", { name: "Next step" }).click();
  assert.match(await activePane.innerText(), /written scope and estimate/);
  assert.equal(
    await stepper.getByRole("button", { name: "Step 2: Clear proposal" }).getAttribute("aria-current"),
    "step",
  );
  await stepper.getByRole("button", { name: EXPECT.lastStep }).click();
  assert.match(await activePane.innerText(), /keep you posted/);
  await stepper.getByRole("button", { name: "Start a conversation" }).click();
  assert.equal(new URL(page.url()).hash, "#contact");

  const channel = (name) => page.locator(".channel").filter({ hasText: name });
  assert.equal(await channel("WhatsApp").getAttribute("href"), EXPECT.whatsapp);
  assert.equal(await channel("LinkedIn").getAttribute("href"), EXPECT.linkedin);
  assert.equal(await channel("Email").getAttribute("href"), EXPECT.email);
  assert.equal(await channel("WhatsApp").getAttribute("target"), "_blank");
  assert.equal(await channel("WhatsApp").getAttribute("rel"), "noopener noreferrer");
  checkpoint("career disclosure, process stepper (next, step click, final step) and contact channels");

  // 5. No horizontal overflow from 1440px down to 320px.
  for (const width of WIDTHS) await assertFits(width);
  checkpoint(`no horizontal overflow at ${WIDTHS.join(", ")}px`);

  // Stepper on its last step is the tightest spot at 320px.
  await page.setViewportSize({ width: 320, height: 800 });
  await stepper.getByRole("button", { name: "Step 1: Discovery call" }).click();
  await stepper.getByRole("button", { name: EXPECT.lastStep }).click();
  assert.equal(await stepper.getByRole("button", { name: "Start a conversation" }).count(), 1);
  await stepper.scrollIntoViewIfNeeded();
  await assertFits(320);
  await page.screenshot({ path: artifact("w320-process-last-step.png") });
  checkpoint("stepper last step fits at 320px");

  // 6. Mobile navigation.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  assert.equal(
    await page.getByRole("button", { name: "Close navigation" }).getAttribute("aria-expanded"),
    "true",
  );
  await page.screenshot({ path: artifact("mobile-menu.png") });
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: /Services/ }).click();
  assert.equal(await page.getByRole("button", { name: "Open navigation" }).getAttribute("aria-expanded"), "false");
  assert.equal(new URL(page.url()).hash, "#services");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("button", { name: "Open navigation" }).getAttribute("aria-expanded"), "false");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(150);
  await page.screenshot({ path: artifact("mobile-hero.png") });
  await captureSection(page, "services", "mobile-services.png");
  await captureSection(page, "contact", "mobile-contact.png");
  await page.screenshot({ path: artifact("mobile-full.png"), fullPage: true });
  checkpoint("mobile menu opens, navigates and closes on Escape");

  for (const width of [768, 425, 320]) {
    await page.setViewportSize({ width, height: width < 600 ? 800 : 1024 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(150);
    await page.screenshot({ path: artifact(`w${width}-full.png`), fullPage: true });
  }

  // 7. Images and console.
  const brokenImages = await page
    .locator("img")
    .evaluateAll((images) => images.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src));
  assert.deepEqual(brokenImages, []);
  assert.deepEqual(issues, [], "Browser console or runtime errors");
  checkpoint("no broken images and no console errors");

  // 8. Normal motion: canvases render and animations advance.
  const animatedContext = await browser.newContext({ viewport: { width: 1440, height: 960 } });
  const animatedPage = await animatedContext.newPage();
  watch(animatedPage);
  await animatedPage.goto(baseURL, { waitUntil: "networkidle" });
  await animatedPage.waitForTimeout(700);
  await animatedPage.screenshot({ path: artifact("desktop-mid-animation.png") });
  await animatedPage.waitForTimeout(1200);
  const cueTransform = () =>
    animatedPage.locator(".scroll-cue-line span").evaluate((element) => getComputedStyle(element).transform);
  const initial = await cueTransform();
  await animatedPage.waitForTimeout(300);
  assert.notEqual(await cueTransform(), initial, "Scroll cue animation is not advancing");
  assert.equal(await animatedPage.locator(".hero-rays canvas").count(), 1, "LightRays canvas missing");
  assert.equal(
    await animatedPage.locator(".hero-lead").evaluate((element) => getComputedStyle(element.parentElement).opacity),
    "1",
    "Hero entrance did not finish",
  );
  await animatedPage.mouse.move(1100, 420);
  await animatedPage.waitForTimeout(600);
  await animatedPage.screenshot({ path: artifact("desktop-hover-portrait.png") });
  await animatedPage.locator("#services").scrollIntoViewIfNeeded();
  await animatedPage.waitForTimeout(1200);
  const card = animatedPage.locator(".service-card").first();
  const box = await card.boundingBox();
  await animatedPage.mouse.move(box.x + box.width * 0.6, box.y + box.height * 0.4);
  await animatedPage.waitForTimeout(500);
  await animatedPage.screenshot({ path: artifact("desktop-hover-service.png") });
  await animatedPage.locator("#contact").scrollIntoViewIfNeeded();
  await animatedPage.waitForTimeout(800);
  assert.equal(await animatedPage.locator(".contact-particles canvas").count(), 1, "Particles canvas missing");
  await animatedPage.screenshot({ path: artifact("desktop-contact-animated.png") });
  assert.deepEqual(issues, [], "Browser console or runtime errors with normal motion");
  await animatedContext.close();
  checkpoint("normal motion: hero and contact canvases render and CSS animation advances");

  console.log("All checks passed. Screenshots saved to .qa/");
} finally {
  await browser.close();
}
