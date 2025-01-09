import { Guitar } from "./component/Guitar"
import { Headers } from "./component/Headers"
import { db } from "./data/db"
import { useState, useEffect } from "react"


function App() {

  const initialCart= ()=>{
    const localStorageCart= localStorage.getItem('cart')
    return localStorageCart? JSON.parse(localStorageCart):[]
  }

  const [date] = useState(db)
  const [cart, setCart] = useState(initialCart)
  
  useEffect(()=>{localStorage.setItem('cart',JSON.stringify(cart))},[cart])

  function addCart(item) {
    const itemExist = cart.findIndex(guitar => guitar.id === item.id);
    if (itemExist >= 0) {//no existe
      const updateCart = [...cart]
      updateCart[itemExist].quantity++;
      setCart(updateCart)

    } else {
      item.quantity = 1
      setCart([...cart, item])
    }

  }
  function removeFromCart(id) {
    setCart(cart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id){
    const updateCart= cart.map(item =>{
      if(item.id === id){
        return{...item, quantity: item.quantity+1}
      }return item;
    })
    setCart(updateCart)
  }
  function decrementQuantity(id){
    const updateCart= cart.map(item=>{
      if(item.id=== id && item.quantity>1){
        return{...item, quantity: item.quantity-1}
      }return item;
    })
    setCart(updateCart)
  }

  function clearCart(){setCart([])}

  return (
    <>
      <Headers
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decrementQuantity={decrementQuantity}
        clearCart={clearCart}
     />



      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {date.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addCart={addCart}
            />
          ))}


        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>    </>
  )
}

export default App
