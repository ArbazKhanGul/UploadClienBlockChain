import React,{useEffect,useState} from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReceiverAddress = () => {
const history =useHistory();
const [page, setpage] = useState(false);
const [addressValue, setaddressValue] = useState("")
const [privateKey, setprivateKey] = useState("")
async function callAboutPage(){
    try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/receiveraddress`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
      
        });

  
        const data = await res.json();
        console.log(data);
  
        if (data.stat === "wrong") {
            throw new Error("Invalid Login");
        }
        if (!(res.status === 200) || data.stat === "notadmin") {
            history.push("/");  
        }
        setpage(true);          
// console.log(allUSersData)
      
        
      } catch (err) {
          
        history.push("/Login");
          }}

    useEffect(() => {
      callAboutPage();
    }, []);
  

// Recerver Addrss

    async function sendAddress(e) {
      e.preventDefault();
  let checker=false;

let a=privateKey.length;
if(a==64){
checker=true;
}

     try{ 
      if (addressValue && checker) {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/verifyaddress`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            address:addressValue,
            privatekey:privateKey
          }),
        });
  
        const data = await res.json();
        console.log(data);
        if (data.stat === "wrong") {
          throw new Error("Invalid Login");
      }
      if (data.stat === "notadmin") {
          history.push("/");  
      }


      if(data.formstatus){
        toast.success("Receiver Address Changed Successfully");
        setprivateKey("");
        setaddressValue("");
console.log("PRint form status true")
      }
      else if(data.formstatus=="error"){
        toast.success("Some Error Occurred in changing Receiver Address")
        console.log("PRint form status true")
      } 
      else{
        toast.error("Please Enter valid Receiver Address");
        console.log("PRint form status false")
      }



      }
    
    else{
      toast.error("Please fill all the fields correctly")
    }
    
    }
             catch (err) {
          
        history.push("/Login");
          
    }
    }


function changeValue(e){
setaddressValue(e.target.value);

}



function changekey(e){
  setprivateKey(e.target.value);
  
  }
  

  return(
  <>
  <h2 className="mt-3 text-center">Change Receiver Address</h2>
<div className="container"> 
  <form>
  <div className="mb-3">
    <label htmlFor="address" className="form-label">Enter Receiver Address</label>
    <input type="text" name="address" className="form-control" id="address" onChange={changeValue} value={addressValue} aria-describedby="address" />
    {/* <div id="address" className="form-text"></div> */}
    <label htmlFor="address" className="form-label">Enter the private key of same address</label>
    <input type="text" name="address" className="form-control" id="address" onChange={changekey} value={privateKey} aria-describedby="address" />
 
  </div>

  <button type="submit" onClick={sendAddress} className="btn btn-primary">Submit</button>
</form>
</div>

       <ToastContainer position="top-center"></ToastContainer> 
  </>
  )

}


export default ReceiverAddress;