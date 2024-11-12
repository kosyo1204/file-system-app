/* 変更される部分のカプセル化→メニューから返されるオブジェクトに対する反復処理が異なる
  配列はlengthと配列のindexで取得
  固定長の配列はgetメソッド、sizeメソッドで。（Java）
  両方に対応できるようにするためには、hasNext(), next()メソッドで対応。
*/

interface Iterator {
  hasNext(): boolean;
  next(): MenuItem;
}

class DinerMenuIterator implements Iterator {
  private items: MenuItem[] = [];
  private position: number = 0;

  // 反復処理を行うメニュー項目の配列を受け取る
  constructor(items: MenuItem[]) {
    this.items = items;
  }

  public next(): MenuItem {
    let menuItem: MenuItem;
    menuItem = this.items[this.position];
    this.position = this.position + 1;
    return menuItem;
  }

  public hasNext(): boolean {
    if (this.position >= this.items.length || this.items[this.position] == null) {
      return false;
    } else {
      return true;
    }
  }
}

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

class PancakeMenuIterator implements Iterator {
  private items: MenuItem[] = [];
  private position: number = 0;

  constructor(items: MenuItem[]) {
    this.items = items;
  }

  public next(): MenuItem {
    let menuItem: MenuItem;
    menuItem = this.items[this.position];
    return menuItem;
  }

  public hasNext(): boolean {
    if (this.position >= this.items.length || this.items[this.position] == null) {
      return false;
    } else {
      return true;
    }
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

  // public getMenuItems(): MenuItem[] {
  //   return [...this.menuItems];
  // }

  public createIterator(): Iterator {
    return new PancakeMenuIterator(this.menuItems);
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

  // 内部実装を公開してしまうため利用しない
  // public getMenuItems(): MenuItem[] {
  //   return this.menuItems;
  // }

  // Iteratorインターフェースをレスポンス。クライアントはmenuItemsの持ち方やIteratorの実装方法は知らなくて良い。
  // メニューの項目にアクセスするには、イテレータを使うだけ
  public createIterator(): Iterator {
    return new DinerMenuIterator(this.menuItems);
  }
}
