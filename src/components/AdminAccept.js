import React,{useEffect,useState} from 'react';
import { useHistory } from 'react-router-dom';

const AdminAccept = () => {
const history =useHistory();
const [page, setpage] = useState(false);
const [formDataServer, setformDataServer] = useState([])
async function callAboutPage(){
    try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/adminaccept`, {
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
        const storetemp=data.formaccepted;
        console.log(storetemp)
        setformDataServer(storetemp);
        setpage(true);          
// console.log(allUSersData)
      
        
      } catch (err) {
          
        history.push("/Login");
          
    }


    }

    useEffect(() => {
      callAboutPage();
    }, []);
  
    return (
        <>
       {page?<>
         <h2 className="text-center mt-2">Token Forms Accepted</h2>  

{formDataServer.map((temp,index)=>{  
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

  <thead className=" table-light " style={{text: "black !important",fontWeight:"bold"
  }}>
    <tr className="text-dark bold">
  
      <td>Token Symbol</td>
      <td>Token Chain </td>
      <td>Total tokens</td>
      <td>Token Decimal</td> 
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>{temp.tokensymbol}</td>
      <td>{temp.tokenchain}</td>
      <td>{temp.tokensavailable}</td> 
      <td>{temp.tokendecimal}</td> 
    </tr>
  </tbody>
  

  
</table> 

  </div>
)

})} 
</>:<h1>Loading....</h1>}

        </>
    );
}

export default AdminAccept;
