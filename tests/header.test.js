const puppeteer = require("puppeteer")
const sessionFactory = require("./factories/sessionFactory")

let browser;
let page;

beforeEach(async ()=>{
  browser = await puppeteer.launch({
    headless:false
  })

  page = await browser.newPage()
  await  page.goto("localhost:3000")
})

afterEach(async()=>{
  await browser.close();
})

test("clicking login start oAut flow", async()=>{
  await page.click(".right a")
  const url = await page.url();

  console.log(url);
})

test("when signed in, show logout button", async()=>{
  const id = "6511517f17e75820141d78d5"

  
  const {session, sig} = sessionFactory();
  await page.setCookie({name: "session", value: session})
  await page.setCookie({name: "session.sig", value: sig})
  await page.goto("localhost:3000")

  await page.waitFor("a[href='/auth/logout']")
  const text = await page.$eval("a[href='/auth/logout']", el => el.innerHTML)
  expect(text).toEqual("Logout")
})

// test("we launch a browser", async ()=>{
 

//   const text = await page.$eval("a.brand-logo", el => el.innerHTML)

//   expect(text).toEqual("Blogster")
// })