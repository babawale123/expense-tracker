import "./asset/css/bootstrap.min.css";
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home  from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import Comment from "./pages/Comment"
import Product from "./pages/Product"
import ProductList from "./pages/ProductList"
import Analytics from "./pages/Analytics"
import FilteredItem from "./pages/FilteredItem"
import Login from "./pages/Login";
import GmailApi from "./components/GmailApi"
import AddIncome from "./pages/AddIncome";
import  UpdateItem  from "./pages/UpdateItem";
import HomeExpense from "./pages2/HomeExpense";
import AddExpense from "./pages2/AddExpense";
import ExpenseFilter from "./pages2/expenseFilter";
import ExpenseUpdate from "./pages2/expenseUpdate";
import Register from "./pages/Register";

const  App = () => {

  return (
    // <div className="container">
    //   <Home />
    //   <FilteredItem />
    // </div>
    <>
    <BrowserRouter>
        
            <Routes>
                <Route exact path="/" element={ <Login /> } />
                <Route path="/register" element={ <Register /> } />
                <Route path="/dashboard" element={ <Dashboard /> } />
                <Route path="/about" element={ <About /> } />
                <Route path="/comment" element={ <Comment /> } />
                <Route path="/product" element={ <Product /> } />
                <Route path="/productlist" element={ <ProductList /> } />
                <Route path="/analytics" element={ <Analytics /> } />
                <Route path="/mail" element={ <GmailApi /> } />

                <Route path="/home" element={ <Home /> } />
                <Route path="/add" element={ <AddIncome /> } />
                <Route path="/item" element={ <FilteredItem /> } />
                <Route path="/update/:id" element={ <UpdateItem /> } />
                
                {/* expense */}
                <Route path="/expense" element={ <HomeExpense /> } />
                <Route path="/addExpense" element={ <AddExpense /> } />
                <Route path="/search" element={ <ExpenseFilter /> } />
                <Route path="/expenseUpdate/:id" element={ <ExpenseUpdate /> } />

            </Routes>
       
</BrowserRouter>
</>
  )
}

export default App
