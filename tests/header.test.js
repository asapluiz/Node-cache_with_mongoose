

const Page = require("./helpers/page")
// let browser;
let page;

beforeEach(async ()=>{
  page = await Page.build()
  // browser = await puppeteer.launch({
  //   headless:false
  // })

  // page = await browser.newPage()
  await  page.goto("http://localhost:3000")
})

afterEach(async()=>{
  await page.close();
})

test("clicking login start oAut flow", async()=>{
  await page.click(".right a")
  const url = await page.url();

  console.log(url);
})

test("when signed in, show logout button", async()=>{
  await page.login()
  const text = await page.getContentOf("a[href='/auth/logout']")
  expect(text).toEqual("Logout")
})

// test("we launch a browser", async ()=>{
 

//   const text = await page.$eval("a.brand-logo", el => el.innerHTML)

//   expect(text).toEqual("Blogster")
// })