import { useState } from 'react';
import AboutUs from './AboutUs';
import './App.css';
import ProductList from './ProductList';


function App() {
  const [activePage, setActivePage] = useState('landing');

  const handleGetStarted = () => {

    setActivePage('product_list');
    console.log(`Current page: ${activePage}`);
  };

  const handlePageChange = (pagename) => {

    setActivePage(pagename);
    console.log(`Current page: ${activePage}`);
  };

  return (
    <>

      <header className={`first_page ${activePage === 'landing' ? 'visible' : ''}`}>
        <div className="main_event">
          <div className="first_page_name_btn">
            <h1 className="company_heading">Welcome To<br></br>Paradise Nursery</h1>
            <p className="company_sentence"> Where Green Meets Serenity</p>
            <div className="getstarted_btn">
              <button onClick={() => handlePageChange('product_list')} className="get-started-btn">
                Get Started
              </button>
            </div>
          </div>
          <div className="aboutus_main">
            <AboutUs />
          </div>


        </div>
      </header>

      {activePage === 'product_list' && (<div className={`product-list-container ${activePage === 'product_list' ? 'visible' : ''}`}>
        <ProductList handlePageChange={handlePageChange} />
      </div>)}

    </>
  );
}

export default App
