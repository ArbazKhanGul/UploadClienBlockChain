import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Web3 from 'web3';
import ABI from "./ABI.json";
import supply from "./supply.json"

const Project = () => {

 



const [hash, sethash] = useState("");





const [numberInput, setnumberInput] = useState("");
const [percentCheck, setpercentCheck] = useState(false)
const [receiverAddress, setreceiverAddress] = useState("")

const [checkTokens, setcheckTokens] = useState("Check Tokens")

const [numberlimit, setnumberlimit] = useState({
  min:"",
  max:""
})

async  function  checkBalance(){
  try{

web3=new Web3(window.ethereum);        
    accounts=await web3.eth.getAccounts();
    console.log(accounts[0]);
  
    const tokenInst = new web3.eth.Contract(ABI, data.contractadress);
    const balance = await tokenInst.methods.balanceOf(`${accounts[0]}`).call()  
  
   

    let temp = web3.utils.fromWei(balance, "ether");
    
    // console.log("I am printing token vlaue"+temp);

    let temp2=parseInt(temp);
    // console.log(temp2)
// console.log(tokenAvailable);
    
    let tokensPercent=parseInt(tokenAvailable/10);
// let tokensPercent=100;
// console.log(tokensPercent);
if(temp2>tokensPercent){
  setpercentCheck(true);
    toast.success("You have sufficient tokens now press send tokens");
}
console.log(temp)
console.log(temp2);
console.log(tokenAvailable)
console.log(tokensPercent);



if(temp2<tokensPercent){
  setpercentCheck(false);
  toast.error("You have insufficient balance")
  return
}

setnumberlimit(
 ()=>{return {
  min:tokensPercent ,
  max:temp2,
 }}
 )

 

}
catch(err){

    console.log(err)
    toast.error("You have insufficient balance")
  }


}

function numberChange(event){

setnumberInput(event.target.value);

}

const beforeverify=async ()=>{
               
try {
  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/getreceiveraddress`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });


  const data = await res.json();
  console.log(data)

  if (data.stat === "wrong") {
      throw new Error("Invalid Login");
  }
  if(data.receive=="error"){
    throw new Error("Server error");
  }


setreceiverAddress(data.receive);

} catch (err) {
    console.log(err)
  toast.error("Some error occurring in getting Receiver Address please try later")
    
}

  }


  const history = useHistory();
  const [tokenName, settokenName] = useState();
  const [tokenAvailable, settokenAvailable] = useState("");
const [page, setpage] = useState(false);
const [checkmetamask, setcheckmetamask] = useState(false);

const [data, setdata] = useState({
  contractadress:"",
requestername:"",
requesteremailadress:"",
projectname:"",
officialprojectwebsite:"",
officailprojectemailaddress:"",
iconurl:"",
projectsector:"",
projectdescription:"",
tokensavailable:"",
whitepaper:"",
telegram:"",
discord:"",
twitter:"",
medium:"",
coinmarketcap:"",
coingecko:"",
hash:""
});

let name, value;
  function handleinput(e) {
    setpercentCheck(false);
    name = e.target.name;
    value = e.target.value;
    setdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }



  async function postData(e) {
    e.preventDefault();
    
let {  contractadress,requestername,requesteremailadress,projectname,officialprojectwebsite,officailprojectemailaddress,iconurl,projectsector,projectdescription,tokensavailable,whitepaper,telegram,
discord,
twitter,
medium,
coinmarketcap,
coingecko,

}=data;

console.log(data)

    if (
      contractadress &&
       requestername && 
      requesteremailadress &&
      projectname &&
      officialprojectwebsite &&
      officailprojectemailaddress &&
      iconurl &&
      projectsector &&
      projectdescription &&
      tokensavailable &&
      whitepaper &&
      telegram &&
      discord &&
      twitter &&
      medium &&
      coinmarketcap &&
      coingecko && hash
      ) 
      
      {
      
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/tokenform`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
        credentials: "include",
            body: JSON.stringify({
              contractadress,requestername,requesteremailadress,projectname,officialprojectwebsite,officailprojectemailaddress,iconurl,projectsector,projectdescription,tokensavailable,whitepaper,telegram,
              discord,
              twitter,
              medium,
              coinmarketcap,
              coingecko,
              hash
            }),
          }
        );

        const dat = await res.json();

        if (dat.stat === "wrong" || !dat) {
          toast.error(dat.error);
          console.log("Invalid Registration");
        } else {
          toast.success("Form Submitted successfull");
          console.log("Registration Succesfull");
         setdata({contractadress:"",
         requestername:"",
         requesteremailadress:"",
         projectname:"",
         officialprojectwebsite:"",
         officailprojectemailaddress:"",
         iconurl:"",
         projectsector:"",
         projectdescription:"",
         tokensavailable:"",
         whitepaper:"",
         telegram:"",
         discord:"",
         twitter:"",
         medium:"",
         coinmarketcap:"",
         coingecko:""
         })
         sethash("");
        settokenAvailable("");
        settokenName("");
        }
     
    } 
    else {
      toast.error("Please fill  all the  fields");
    }
  }




// metamask payment option
var accounts;
let web3;

async function getAccount() {
  
  let address;

  // console.log(receiverAddress);
    if (window.ethereum) { //check if Metamask is installed

      web3=new Web3(window.ethereum);

      try {
              await window.ethereum.enable(); //connect Metamask
                            
              
              toast.success("MetaMask Connected");
              setcheckmetamask(true);
           
          } catch (error) {

            toast.error("🦊 Error coming in connecting your metamask Please check your metamask")
        return;
            
          }
          
    } else {
      toast.error("🦊 You must install Metamask into your browser: https://metamask.io/download.html");
   return;     
        } 


        
  };




  async function callAboutPage() {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/about`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      if (!(res.status === 200) || data.stat === "wrong") {
        throw new Error("Invalid Login");
      }
      beforeverify();
      setpage(true);
    } catch (err) {
      console.log(err);
      history.push("/Login");
    }
  }

  useEffect(() => {
    callAboutPage();

  }, []);


// Transaction

async function transaction(){

  
// let tokensPercent=parseInt(tokenAvailable/10);

  // console.log(tokensPercent);
  // const tokenInst = new web3.eth.Contract(supply, data.contractadress);
  
  // 0xe39e98a1cdf3e6c337c6fd23fb943934989903bb
 const web3=new Web3(window.ethereum);
 accounts=await web3.eth.getAccounts();
 
 var contract = new web3.eth.Contract(supply, `${data.contractadress}`, { from: `${accounts[0]}` });


  
  var count =await  web3.eth.getTransactionCount(`${accounts[0]}`);

  let decimals = web3.utils.toBN(18);
  let amount = web3.utils.toBN(numberInput);
  let value = amount.mul(web3.utils.toBN(10).pow(decimals));

  // console.log(value);
// console.log(Math.round(199999/10))

let gasLimit=await web3.eth.estimateGas({
  "from": `${accounts[0]}`,
    "nonce":  "0x" + count.toString(16),
    "to": `${data.contractadress}`,
    "data": contract.methods.transfer(`${receiverAddress}`,value).encodeABI(),
})
console.log(gasLimit);
  var rawTransaction = {
    "from": `${accounts[0]}`,
    "nonce":  "0x" + count.toString(16),
    "gasPrice": "0x00000002540BE400",
    "gasLimit":gasLimit,
    // "gasLimit": "0x0000D49A",
    "to": `${data.contractadress}`,
    "value": "0x0",
    "data": contract.methods.transfer(`${receiverAddress}`,value).encodeABI(),
    "chainId": 97
};
 
 try{
   console.log("Sending")
let has=await web3.eth.sendTransaction(rawTransaction)
toast.success("Tokens send successfully")
console.log(has);
sethash(has.transactionHash)
setnumberInput("");
console.log(hash)
 }
 catch(error){
toast.error("Error comming in sending tokens")
  console.log(error)
 };

// {
  //   {
  //   // method: 'eth_sendTransaction',
  //   // params: [
  //     // {
  //       from:  "0x20E07E16528fD679BCDA2eC62dE22Cb381B7408F",
  //       to: "0x3905ed8B71F4702F7adB5aeFd86c7Ae9fB750EC7",
  //       value: '0x29a2241af62c0000',
  //       gasPrice: '0x09184e72a000',
  //       gas: '0x2710',
  //       data: tokenInst.methods.transfer("0x3905ed8B71F4702F7adB5aeFd86c7Ae9fB750EC7",  {from: "0x20E07E16528fD679BCDA2eC62dE22Cb381B7408F"}),
  //       chainId: 56
  //     // },
    // ],
  // }
  
  // // )
  // .then((txHash) => console.log(txHash)
  
}









  async function getToken(e) {
    let tokenInputVal = e.target.value;
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenInputVal,
        }),
      });

      const dat = await res.json();
      console.log(dat);

      if (!(res.status === 200) || dat.stat === "wrong" || !dat) {
        throw new Error("Invalid Login");
      }

      settokenName(dat.name);
      settokenAvailable(dat.tokens);
      
      setdata((prev) => {
        return {
          ...prev,
          tokensavailable: dat.tokens,
        };
      });


    
      

    } catch (err) {
      settokenName("Wrong Token Address");
      settokenAvailable("");
    }
  }

  return (
    <>

     { page ?
      <div className="container-fluid formBack">
        <div className="row">
          <div className="mt-5 mb-5 col-md-8 col-10 mx-auto projectContainer">
            <div className="header">
              <h2>Token Appication Form</h2>
            </div>
            <form>
              <h3 className="typeOfData">Basic Information</h3>







              

              <div className="mb-3">
                <label htmlFor="TokenAddress" className="form-label">
                  Token Contract Address
                </label>
                <input
                  type="text"
                  onBlur={getToken}
                  className="form-control"
                  id="TokenAddress"
                  name="contractadress"
               value={data.contractadress}
                  onChange={handleinput}
               />
              </div>

              <div className="mb-3">
                <label htmlFor="RequesterName" className="form-label">
                  Requester Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="RequesterName"
                  name="requestername"
                  value={data.requestername}
                  onChange={handleinput}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="RequesterEmail" className="form-label">
                  Requester Email Adress
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="RequesterEmail"
                  name="requesteremailadress"
                  value={data.requesteremailadress}
                  onChange={handleinput}

                />
              </div>

              <div className="mb-3">
                <label htmlFor="ProjectName" className="form-label">
                  Project Name
                </label>
                <input type="text" className="form-control" id="ProjectName" name="projectname" value={data.projectname}
                onChange={handleinput}/>
              </div>

              <div className="mb-3">
                <label htmlFor="OfficialProjectWebsite" className="form-label">
                  Official Project Website
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="OfficialProjectWebsite"
                  name="officialprojectwebsite"
                  value={data.officialprojectwebsite}
                  onChange={handleinput}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="OfficialProjectEmailAddress" className="form-label">
                  Official Project Email Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="OfficialProjectEmailAddress"
                  aria-describedby="emailHelp"
                  name="officailprojectemailaddress"
                  value={data.officailprojectemailaddress}
                  onChange={handleinput}
                />
                
                <div id="emailHelp" className="form-text">
                  Please make sure the email provided has the project officail
                  domain as its prefix
                </div>
              </div>


              <div className="mb-3">
                <label htmlFor="ProjectSector" className="form-label">
                  Paste a 32*32 image icon url
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ProjectSector"
                  aria-describedby="emailHelp"
                name="iconurl"
                value={data.iconurl}
                onChange={handleinput}
                />
                <div id="emailHelp" className="form-text">
                  Please soecify the industry/field that the project is a part
                  of
                </div>
              </div>






              <div className="mb-3">
                <label htmlFor="ProjectSector" className="form-label">
                  Project Sector
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ProjectSector"
                  aria-describedby="emailHelp"
                  name="projectsector"
                  value={data.projectsector}
                  onChange={handleinput}
                />
                <div id="emailHelp" className="form-text">
                  Please soecify the industry/field that the project is a part
                  of
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="ProjectDescription" className="form-label">
                  Project Description (Max 300 characters)
                </label>
                <textarea
                  className="form-control"
                  id="ProjectDescription"
                  name="projectdescription"
                  onChange={handleinput}
                  value={data.projectdescription}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="token" className="form-label">
                  Token Name : {tokenName}
                </label>
                <input
                  type="text"
                  readOnly
                  value={tokenAvailable}
                  className="form-control"
                  id="token"
                  aria-describedby="emailHelp"
                  name="tokensavailable"
                  
                />
                <div id="emailHelp" className="form-text">
                  Please soecify the industry/field that the project is a part
                  of
                </div>
              </div>


              <button   onClick={getAccount} disabled={tokenAvailable?null:"disabled"}   type="button" className="btn btn-primary">
               Connect MetaMask 
              </button>
           {tokenAvailable?<div id="emailHelp" style={{display:"inline-block",color : "green",marginLeft:"10px"}}className="form-text">
                  True contract address entered condition satified 
                </div>:
              <div id="emailHelp" style={{display:"inline-block",color : "red",marginLeft:"10px"}}className="form-text">
                  Please first write your true contract address in start field
                </div>
}
<br />
<br />

<button type="button" onClick={checkBalance} className="btn btn-primary" disabled={checkmetamask?null:"disabled"}>
  Verify Tokens
</button> 


              <button type="button"  className="btn btn-primary" style={{marginLeft:"10px"}} disabled={checkmetamask && percentCheck ?null:"disabled"}  data-bs-toggle="modal" data-bs-target="#exampleModal">
  Send Tokens
</button> 
<div id="emailHelp" style={{display:"inline-block",color : "black",marginLeft:"10px"}}className="form-text">
                  Please first verify the tokens then send token button enable automatically
                </div>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Meta Mask Payment</h5>
        {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
      </div>
      <div className="modal-body">
      <div className="mb-3">
                <label htmlFor="ProjectSector" className="form-label">
                  Enter the amount you want to pay
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="tokenamount"
                  aria-describedby="emailHelp"
                  name="tokenamount"
                  value={numberInput}
                  onChange={numberChange}
                  // onBlur={checkNumberLimit}
          // min={numberlimit.min}
          // max={numberlimit.max}                          
                />
              </div>
              <div>
        Minimum Allowed :    {numberlimit.min}  <br />
        Maximum Allowed : {numberlimit.max} 
      </div>
      </div>
    
      <div className="modal-footer fot">
        <p>Total coins : {tokenAvailable}</p>
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>{setnumberInput("")}}>Close</button>
        <button type="button" disabled={numberInput>=numberlimit.min && numberInput <=numberlimit.max?null:"disabled"} className="btn btn-primary" onClick={transaction}>Send Money</button>
      </div>
    </div>
  </div>
</div>

{
  hash?
<div className="mb-3 mt-3">
                <label htmlFor="payment" className="form-label">
                 <h4> Check Your Payment</h4>
                </label>
<div> <a href={`https://testnet.bscscan.com/tx/${hash}`} target="_blank">{`https://testnet.bscscan.com/tx/${hash}`}</a> </div>
              </div>:""
}
              <h3 className="typeOfData">Social Profiles</h3>

              <div className="mb-3">
                <label htmlFor="whitepaper" className="form-label">
                  WhitePaper
                </label>
                <input type="text" className="form-control" id="whitepaper" name="whitepaper"
                onChange={handleinput} value={data.whitepaper}/>
              </div>

              <div className="mb-3">
                <label  htmlFor="telegram" className="form-label">
                  Telegram
                </label>
                <input name="telegram" type="text" className="form-control" id="telegram"
                onChange={handleinput} value={data.telegram}/>
              </div>

              <div className="mb-3">
                <label htmlFor="discord" className="form-label">
                  Discord
                </label>
                <input type="text" name='discord' className="form-control" id="discord" 
                onChange={handleinput} value={data.discord}/>
              </div>

              <div className="mb-3">
                <label htmlFor="twitter" className="form-label">
                  Twitter
                </label>
                <input type="text" name="twitter" className="form-control" id="twitter" 
                onChange={handleinput} value={data.twitter}/>
              </div>

              <div className="mb-3">
                <label htmlFor="medium" className="form-label">
                  Medium
                </label>
                <input type="text" name="medium" className="form-control" id="medium" 
                onChange={handleinput} value={data.medium}/>
              </div>

              <h3 className="typeOfData">Price Data</h3>

              <div className="mb-3">
                <label htmlFor="coinmarketcap" className="form-label">
                  CoinMarketCap Ticker
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="coinmarketcap"
                  name="coinmarketcap"
                  value={data.coinmarketcap}
                  onChange={handleinput}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="coingecko" className="form-label">
                  CoinGecko Ticker
                </label>
                <input type="text" className="form-control" id="coingecko" name="coingecko"
                onChange={handleinput} value={data.coingecko}/>
              </div>
              
              <button  onClick={postData} type="submit" className="btn btn-primary"> 
                Submit
              </button>




            </form>
          </div>
        </div>
        <ToastContainer position="top-center"></ToastContainer>
      </div>:<h1>Loading...</h1>}

    </>
 
 
 );
};

export default Project;
