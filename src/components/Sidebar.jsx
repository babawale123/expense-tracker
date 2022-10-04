import React, { useState } from 'react'
import {FaTh,FaBars,FaUserAlt,FaRegChartBar,FaCommentAlt,FaShoppingBag,FaThList} from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const Sidebar = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const menuItem = [
        {
            path:"/",
            name:"Dasboard",
            icon: <FaTh />   
        },
        {
            path:"/add",
            name:"Add Income",
            icon: <FaRegChartBar />   
        },

        // {
        //     path:"/add",
        //     name:"Add Income",
        //     icon: <FaUserAlt />   
        // },

        {
            path:"/expense",
            name:"Expenses",
            icon: <FaRegChartBar/>   
        },

        {
            path:"/addExpense",
            name:"Add Expense",
            icon:<FaRegChartBar />    
        },

        {
            path:"/search",
            name:"Filter | Search Expense",
            icon:<FaShoppingBag />    
        },
        // {
        //     path:"/productList",
        //     name:"Product List",
        //     icon:<FaThList />    
        // },

        // {
        //     path:"/home",
        //     name:"Item List",
        //     icon:<FaThList />    
        // },

        {
            path:"/item",
            name:"Filter | Search",
            icon:<FaShoppingBag />    
        },

        // {
        //     path:"/item",
        //     name:"Logout | Search",
        //     icon:<FaThList />    
        // },
    ]
  return (
    <div className='containerW'>
        <div style={{width: isOpen ? "300px" : "50px"}} className="sidebar">
            <div className="top_section">
                <h1  style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                <div  style={{marginLeft: isOpen ? "50px" : "0"}} className="bars">
                    <FaBars  onClick={toggle} />
                </div>
            </div>
            {
               menuItem.map((item, index)=>(
                    <NavLink to={item.path} key={index} className="link" activeclassname="active">
                        <div className="icon">{item.icon}</div>
                        <div  style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                    </NavLink>
               ))    
            }  
        </div>
        <main>{children}</main>
    </div>
  )
}

export default Sidebar;