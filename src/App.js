import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [productList, setProductList] = useState([
    { id: 1, nameP: "קראנץ פיסטוק", price: 9.9, img: "1 (1).jpg" },
    { id: 2, nameP: "גומיגם", price: 10.9, img: "1 (1).png" },
    { id: 3, nameP: "חמשושים", price: 12.9, img: "1 (2).jpg" },
    { id: 4, nameP: "לפרוטה מנגו", price: 11.9, img: "1 (3).jpg" },
    { id: 5, nameP: "טילון פאקן", price: 15.9, img: "1 (4).jpg" },
    { id: 6, nameP: "אבטיח", price: 12, img: "1 (5).jpg" },
    { id: 7, nameP: "מגנום שקדים", price: 10, img: "1 (6).jpg" },
    { id: 8, nameP: "ויטמינציק ענבים", price: 6, img: "1 (7).jpg" },
    { id: 9, nameP: "קרח מלון", price: 3.5, img: "1 (8).jpg" }
  ])


  const [filteredProduct, setFilteredProduct] = useState(productList);
  const [productVal, setProductVal] = useState("")//משתנה המקבל שם מוצר
  const [priceVal, setPriceVal] = useState("")//משתנה המקבל מחיר מוצר
  const [cart, setCart] = useState([]) //מערך של עגלת הקניות
  const sumcart = cart.length; //משתנה לכמות המוצרים בעגלה
  const [searchVal, setSearchVal] = useState("")
  const [user, setUser] = useState("manager")

  //פונקציות

  //הוספת מוצר לחנות לפי מה שנכתב באינפוטים
  const addProduct = () => {
    const newProduct = {
      id: productList.length > 0 ? productList[productList.length - 1].id + 1 : 1,
      nameP: productVal,
      price: priceVal,
      img: "default.png"
    };

    const updatedList = [...productList, newProduct];
    setProductList(updatedList);
    setFilteredProduct(updatedList);

    setProductVal("");
    setPriceVal("");

  };


  //פונקציה הוספה לסל
  const addCart = (p) => {
    setCart([...cart, p])
  }

  //פונקציה מחיקת מוצר מהסל
  const deleteP = (id) => {
    const index = cart.findIndex(p => p.id == id)
    const newCart = [...cart]
    newCart.splice(index, 1)
    setCart(newCart)
  }

  //הצגת הודעה למשתמש בסיום הקניה
  const send = () => {
    alert("הזמנתך התקבלה ❤")
  }

  //פונקצית חיפוש
  const search = (txt) => {
    setSearchVal(txt);
    const filteredArr = productList.filter(p =>
      p.nameP.includes(txt) || p.price.toString().includes(txt)
    );
    setFilteredProduct(filteredArr);
  };

  return (
    <div className="App">
      <div className="banner">
        <h1>ברוכים הבאים לגלידת הקיץ 🍦☀️</h1>
        <p>בחרו את הארטיק הכי מרענן והכניסו אותו לעגלה!</p>
      </div>
      <div>
        <button onClick={() => setUser("manager")}>מנהל מתחבר</button>
        <button onClick={() => setUser("user")}>משתמש מתחבר</button>
      </div>
      <header>
        <form>
          <input id="search" onChange={(event) => search(event.target.value)} value={searchVal}></input>
        </form>
      </header>
      <section>
        {//רנדור מערך הוספת מערך המוצרים לתצוגה}
          filteredProduct.map(p =>
            <div className='pro1'>
              <p>{p.nameP}</p>
              <h3>{p.price}</h3>
              <img src={"./images/" + p.img} alt="product image" />
              <button className='buttom-p' onClick={() => { addCart(p) }}>הוסף לסל</button>
            </div>
          )
        }
      </section>

      {user == "manager" &&
        <form>
          <div id='addP'>
            <h4>הוסף מוצר לחנות</h4>
            <input type='text' placeholder='הכנס שם מוצר'
              onChange={(event) => { setProductVal(event.target.value) }} value={productVal} />
            <input type='text' placeholder='הכנס מחיר מוצר'
              onChange={(event) => { setPriceVal(event.target.value) }} value={priceVal} />
            <button className='button-p' type='button' onClick={() => { addProduct() }}>הוסף</button>
          </div>
        </form>}

      <div>
        <h3>עגלת קניות</h3>
        <ul>
          {
            //רינדור המערך הוספת המוצרים לעגלת הקניות
            cart.length == 0 ?
              <p>עגלת הקניות שלך ריקה! קדימה תתחיל להעמיס...</p>
              :
              cart.map(p => <li>
                <h5> {p.nameP} : {p.price} ש"ח
                  <button onClick={() => { deleteP(p.id) }}>🗑</button>
                </h5>
              </li>)
          }
        </ul>
        <h4>{sumcart} סה"כ מוצרים בעגלה</h4>

        <button className='button-p' onClick={() => { send() }}>בצע הזמנה</button>
      </div>
    </div>
  );
}

export default App;
