describe('Basic user flow for Website', () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto('https://cse110-f2021.github.io/Lab8_Website');
  });

  // Next, check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');
    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      //console.log(`prodItems.length=${prodItems.length}`);
      return prodItems.length;
    });
    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  for(let i = 0; i < 20; i++) {
    it('Make sure <product-item> elements are populated', async () => {
      console.log('Checking to make sure <product-item> elements are populated...');
      // Start as true, if any don't have data, swap to false
      let allArePopulated = true;
      let data, plainValue;
      // Query select all of the <product-item> elements
      const prodItems = await page.$$('product-item');
      console.log(`Checking product item ${i+1}/${prodItems.length}`);
      // Grab the .data property of <product-items> to grab all of the json data stored inside
      data = await prodItems[i].getProperty('data');
      // Convert that property to JSON
      plainValue = await data.jsonValue();
      // Make sure the title, price, and image are populated in the JSON
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.price.length == 0) { allArePopulated = false; }
      if (plainValue.image.length == 0) { allArePopulated = false; }
      // Expect allArePopulated to still be true
      expect(allArePopulated).toBe(true);

      // TODO - Step 1
      // Right now this function is only checking the first <product-item> it found, make it so that
      // it checks every <product-item> it found

    }, 10000);
  }
  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');
    // TODO - Step 2
    // Query a <product-item> element using puppeteer ( checkout page.$() and page.$$() in the docs )
    // Grab the shadowRoot of that element (it's a property), then query a button from that shadowRoot.
    // Once you have the button, you can click it and check the innerText property of the button.
    // Once you have the innerText property, use innerText.jsonValue() to get the text value of it
    const singleItem = await page.$('product-item');
    //const ShadowRoot = await singleItem.attachShadow({ mode: "open" });
    const itemShadowRoot = await singleItem.getProperty("shadowRoot");
    //const buttonItem = await itemShadowRoot.querySelector('button');
    const buttonItem = await itemShadowRoot.$('button');
    // buttonItem.addEventListener('click',async function(event){
    //   //const value = buttonItem.innerText.jsonValue();
    //   let value = await innerText.jsonValue();
    // });
    await buttonItem.click();
    let text = await buttonItem.getProperty('innerText');
    let value = await text.jsonValue();
  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');
    // TODO - Step 3
    // Query select all of the <product-item> elements, then for every single product element
    // get the shadowRoot and query select the button inside, and click on it.
    // Check to see if the innerText of #cart-count is 20
    const items = await page.$$('product-item');
    //const items = document.querySelectorAll("product-item");
    //let i=0;
    // for(const item of items){
    //   const itemShadowRoot = await item.getProperty("shadowRoot");
    //   const buttonItem = await itemShadowRoot.$('button');
    //   await buttonItem.click();
    //   //i++;
    //   //console.log(i);
    // }
    for(let i = 1; i <20; i++)
    {
      const singleItem = items[i];
      const itemShadowRoot = await singleItem.getProperty("shadowRoot");
      const buttonItem = await itemShadowRoot.$('button');
      await buttonItem.click();
    }
    let cnt = await page.$("#cart-count");
    let num = await cnt.getProperty('innerText');
    let value = await num.jsonValue();
    expect(value).toBe("20");
  }, 10000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 4
    // Reload the page, then select all of the <product-item> elements, and check every
    // element to make sure that all of their buttons say "Remove from Cart".
    // Also check to make sure that #cart-count is still 20
    await page.reload();
    const items = await page.$$('product-item');
    //const items = document.querySelectorAll("product-item");    
    // for(const item of items){
    //   //const itemShadowRoot = await item.shadowRoot;
    //   const itemShadowRoot = await item.attachShadow({ mode: "open" });
    //   const buttonItem = await itemShadowRoot.querySelector('button');
    //   buttonItem.addEventListener('click', async function(event){
    //     let value = await innerText.jsonValue();
    //     expect(value).toBe('Remove from Cart');
    //     let cnt = await page.$("#cart-count");
    //     let num = await cnt.jsonValue.getProperty('innerText');
    //     expect(num).toBe(20);
    //   });
    // }
    //let i=0;
    // for(const item of items){
    //   const itemShadowRoot = await item.getProperty("shadowRoot");
    //   const buttonItem = await itemShadowRoot.$('button');
    //   await buttonItem.click();
    //   //i++;
    //   //console.log(i);
    //   let text = await buttonItem.getProperty('innerText');
    //   let textValue = await text.jsonValue();
    //   expect (textValue). toBe('Remove from Cart');
    // }
    for(let i = 0; i <20; i++)
    {
      const singleItem = items[i];
      const itemShadowRoot = await singleItem.getProperty("shadowRoot");
      const buttonItem = await itemShadowRoot.$('button');
      //await buttonItem.click();
      let text = await buttonItem.getProperty('innerText');
      let textValue = await text.jsonValue();
      expect (textValue). toBe('Remove from Cart');
    }
    let cnt = await page.$("#cart-count");
    let num = await cnt.getProperty('innerText');
    let value = await num.jsonValue();
    expect(value).toBe("20");
  }, 10000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {
    // TODO - Step 5
    // At this point he item 'cart' in localStorage should be 
    // '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]', check to make sure it is
    const items = await page.$$('product-item');
    //const array=window.localStorage.getItem('cart');
    for(let i=1; i<=20; i++){
      if(items[i-1]!=i)return false;
    }
    return true;
  });


  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');
    // TODO - Step 6
    // Go through and click "Remove from Cart" on every single <product-item>, just like above.
    // Once you have, check to make sure that #cart-count is now 0
    const items = await page.$$('product-item');
    //const items = document.querySelectorAll("product-item");
    //for(const item of items){
      // //const itemShadowRoot = await item.shadowRoot;
      // const itemShadowRoot = await item.attachShadow({ mode: "open" });
      // const buttonItem = await itemShadowRoot.querySelector('button');
      // buttonItem.addEventListener('click',async function(event){
      //   // const text = event.target.innerText;
      //   // if(text == "Remove from Cart")console.log("true");
      //   // else console.log("false");
      //   // const value = buttonItem.innerText.jsonValue("#cart-count");
      //   // if(value==0) return true;
      //   // else return false;
      //   let cnt = await page.$("#cart-count");
      //   let num = await cnt.jsonValue.getProperty('innerText');
      //   expect(num).toBe(0);
      // });
    //}
    // for(const item of items){
    //   const itemShadowRoot = await item.getProperty("shadowRoot");
    //   const buttonItem = await itemShadowRoot.$('button');
    //   await buttonItem.click();
    //   //i++;
    //   //console.log(i);
    // }
    for(let i = 0; i <20; i++)
    {
      const singleItem = items[i];
      const itemShadowRoot = await singleItem.getProperty("shadowRoot");
      const buttonItem = await itemShadowRoot.$('button');
      await buttonItem.click();
    }
    let cnt = await page.$("#cart-count");
    let num = await cnt.getProperty('innerText');
    let value = await num.jsonValue();
    expect(value).toBe("0");
  }, 10000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 7
    // Reload the page once more, then go through each <product-item> to make sure that it has remembered nothing
    // is in the cart - do this by checking the text on the buttons so that they should say "Add to Cart".
    // Also check to make sure that #cart-count is still 0
    await page.reload();
    const items = await page.$$('product-item');
    //const items = document.querySelectorAll("product-item");
    // for(const item of items){
    //   //const itemShadowRoot = await item.shadowRoot;
    //   const itemShadowRoot = await item.attachShadow({ mode: "open" });
    //   const buttonItem = await itemShadowRoot.querySelector('button');
    //   buttonItem.addEventListener('click',async function(event){
    //     // const text = event.target.innerText;
    //     // if(text == "Add to Cart")console.log("true");
    //     // else console.log("false");
    //     // const value = buttonItem.innerText.jsonValue("#cart-count");
    //     // if(value==0) return true;
    //     // else return false;
    //     let value = await innerText.jsonValue();
    //     expect(value).toBe('Add to Cart');
    //     let cnt = await page.$("#cart-count");
    //     let num = await cnt.jsonValue.getProperty('innerText');
    //     expect(num).toBe(0);
    //   });
    // }
    // for(const item of items){
    //   const itemShadowRoot = await item.getProperty("shadowRoot");
    //   const buttonItem = await itemShadowRoot.$('button');
    //   await buttonItem.click();
    //   //i++;
    //   //console.log(i);
    //   let text = await buttonItem.getProperty('innerText');
    //   let textValue = await text.jsonValue();
    //   expect (textValue). toBe('Add to Cart');
    // }
    for(let i = 0; i <20; i++)
    {
      const singleItem = items[i];
      const itemShadowRoot = await singleItem.getProperty("shadowRoot");
      const buttonItem = await itemShadowRoot.$('button');
      //await buttonItem.click();
      let text = await buttonItem.getProperty('innerText');
      let textValue = await text.jsonValue();
      expect (textValue). toBe('Add to Cart');
    }
    let cnt = await page.$("#cart-count");
    let num = await cnt.getProperty('innerText');
    let value = await num.jsonValue();
    expect(value).toBe("0");
  }, 10000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');
    // TODO - Step 8
    // At this point he item 'cart' in localStorage should be '[]', check to make sure it is
    const items = await page.$$('product-item');
    if(items==null) return true;
    else return false;
  });
});
