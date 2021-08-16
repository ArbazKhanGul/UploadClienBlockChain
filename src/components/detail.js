import React,{useEffect,useState} from 'react'
import { useParams } from "react-router-dom";
function Detail() {

    const {detailtype}=useParams();

console.log(detailtype);
    const [formDataServer, setformDataServer] = useState([])
    const [page, setpage] = useState(false)
    async function callAboutPage(){
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/detailtype`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                detailtype
              }),

            });
    
      
            const data = await res.json();
            console.log(data);
      
            if (data.stat === "fail") {
                throw new Error("Invalid Login");
            }
            
            const storetemp=data.formaccepted[0];
            console.log(storetemp)
            setformDataServer(storetemp);
         setpage(true)
    // console.log(allUSersData)
          
            
          } catch (err) {
              
            console.log(err)
              
        }
    
    
        }
    
        useEffect(() => {
          callAboutPage();
        }, []);
      
    


    return (
        <>
         {page?  <div className="m-3" >
               <div>
                   <h1>
                       Project Name
                   </h1>
                   <h3 className="text-secondary">{formDataServer.projectname}</h3>
                   <h1 className="mt-3">Project Description</h1>
                   <p> {formDataServer.projectdescription} </p>
              <h1>Social Links</h1>
              <li className="detaillist">Whitepaer:  <span>{formDataServer.whitepaper}</span> </li>
              <li className="detaillist">Telegram:  <span>{formDataServer.telegram}</span> </li>
              <li className="detaillist">Discord:  <span>{formDataServer.discord}</span> </li>
              <li className="detaillist">Twitter:  <span>{formDataServer.twitter}</span> </li>
              <li className="detaillist">Medium:  <span>{formDataServer.medium}</span> </li>
              
               </div>
               </div> : <h1>Loading...</h1>}
        </>
    )
}

export default Detail;
