// Import various items required (images and styling)
import './styles/reset.css'
import './styles/index.css'
import { useRef, useState } from 'react'
// import store items and id's from store-items.js
import initialStoreItems from './store-items'

// i have pasted this in the app.js as it makes it easier to refer to.
// const storeItems =  [
//   {
//     id: "001-beetroot",
//     name: "beetroot",
//     price: 0.35
//   },
//   {
//     id: "002-carrot",
//     name: "carrot",
//     price: 0.35
//   },
//   {
//     id: "003-apple",
//     name: "apple",
//     price: 0.35
//   },
//   {
//     id: "004-apricot",
//     name: "apricot",
//     price: 0.35
//   },
//   {
//     id: "005-avocado",
//     name: "avocado",
//     price: 0.35
//   },
//   {
//     id: "006-bananas",
//     name: "bananas",
//     price: 0.35
//   },
//   {
//     id: "007-bell-pepper",
//     name: "bell pepper",
//     price: 0.35
//   },
//   {
//     id: "008-berry",
//     name: "berry",
//     price: 0.35
//   },
//   {
//     id: "009-blueberry",
//     name: "blueberry",
//     price: 0.35
//   },
//   {
//     id: "010-eggplant",
//     name: "eggplant",
//     price: 0.35
//   }
// ]

// export default storeItems

export default function App() {

  const [food, setCart] = useState(initialStoreItems)

  const inputRef = useRef()
// specify whether each of the items in the store-items.js is either a fruit or a vegetable
  function addType() {
// specify individual items for filtering into fruits/veg
    food.forEach((item) => {
      if (["apple", "apricot", "avocado", "bananas", "berry", "blueberry"].includes(item.name)) {
        item.type = "fruit"
// all other items not named previously will be assigned as vegetables
      } else {
        item.type = "vegetable"
      }
    })
  }
// display items according to the type specification.
  addType()

  const [search, setSearch] = useState('')
// retrieve any items that were searched for and place them into the cart.
  const retrieveSearchItem = (items, search) => {
// create a const that will display filtered items and allow for upper and lowercase when searched.
    const newFilteredStore = items.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
// use return to display items
    return newFilteredStore
  }

  let filteredItems = [...food]
// !== is a comparison operator that checks if the values are equal. if the item
// is the same then it will be retrieved and displayed.
  if (search !== '') {
    filteredItems = retrieveSearchItem(food, search)
  }
// create a function that will enable items that have not been filtered to be displayed.
  function filterByType(type) {
    if (type === "all") {
      setSearch("")
      return setCart(initialStoreItems)
    } else{
    const showType = initialStoreItems.filter(item =>
      item.type === type
    )
    setCart(showType)}
  }
// create functions for the + or - buttons next to the items that will increase/decrease the quantity.
  function addOne(item) {
    if (!item.quantity) {
      item.quantity = 1
      setCart([...food])
// using else i can have the cart display multiples of the same item.
    } else {
      item.quantity++
      setCart([...food])
    }
  }
// create a function that will reduce the item total by one when selected.
  function minusOne(item) {
    item.quantity--
    setCart([...food])
  }
// create a function that will remove item from basket entirely if the quantity becomes zero
  function checkIfShow(item, index) {
    if (item.quantity > 0) {
// if item quantity is more than zero then the item image, price and quantity button will display in the cart.
      return <li key={index}>
        <img
          className="cart--item-icon"
          src={`/assets/icons/${item.id}.svg`}
          alt={item.name}
        />
{/* use a p element to display item name */}
        <p>{item.name}</p>
        <button className="quantity-btn remove-btn center" onClick={() => minusOne(item)}>-</button>
{/* use a span to display the quantity number in accordance with the quantity entered */}
        <span className="quantity-text center">{item.quantity}</span>
        <button className="quantity-btn add-btn center" onClick={() => addOne(item)}>+</button>
      </li>
    }
  }
// create a function that will calculate the total according to the price and quantity of each item.
  function calculateTotal() {
// have the initial total display as zero
    let total = 0
// use an if statement to update the total according to food items and quantity, and add the different items in the cart.
    food.forEach((item) => {
// if item quantity is greater than zero, update the total to display item quantity times price.
      if (item.quantity > 0) {
        total = + ((Number(item.price) * Number(item.quantity)) + total).toFixed(2)
      }
    })
// update the total displayed
    return total
  }
// create a function that will display items in ascending/decending order. To do this
// I will have to use if statements 
  function sortingSpecific(property, ascendingOrDescending){
// if ascending is selected display property in order of lowest first
    if (ascendingOrDescending === "ascending") {
    var sortOrder = 1
    if (property[0] === "-") {
      sortOrder = -1
      property = property.substr(1)
    }
    return function (a,b){
// to sort these i need to specify the order.
      var result = (a[property] < b[property] ? -1 : (a[property] > b[property]))
      return result * sortOrder
    }} else if (ascendingOrDescending === "descending") {
      var sortOrder = 1
    if (property[0] === "-") {
      sortOrder = -1
      property = property.substr(1)
    }
    return function (a,b){
      var result = (b[property] < a[property] ? -1 : (b[property] > a[property]))
      return result * sortOrder
    }
    }
  }
// create a function that will sort the items in alphabetical order
  function sortAtoZ(){
    setCart (filteredItems.sort(sortingSpecific("name", "ascending")))
  }
// create a function that will sort the items in reverse alphabetical order
  function sortZtoA(){
    setCart (filteredItems.sort(sortingSpecific("name", "descending")))
  }
// create a function that will sort the items in order of lowest price to highest price
  function sortPriceDecrease(){
    setCart (filteredItems.sort(sortingSpecific("price", "ascending")))
  }
// create a function that will sort the items in order of highest price to lowest price
  function sortPriceIncrease(){
    setCart (filteredItems.sort(sortingSpecific("price", "descending")))
  }
// log the result(fruit, quantity, price)
  console.log(`input= ${inputRef.current?.value}`)
// create buttons for the filtering options and insert the text required into them
  return (
    <>
      <header id="store">
        <h1>Greengrocers</h1>
{/* use classname to ensure that any sorting will happen in the basket and not the cart */}
        <div className='store--item-list'>
{/* use onClick to enable the filtering specified when button is clicked */}
        <button onClick={() => filterByType("fruit")}>Show Fruits</button>
        <button onClick={() => filterByType("vegetable")}>Show Vegetables</button>
{/* create a button to remove all the filters entered previously and display all items */}
        <button onClick={() => filterByType(("all"))}>Clear filters</button>
{/* for the search box, have a placeholder text that will display when nothing is input */}
        <input placeholder="Name" ref={inputRef} value={search} onChange={e => setSearch(e.target.value)} />
        </div><br></br>
{/* use a break to ensure buttons are displayed in two horizontal lines */}
        <div className='store--item-list'>
{/* to display these two lines of items in two horizontal lines I need to create a second div */}
{/* alpahbetical order */}
        <button onClick={sortAtoZ}>Sort A-Z</button>
{/* reverse alphabetical order */}
        <button onClick={sortZtoA}>Sort Z-A</button>
        <button onClick={sortPriceDecrease}>Sort by price decrease</button>
        <button onClick={sortPriceIncrease}>Sort by price increase</button>
        </div><br></br>
{/* use another break so that the images and item details will display below the filtering options */}
        <ul className="item-list store--item-list">
          {filteredItems.map((food, index) => (
// display items in cart when filtered 
            <li key={index}>
              <div className="store--item-icon">
{/* display the image of the food item by selecting the relevant svg */}
                <img src={`/assets/icons/${food.id}.svg`} alt={food.name} />
              </div>
{/* when "add to cart" is clicked add item and details to the cart */}
              <button onClick={() => addOne(food)}>Add to cart</button>
            </li>
          ))
          }
        </ul>
      </header>
{/* create the cart for items to be displayed in */}
      <main id="cart">
{/* title */}
        <h2>Your Cart</h2>
{/* use an unordered list to display the items in the cart */}
        <div className="cart--item-list-container">
          <ul className="item-list cart--item-list">

            {food.map((item, index) => (
              checkIfShow(item, index)
            ))}

          </ul>
        </div>
{/* create a section for the total amount */}
        <div className="total-section">
          <div>
            <h3>Total</h3>
          </div>
{/* in a separate div element, display the text containing the total */}
          <div>
            <span className="total-number">£{calculateTotal()}</span>
          </div>
        </div>
      </main>
      <div>
        Icons made by
        <a
          href="https://www.flaticon.com/authors/icongeek26"
          title="Icongeek26"
        >
          Icongeek26
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </>
  )
}