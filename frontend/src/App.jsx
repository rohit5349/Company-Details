import { BrowserRouter ,  Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar.jsx';
import Login from './component/Login.jsx';
import Home from './pages/Home.jsx';
import Company from './component/CompanyForm .jsx';
import CompanyList from './component/CompanyList.jsx';
import Footer from './component/Footer.jsx';


function App() {
  return (
    <div>
       <Navbar/>
     <div className='min-h-[70vh] pt-23'>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path='/company' element={<Company/>}/>
         <Route
           path="/companylist"
           element={
             <CompanyList
               onEdit={(company, handleUpdate) => {
                 const newName = prompt("Enter new company name:", company.companyname);
                 if (newName) {
                   handleUpdate(company._id, { companyname: newName });
                 }
               }}
             />
           }
       />
      </Routes>
     </div>
      <Footer/>
    </div>
  );
}

export default App;
