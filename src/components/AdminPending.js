import React,{useEffect,useState} from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPending = () => {
const history =useHistory();
const [allUSersData, setallUSersData] = useState([])
const [page, setpage] = useState(false);
    async function callAboutPage(){
    try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/adminpending`, {
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
          // setpage(false);
            throw new Error("Invalid Login");
        }

        if (!(res.status === 200) || data.stat === "notadmin") {
          // setpage(false);  
          history.push("/");  
        }
       if(data.stat=="servererror"){
      // setpage(false);
        history.push("/"); 
       }
const storetemp=data.response;
console.log(storetemp)
setallUSersData(storetemp);
setpage(true);          

console.log(allUSersData)
      } 
      catch (err) {
          
        history.push("/Login");
          
    }
    }

    useEffect(() => {
      callAboutPage();
    }, []);
  

// Accept
// reject


async function action(formid,behaviour){

  try{
  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/action`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      formid,
      behaviour
    }),
  });
  
  const dat = await res.json();
  console.log(dat);

  if (dat.stat === "wrong") {
       throw new Error("Invalid Login");
}
if(dat.stat==="empty"){
  toast.warn("Error Coming in performing action on form");
}
else{
  toast.success(dat.message);
  setallUSersData(dat.responsePending)
}

}
catch(err){
  console.log(err);
  history.push("/Login");
  
}

}


    return (
    
        <>
{page?<>
         <h2 className="text-center mt-2">Token Forms Pending</h2>  

{allUSersData.map((temp,index)=>{  
  return(
 <div className="mb-5" key={index}>
         <h2 className="text-left mt-4 mb-3">Form No {index+1}</h2>  
         <table className="table">
        
  <thead className=" table-light " style={{text: "black !important",fontWeight:"bold"
  }}>
    <tr className="text-dark bold">
      <td>Token Contarct Adress</td>
      <td>Requester Name</td>
      <td>Requester Email Address</td>
      <td>Project Name</td>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>{temp.contractadress}</td>
      <td>{temp.requestername}</td>
      <td>{temp.requesteremailadress}</td> 
      <td>{temp.projectname}</td> 
    </tr>
  </tbody>
  <thead className=" table-light " style={{text: "black !important",fontWeight:"bold"
  }}>
    <tr className="text-dark bold">
      <td>Image Icon Url</td>
      <td>Project Sector</td>
    <td>Total Tokens Avilable</td>
    <td>MetaMask Payment</td>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>{temp.iconurl}</td>
      <td>{temp.projectsector}</td>
      <td>{temp.tokensavailable}</td> 
      <td><a style={{textDecoration:"none"}} target="_blank" href={`https://testnet.bscscan.com/tx/${temp.hash}`}>Click to see payment</a></td> 
    </tr>
  </tbody>

  <thead className=" table-light " style={{text: "black !important",fontWeight:"bold"
  }}>
    <tr className="text-dark bold">
      <td>Project Description</td>
      <td>Discord</td>
      <td>WhitePaper </td>
      <td>Telegram</td>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td width="25%"> {temp.projectdescription}</td>
      <td>{temp.discord}</td>
      <td>{temp.whitepaper}</td> 
      <td>{temp.telegram}</td> 
    </tr>
  </tbody>
  <thead className=" table-light " style={{text: "black !important",fontWeight:"bold"
  }}>
    <tr className="text-dark bold">
  
      <td>Twitter</td>
      <td>Medium </td>
      <td>Coin Market Cap Ticker</td>
      <td>Coin Gecko Ticker</td> 
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>{temp.twitter}</td>
      <td>{temp.medium}</td>
      <td>{temp.coinmarketcap}</td> 
      <td>{temp.coingecko}</td> 
    </tr>
  </tbody>
  
  
</table> 

<button type="button" onClick={()=>{action(temp._id,"accept")}} className="btn btn-primary mr-3" style={{display:"inline-block",marginLeft:"5px"}}>Accept</button>
  <button type="button" onClick={()=>{action(temp._id,"reject")}} className="btn btn-danger" style={{display:"inline-block",marginLeft:"20px"}}>Reject</button>
  </div>
)

})} 
</>:<h1>Loading....</h1>}

<ToastContainer position="top-center"></ToastContainer>
        </>
    );
}

export default AdminPending;
