import { useEffect, useState } from "react"
import { useDispatch,useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import { create } from "../action/itemAction"
import Sidebar from "../components/Sidebar"


const AddIncome = () =>{
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const addItem = useSelector((state)=>state.addItem)
    //const userLogin = useSelector((state)=>state.userLogin)

    const {loading, error} = addItem
    //const {userInfo} = userLogin

    const resetHandler = () => {
        setName("");
        setAmount("");
      };

    const addHandler = (e) => {
        e.preventDefault();
        dispatch(create(name,amount))
        if (!name || !amount) return;
        resetHandler();
        navigate("/home");
        

  };
  useEffect(()=>{},[])
  
    
    return (
        <Sidebar>
            <div className="container mt-5">
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={addHandler}>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                                    <label htmlFor="text">Item Name</label>
                                    <input type="text" placeholder="Enter Item Name" className="form-control" onChange={(e)=>setName(e.target.value)}  />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="text">Item Amount</label>
                                <input type="text" placeholder="Enter Item Amount" className="form-control" onChange={(e)=>setAmount(e.target.value)} v />
                            </div>
                        </div>
                    </div>
                    
                </div>
                <input type="submit" value='submit' className="btn btn-primary" />
             </form>
         </div>
        </Sidebar>
    )
}

export default AddIncome