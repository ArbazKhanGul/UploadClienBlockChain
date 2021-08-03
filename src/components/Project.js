import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Project = () => {
  const history = useHistory();
  const [tokenName, settokenName] = useState();
  const [tokenAvailable, settokenAvailable] = useState("");
const [page, setpage] = useState(false);
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
coingecko:""
});

let name, value;
  function handleinput(e) {
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
coingecko}=data;

console.log(data)

    if (
      contractadress &&
      requestername &&
      requesteremailadress &&
      officialprojectwebsite &&
      officailprojectemailaddress &&
      iconurl &&
      projectdescription &&
      tokensavailable
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
              coingecko
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
         
        }
     
    } 
    else {
      toast.error("Please fill  all the mandatory fields");
    }
  }











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

      setpage(true);
    } catch (err) {
      console.log(err);
      history.push("/Login");
    }
  }

  useEffect(() => {
    callAboutPage();
  }, []);

  async function getToken(e) {
    let tokenInputVal = e.target.value;
    try {
      const res = await fetch("/token", {
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
                  Token Contract Address*
                </label>
                <input
                  type="text"
                  onBlur={getToken}
                  className="form-control"
                  id="TokenAddress"
                  name="contractadress"
               onChange={handleinput}
               />
              </div>

              <div className="mb-3">
                <label htmlFor="RequesterName" className="form-label">
                  Requester Name*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="RequesterName"
                  name="requestername"
                  onChange={handleinput}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="RequesterEmail" className="form-label">
                  Requester Email Adress*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="RequesterEmail"
                  name="requesteremailadress"
                  onChange={handleinput}

                />
              </div>

              <div className="mb-3">
                <label htmlFor="ProjectName" className="form-label">
                  Project Name
                </label>
                <input type="text" className="form-control" id="ProjectName" name="projectname"
                onChange={handleinput}/>
              </div>

              <div className="mb-3">
                <label htmlFor="OfficialProjectWebsite" className="form-label">
                  Official Project Website*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="OfficialProjectWebsite"
                  name="officialprojectwebsite"
                  onChange={handleinput}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="OfficialProjectEmailAddress" className="form-label">
                  Official Project Email Address*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="OfficialProjectEmailAddress"
                  aria-describedby="emailHelp"
                  name="officailprojectemailaddress"
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
                  onChange={handleinput}
                />
                <div id="emailHelp" className="form-text">
                  Please soecify the industry/field that the project is a part
                  of
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="ProjectDescription" className="form-label">
                  Project Description (Max 300 characters)*
                </label>
                <textarea
                  className="form-control"
                  id="ProjectDescription"
                  name="projectdescription"
                  onChange={handleinput}
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
              <button type="button" className="btn btn-primary">
                MetaMask Payment
              </button>
              <h3 className="typeOfData">Social Profiles</h3>

              <div className="mb-3">
                <label htmlFor="whitepaper" className="form-label">
                  WhitePaper
                </label>
                <input type="text" className="form-control" id="whitepaper" name="whitepaper"
                onChange={handleinput}/>
              </div>

              <div className="mb-3">
                <label  htmlFor="telegram" className="form-label">
                  Telegram
                </label>
                <input name="telegram" type="text" className="form-control" id="telegram"
                onChange={handleinput} />
              </div>

              <div className="mb-3">
                <label htmlFor="discord" className="form-label">
                  Discord
                </label>
                <input type="text" name='discord' className="form-control" id="discord" 
                onChange={handleinput}/>
              </div>

              <div className="mb-3">
                <label htmlFor="twitter" className="form-label">
                  Twitter
                </label>
                <input type="text" name="twitter" className="form-control" id="twitter" 
                onChange={handleinput}/>
              </div>

              <div className="mb-3">
                <label htmlFor="medium" className="form-label">
                  Medium
                </label>
                <input type="text" name="medium" className="form-control" id="medium" 
                onChange={handleinput}/>
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
                  onChange={handleinput}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="coingecko" className="form-label">
                  CoinGecko Ticker
                </label>
                <input type="text" className="form-control" id="coingecko" name="coingecko"
                onChange={handleinput}/>
              </div>
              
              <button  onClick={postData} type="submit" className="btn btn-primary"> */}
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
