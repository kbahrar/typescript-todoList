// Import stylesheets
import './style.css';
// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<div>
    <h1>Shopping List</h1>
    <input placeholder="please add your item" id="itemInput" type="text"/> <button id="addItemButton" >add item</button>
    
    <ul id="itemList"></ul>

    <input placeholder="search..." id="searchInput" type="text"/> <button id="searchButton" >search item</button>

    <ul id="searchList"></ul>
</div>`;
let itemInput = document.getElementById('itemInput') as HTMLInputElement;
let searchInput = document.getElementById('searchInput') as HTMLInputElement;
const listItem = document.getElementById('itemList');
const searchList = document.getElementById('searchList');
type Grocery = 'Pear' | 'Banana' | 'Ananas';
interface ShoppingListType {
  groceries: Grocery[];
  search: Grocery[];
}
class ShoppingList implements ShoppingListType {
  groceries: Grocery[] = [];
  search: Grocery[] = [];

  addItem(item: Grocery): void {
    this.groceries = [...this.groceries, item];
  }

  removeItem = (item: string): void => {
    this.groceries = this.groceries.filter((grocery) => item !== grocery);
  };

  searchItem = (item: string): void => {
    this.search = this.groceries.filter((grocery) =>
      new RegExp(item, 'gi').test(grocery)
    );
  };

  render = () => {
    const node = document.createElement('li');
    const button = document.createElement('button');
    searchList.innerHTML = '';
    button.innerHTML = 'remove';
    if (this.groceries) {
      for (const grocery of this.groceries) {
        node.innerHTML = grocery;
        button.addEventListener('click', () => {
          this.removeItem(grocery);
          node.parentElement?.removeChild(node);
        });
        node.appendChild(button);
        listItem.appendChild(node);
      }
    }
    if (this.search) {
      for (const search of this.search) {
        node.innerHTML = search;
        searchList.appendChild(node);
      }
    }
    itemInput.value = '';
    searchInput.value = '';
  };

  attachEvents() {
    const addItemButton = document.getElementById('addItemButton');
    const searchButton = document.getElementById('searchButton');
    addItemButton.addEventListener('click', () => {
      if (
        !itemInput.value &&
        ['Banana', 'Ananas', 'Pear'].includes(itemInput.value)
      )
        return;
      this.addItem(itemInput.value);
      this.render();
    });
    searchButton.addEventListener('click', () => {
      this.searchItem(searchInput.value);
      this.render();
    });
  }
}
const myList = new ShoppingList();
myList.attachEvents();
myList.render();
