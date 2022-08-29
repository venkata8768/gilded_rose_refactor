// default item class
class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

// caluclate quality diffrence for nomal item
const computeQltyDiffNormalItem = ({ sellIn, quality }) => {
  const isQualityBiggerThan0 = quality > 0;
  const areNoMoreDaysToSell = sellIn < 0;

  if (isQualityBiggerThan0 && areNoMoreDaysToSell) return -2;
  if (isQualityBiggerThan0) return -1;

  return 0;
};

//Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
// Quality drops to 0 after the concert
// update quality for backstage passes
const computeQltyDiffBackstagePasses = ({ sellIn, quality }) => {
  const tenDaysOrLessToSell = sellIn <= 10;
  const fiveDaysOrLessToSell = sellIn <= 5;
  const areNoMoreDaysToSell = sellIn < 0;

  if (areNoMoreDaysToSell) return -quality;
  if (fiveDaysOrLessToSell) return +3;
  if (tenDaysOrLessToSell) return +2;

  return +1;
};

// sell in diff computation
const computeSellinDiff = ({ sellIn, name }) => {
  const isSulfuras = name == "Sulfuras, Hand of Ragnaros";
  return !isSulfuras ? -1 : 0;
};

// main method to compute quality diff
const computeQltyDiff = item => {
  const isSulfuras = item.name == "Sulfuras, Hand of Ragnaros";
  const isAgedBrie = item.name == "Aged Brie";
  //	- "Conjured" items degrade in Quality twice as fast as normal items
  const isConjuredItem = item.name.includes("Conjured");

  const isBackstagePasses =
    item.name == "Backstage passes to a TAFKAL80ETC concert";
  const isQualityLessThan50 = item.quality < 50;
  const isNormalItem =
    !isAgedBrie && !isBackstagePasses && !isSulfuras && !isConjuredItem;

  if (isNormalItem) return computeQltyDiffNormalItem(item);
  if (isBackstagePasses) return computeQltyDiffBackstagePasses(item);
  if (isAgedBrie && isQualityLessThan50) return +1;
  if (isConjuredItem) return computeQltyDiffNormalItem(item) * 2;

  return 0;
};

class Shop {
  // inital add for items with constructor
  constructor(items = []) {
    this.items = items;
  }
  // single point function for updating quality for each item
  // iterate through each and update its necessary properties 
  // making chunks helps unit testing 
  updateQuality() {
    return this.items.map(item => {
      item.sellIn += computeSellinDiff(item);
      item.quality += computeQltyDiff(item);
      return item;
    });
  }
}

module.exports = {
  Item,
  Shop
}
