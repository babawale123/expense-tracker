import axios from "axios"
import { useState } from "react"
import Sidebar from "../components/Sidebar"


const FilteredItem = () =>{
    const [items, setItems] = useState([])
    const [message, setMessage] = useState('')

       

    const fetchItem = async(e) =>{
        e.preventDefault();
       
        const dateSeleted = e.target['selected'].value;
        const dateChoosed = e.target['date'].value;

        if(!dateChoosed || !dateChoosed > 0){
            setMessage("please select date");
            setTimeout(()=>{
                return setMessage("");
            }, 4000)
        }
        try {
            if(dateSeleted === "date"){
                const date = new Date(dateChoosed).toDateString()

                const {data} = await axios.get(`http://localhost:5000/api/income/all?date=${date}`);
                if(data.income.length > 0){
                   // console.log(data.income)
                    return setItems(data.income)
                }
                else{
                    setMessage("no items for that date");
                    setTimeout(()=>{
                        return setMessage("");
                    }, 4000)
                }
            }

            if(dateSeleted === "year"){
                const year = new Date(dateChoosed).getFullYear()

                const {data} = await axios.get(`http://localhost:5000/api/income/all?year=${year}`);
                if(data.income.length > 0){
                    //console.log(data.income)
                    return setItems(data.income)
                }
                else{
                    setMessage("no items for that date");
                    setTimeout(()=>{
                        return setMessage("");
                    }, 4000)
                }
            }

            if(dateSeleted === "month"){
                const month = new Date(dateChoosed).getMonth()

                const {data} = await axios.get(`http://localhost:5000/api/income/all?monthYear=${month}`);
                if(data.income.length > 0){
                   // console.log(data.income)
                    return setItems(data.income)
                }
                else{
                    setMessage("no items for that month");
                    setTimeout(()=>{
                        return setMessage("");
                    }, 4000)
                }
            }
        } catch (error) {
            setMessage("please select date");
            console.log(error)

        }
    }


    const displayItem = () =>{
        if(items.length > 0) {
            return(
            <table className="table table-striped">      
                    <tr>
                    <td>S/N</td>
                    <td>Name</td>
                    <td>Amount</td>
                    <td>Date</td>
                    </tr>
                <tbody>
                {items && items.map((item, index)=>(
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.amount}</td>
                            <td>{item.date}</td>
                        </tr>
                ))}
                <tr>
                    <td >Total is </td>
                    <td >{addItem()}</td>
                </tr>
                </tbody>
        </table>
            )}

    }

    const addItem = () =>{
        let total = 0;
        items && items.forEach((item)=>{
            total += item.amount;
            
        })
        return total
    }

    return (
        <Sidebar>
        <div className="container mt-3">
            <h1 className="text-center">Filter and Search for Items</h1>
            {message ? <div class="alert alert-success">{message}</div> :null}

            {displayItem()}
            <form onSubmit={fetchItem}>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="date">Filter Date</label>
                            <input type="date" name="date" id="date" className="form-control" />
                        </div>
                    </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="selected">Filter By</label>
                                <select name="selected" id="selected" className="form-control">
                                    <option value="date">Date</option>
                                    <option value="year">Year</option>
                                    <option value="month">Month</option>
                                </select>
                            </div>
                        </div>
                        
                    </div>
                    <input type="submit" value="Get" className="btn btn-success"  />
            </form>
        </div>
 </Sidebar>
    )

}

export default FilteredItem