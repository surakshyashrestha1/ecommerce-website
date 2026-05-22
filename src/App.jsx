import { useState } from "react";
import heroImg from "../images/Hero.jpg";
import womenImg from "../images/women.jpg";
import menImg from "../images/men.jpg";
import accessoriesImg from "../images/accessories.jpg";
import saleImg from "../images/sale.jpg";
import promoImg from "../images/promo.jpg";

const products = [
  { id: 1, name: "Women's Dress", price: 2500, category: "women", image: womenImg },
  { id: 2, name: "Men's Shirt", price: 1800, category: "men", image: menImg },
  { id: 3, name: "Accessories", price: 999, category: "accessories", image: accessoriesImg },
  { id: 4, name: "Sale Item", price: 500, category: "sale", image: saleImg },
  { id: 5, name: "Women's Top", price: 2000, category: "women", image: womenImg },
  { id: 6, name: "Men's Jacket", price: 3500, category: "men", image: menImg },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [ordered, setOrdered] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const increaseQty = (id) =>
    setCart((prev) =>
      prev.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item)
    );

  const decreaseQty = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? item.qty === 1 ? null : { ...item, qty: item.qty - 1 } : item
      ).filter(Boolean)
    );

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter);

  const handleOrder = (e) => {
    e.preventDefault();
    setOrdered(true);
    setCart([]);
    setCheckout(false);
    setCartOpen(false);
    setForm({ name: "", email: "", phone: "", address: "" });
    setTimeout(() => setOrdered(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold text-rose-600">ShopNepal</h1>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex gap-6 text-gray-600 font-medium">
              <a href="#home" className="hover:text-rose-600">Home</a>
              <a href="#categories" className="hover:text-rose-600">Categories</a>
              <a href="#products" className="hover:text-rose-600">Products</a>
              <a href="#promo" className="hover:text-rose-600">Offers</a>
            </div>

            <div className="flex items-center gap-3">
              {/* Cart Button */}
              <button
                onClick={() => { setCartOpen(!cartOpen); setCheckout(false); }}
                className="relative bg-rose-600 text-white px-3 py-2 md:px-4 rounded-full hover:bg-rose-700 text-sm md:text-base"
              >
                Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Hamburger Button - Mobile Only */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex flex-col gap-1.5 p-2"
              >
                <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? "opacity-0" : ""}`}></span>
                <span className={`block w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4 flex flex-col gap-3">
              <a href="#home" onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium hover:text-rose-600 py-1">Home</a>
              <a href="#categories" onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium hover:text-rose-600 py-1">Categories</a>
              <a href="#products" onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium hover:text-rose-600 py-1">Products</a>
              <a href="#promo" onClick={() => setMenuOpen(false)} className="text-gray-700 font-medium hover:text-rose-600 py-1">Offers</a>
            </div>
          )}
        </div>
      </nav>

      {/* Order Success Toast */}
      {ordered && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg text-base font-bold text-center w-max">
          Order Placed Successfully! Thank you!
        </div>
      )}

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col">

          {/* Cart Header */}
          <div className="flex justify-between items-center p-4 border-b bg-white">
            <h2 className="text-lg font-bold">Your Cart ({totalItems})</h2>
            <button
              onClick={() => { setCartOpen(false); setCheckout(false); }}
              className="text-gray-500 hover:text-red-500 text-xl font-bold w-8 h-8 flex items-center justify-center"
            >
              X
            </button>
          </div>

          {/* Cart Items or Checkout Form */}
          {!checkout ? (
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="text-center mt-20">
                  <p className="text-4xl mb-4">🛒</p>
                  <p className="text-gray-400 text-lg">Cart is empty!</p>
                  <p className="text-gray-300 text-sm mt-2">Add some products</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 mb-4 border rounded-xl p-3 bg-gray-50">
                    <img src={item.image} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" alt={item.name} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{item.name}</p>
                      <p className="text-rose-600 text-sm font-bold">Rs. {item.price}</p>
                      {/* +/- Quantity */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="w-6 h-6 bg-rose-100 text-rose-600 rounded-full font-bold hover:bg-rose-200 flex items-center justify-center text-base leading-none"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-bold text-sm">{item.qty}</span>
                        <button
                          onClick={() => increaseQty(item.id)}
                          className="w-6 h-6 bg-rose-100 text-rose-600 rounded-full font-bold hover:bg-rose-200 flex items-center justify-center text-base leading-none"
                        >
                          +
                        </button>
                        <span className="text-xs text-gray-500">= Rs. {item.price * item.qty}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 font-bold flex-shrink-0"
                    >
                      X
                    </button>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* Checkout Form */
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="text-lg font-bold mb-4">Checkout Details</h3>
              <form onSubmit={handleOrder}>
                <div className="mb-3">
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div className="mb-3">
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div className="mb-3">
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="98XXXXXXXX"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-700 block mb-1">Delivery Address *</label>
                  <textarea
                    required
                    placeholder="Your delivery address..."
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-400 resize-none"
                  />
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-xl p-3 mb-4 border">
                  <p className="text-sm font-bold text-gray-700 mb-2">Order Summary:</p>
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{item.name} x{item.qty}</span>
                      <span>Rs. {item.price * item.qty}</span>
                    </div>
                  ))}
                  <div className="border-t mt-2 pt-2 flex justify-between font-bold text-sm">
                    <span>Total</span>
                    <span className="text-rose-600">Rs. {totalPrice}</span>
                  </div>
                </div>

                <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition text-sm mb-2">
                  Place Order
                </button>
                <button type="button" onClick={() => setCheckout(false)} className="w-full border border-gray-300 text-gray-600 py-2 rounded-xl text-sm hover:bg-gray-50">
                  Back to Cart
                </button>
              </form>
            </div>
          )}

          {/* Cart Footer */}
          {!checkout && cart.length > 0 && (
            <div className="border-t p-4 bg-white">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-base">Total:</span>
                <span className="font-bold text-xl text-rose-600">Rs. {totalPrice}</span>
              </div>
              <button
                onClick={() => setCheckout(true)}
                className="w-full bg-rose-600 text-white py-3 rounded-xl font-bold hover:bg-rose-700 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative h-64 sm:h-80 md:h-96">
        <img src={heroImg} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">New Arrivals 2025</h2>
          <p className="text-base sm:text-lg md:text-xl mb-4">Discover the latest fashion trends</p>
          <a href="#products" className="bg-rose-600 px-6 py-2 md:px-8 md:py-3 rounded-full text-base md:text-lg hover:bg-rose-700">
            Shop Now
          </a>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: "Women", img: womenImg, cat: "women" },
            { label: "Men", img: menImg, cat: "men" },
            { label: "Accessories", img: accessoriesImg, cat: "accessories" },
            { label: "Sale", img: saleImg, cat: "sale" },
          ].map((c) => (
            <div
              key={c.cat}
              onClick={() => {
                setFilter(c.cat);
                document.getElementById("products").scrollIntoView();
              }}
              className="relative cursor-pointer rounded-xl overflow-hidden h-36 sm:h-44 md:h-48 group"
            >
              <img src={c.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={c.label} />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span className="text-white text-lg md:text-xl font-bold">{c.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-5 md:mb-6">Our Products</h2>
        <div className="flex gap-2 md:gap-3 justify-center mb-6 md:mb-8 flex-wrap">
          {["all", "women", "men", "accessories", "sale"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 md:px-5 md:py-2 rounded-full capitalize font-medium border text-sm md:text-base ${
                filter === f ? "bg-rose-600 text-white border-rose-600" : "border-gray-300 hover:border-rose-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-44 sm:h-52 md:h-56 object-cover hover:scale-105 transition-transform duration-300" />
              <div className="p-4">
                <h3 className="font-semibold text-base md:text-lg">{product.name}</h3>
                <p className="text-rose-600 font-bold mt-1">Rs. {product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-3 w-full bg-rose-600 text-white py-2 rounded-lg hover:bg-rose-700 transition text-sm md:text-base"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section id="promo" className="relative h-48 sm:h-56 md:h-64 my-6 md:my-8">
        <img src={promoImg} alt="Promo" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Special Offer!</h2>
          <p className="text-base md:text-xl">Up to 50% off on selected items</p>
          <button className="mt-3 md:mt-4 bg-yellow-400 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-300 text-sm md:text-base">
            Grab Deal
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-8 mt-6 md:mt-10">
        <h3 className="text-xl font-bold text-rose-400 mb-2">ShopNepal</h3>
        <p className="text-gray-400 text-sm">2025 ShopNepal. All rights reserved.</p>
        <div className="flex justify-center gap-4 md:gap-6 mt-4 text-gray-400 text-sm">
          <a href="#" className="hover:text-white">About</a>
          <a href="#" className="hover:text-white">Contact</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
        </div>
      </footer>

    </div>
  );
}
