const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {

  it("Items to be added as expected", () => {
    // The original items passed to the method
    const storeItems = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)
    ];
    // The result the code returned
    const expectedResult = [
      new Item("+5 Dexterity Vest", 9, 19),
      new Item("Aged Brie", 1, 1),
      new Item("Elixir of the Mongoose", 4, 6),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 14, 21)
    ];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });


  it("for normal items quality should never less than < 0", () => {
    const storeItems = [new Item("+5 Dexterity Vest", 10, 0)];
    const expectedResult = [new Item("+5 Dexterity Vest", 9, 0)];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it("when the sellIn date passes, quality should degrade be twice", () => {
    const storeItems = [new Item("+5 Dexterity Vest", 0, 4)];
    const expectedResult = [new Item("+5 Dexterity Vest", -1, 2)];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it("the quality can't be > 50", () => {
    const storeItems = [new Item("Aged Brie", 1, 50)];
    const expectedResult = [new Item("Aged Brie", 0, 50)];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it(" quality of an aged brie should increase by 1", () => {
    const storeItems = [new Item("Aged Brie", 1, 0)];
    const expectedResult = [new Item("Aged Brie", 0, 1)];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
});

describe("Backstage pass Checks", () => {
  it("increase Quality as it's SellIn value approaches", () => {
    const storeItems = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 14, 0)
    ];
    const expectedResult = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 13, 1)
    ];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it(" increase in quality by 2 when there are 10 days or less", () => {
    const storeItems = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0)
    ];
    const expectedResult = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 2)
    ];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it("increase in quality by 3 when there are 5 days or less", () => {
    const storeItems = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 0)
    ];
    const expectedResult = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 3)
    ];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });

  it(" Drops quality to 0 after concert", () => {
    const storeItems = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 30)
    ];
    const expectedResult = [
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0)
    ];
    const gildedRose = new Shop(storeItems);
    const items = gildedRose.updateQuality();

    expect(items).toStrictEqual(expectedResult);
  });
});
