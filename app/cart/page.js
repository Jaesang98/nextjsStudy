export default function Cart() {
  let 장바구니 = ['Tomatoes', 'Pasta']
  return (
    <div>
      <h4 className="title">Cart</h4>
      <CartItem 장바구니={장바구니}></CartItem>
    </div>
  )
}

function CartItem({ 장바구니 }) {
  console.log()
  return (
    <>
      {
        장바구니.map((item, idx) => (
          <div className="cart-item" key={idx}>
            <p>{item}</p>
            <p>$40</p>
            <p>1개</p>
          </div>
        ))
      }
    </>
  )
}