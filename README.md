# Gilded Rose

This is the Gilded Rose kata in JavaScript with Jest

I have take a Test driven approach as it is hard to figure out which components are working good and which doesn't once we refactor 

 **Step1** was to write max test cases for gilded rose suite 
  - Items to be added as expected
  - for normal items quality should never less than < 0
  - when the sellIn date passes, quality should degrade be twice
  - the quality can't be > 50
  - quality of an aged brie should increase by 1
  - should foo ( default test cases as provided)


   Backstage Pass testcase
   - increase Quality as it's SellIn value approaches
   - increase in quality by 2 when there are 10 days or less
   - increase in quality by 3 when there are 5 days or less
   - Drops quality to 0 after concert

  **Step 2** Refactor code making into chunks of responsibilty 
   Each thing has its own feature easy to debug ( code commented for further details)

## Getting started

Install dependencies

```sh
npm install
```

## Running tests

To run all tests

```sh
npm test
```

To run all tests in watch mode

```sh
npm run test:watch
```

To generate test coverage report

```sh
npm run test:coverage
```
