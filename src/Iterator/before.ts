/*
  課題
  ・具象クラスに対して実装しており、インターフェースに実装していない
  ・具象クラスのメニューをハッシュテーブル以外の実装に変えると、多くのコードを修正しないといけない
  ・クライアントが具象クラスの内部のコレクションの表現方法を知ってしまい、カプセル化に反する
  ・クライアントはメニュー一覧を出力する際、反復処理が必要となっている。
*/

class MenuItem {
  private name: string;
  private description: string;
  private vegetarian: boolean;
  private price: number;

  constructor(name: string, description: string, vegetarian: boolean, price: number) {
    this.name = name;
    this.description = description;
    this.vegetarian = vegetarian;
    this.price = price;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getPrice(): number {
    return this.price;
  }

  public isVegetarian(): boolean {
    return this.vegetarian;
  }
}

class PancakeHouseMenu {
  private menuItems: MenuItem[] = [];

  constructor(){
    this.addItem('朝食セット', 'トースト、卵、ソーセージ', true, 800);
  }

  public addItem(name: string, description: string, vegetarian: boolean, price: number): void {
    const menuItem = new MenuItem(name, description, vegetarian, price);
    this.menuItems.push(menuItem);
  }

  public getMenuItems(): MenuItem[] {
    return [...this.menuItems];
  }
}

class DinerMenu {
  static MAX_ITEMS: number = 6;
  private numberOfItems: number = 0;
  private menuItems: MenuItem[] = new Array(DinerMenu.MAX_ITEMS);

  constructor(){
    this.addItem('ベジタリアンバーガー', 'レタス、トマト', true, 500);
  }

  public addItem(name: string, description: string, vegetarian: boolean, price: number): void {
    const menuItem = new MenuItem(name, description, vegetarian, price);
    if(this.numberOfItems >= DinerMenu.MAX_ITEMS) {
      console.error('メニューアイテムの数が上限を超えています');
    } else {
      this.menuItems[this.numberOfItems] = menuItem;
      this.numberOfItems++;
    }
  }

  public getMenuItems(): MenuItem[] {
    return this.menuItems;
  }
}

const pancakeHouseMenu = new PancakeHouseMenu();
const breakfastItems = pancakeHouseMenu.getMenuItems();

const dinerMenu = new DinerMenu();
const lunchItems = dinerMenu.getMenuItems();

// 1. forEachを使った方法
console.log("朝食メニュー:");
breakfastItems.forEach(item => console.log(`  - ${item.getName()} (${item.getPrice()}円) `));

console.log("ランチメニュー:");
lunchItems.forEach(item => console.log(`  - ${item.getName()} (${item.getPrice()}円) `));

// 2. forループを使った方法
console.log("朝食メニュー:");
for (const item of breakfastItems) {
  console.log(`  - ${item.getName()} (${item.getPrice()}円) `);
}

console.log("ランチメニュー:");
for (const item of lunchItems) {
  console.log(`  - ${item.getName()} (${item.getPrice()}円) `);
}