import React,{useEffect,useState} from 'react';
import { useHistory } from 'react-router-dom';

const AdminAccept = () => {
const history =useHistory();
const [page, setpage] = useState(false);
const [formDataServer, setformDataServer] = useState([])
async function callAboutPage(){
    try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/client`, {
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
         <h2 className="text-center mt-2">Submitted Form Status</h2>  

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
      <td>Token Name</td> 
    </tr>
  </thead>
  <tbody>
    <tr>
    <td>{temp.twitter}</td>
      <td>{temp.medium}</td>
      <td>{temp.coinmarketcap}</td> 
      <td>{temp.tokenName}</td> 
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
  
  
  <thead className=" table-light " style={{text: "black !important",fontWeight:"bold"
  }}>
    <tr className="text-dark bold">
      <td width="25%" >Can you briefly introduce yourself as well as {temp.tokenName} NFT ?
</td>
      <td width="25%" >Is {temp.tokenName} NFT a safe and reliable platform for investors? What value does {temp.tokenName} NFT bring to investors and the blockchain community?
</td>
      <td width="25%" > Who are {temp.tokenName} NFT strategic investors? And what is {temp.tokenName} NFT roadmap to 2021? What is your ultimate goal for this year?</td>
      <td width="25%" > What are the competitive advantages of your project? What advantages do you have that other competitors dont have? What would be your project secure most similar contender in the market today in terms of scalability, security, features & adaptability?</td>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td width="25%"> {temp.q1}</td>
      <td width="25%" >{temp.q2}</td>
      <td width="25%" >{temp.q3}</td> 
      <td width="25%" >{temp.q4}</td> 
    </tr>
  </tbody>



  <thead className=" table-light " style={{text: "black !important",fontWeight:"bold"
  }}>
    <tr className="text-dark bold">
      <td width="25%" >What are the highlights of your project and products that you believe will help you succeed? How revenue is generated to sustain the project, and what plans do you have to attract more users in the future?
</td>
      <td width="25%" >What is the token's role in the ecosystem? Where can people buy right now? what will it do? Is your platform suitable for Crypto beginners? Or is it limited to professional users only?</td>
      <td width="25%" >  Almost 80% investors have just focused on price of token in short term instead of understanding the real value of the project. Can you tell us on motivations and benefits for investors to hold your token in long term?
</td>
      <td width="25%" >
      Users often care less about technology, but rather the value of the token. How do you manage to strike a balance between developing the technology and also improving the value of the token?
      </td>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td width="25%"> {temp.q5}</td>
      <td width="25%" >{temp.q6}</td>
      <td width="25%" >{temp.q7}</td> 
      <td width="25%" >{temp.q8}</td> 
    </tr>
  </tbody>
</table> 
<h2>Status  :  <span>{temp.status}</span></h2>

  </div>
)

})} 
</>:<h1>Loading....</h1>}

        </>
    );
}

export default AdminAccept;
