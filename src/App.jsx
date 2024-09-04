import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import ProductDetailPage from './components/ProductDetailPage';

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch all products initially
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://mattiasehandelapi.azurewebsites.net/produkt');
        const data = await response.json();
        const formattedData = data.map((item) => ({
          id: item.id,
          name: item.namn,
          description: item.beskrivning,
          price: `${item.pris} SEK`,
          image: `../images/${item.bildNamn}`,
        }));
        setAllProducts(formattedData);
        setFilteredProducts(formattedData); // Show all products initially
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredProducts(allProducts); // Show all products if search term is empty
    } else {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <Router>
      <div>
        <Navbar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<ProductGrid products={filteredProducts} />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
