import React,{useState,useEffect} from 'react'
import {useHistory} from "react-router-dom"
const Home = () => {
const history=useHistory();

    const [formDataServer, setformDataServer] = useState([])
    async function callAboutPage(){
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/formdetail`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              credentials: "include",
            });
    
      
            const data = await res.json();
            console.log(data);
      
            if (data.stat === "fail") {
                throw new Error("Invalid Login");
            }
            
            const storetemp=data.formaccepted;
            console.log(storetemp)
            setformDataServer(storetemp);
          
            
          } catch (err) {
              
            console.log("Some error come")
              
        }
    
    
        }

        useEffect(() => {
            callAboutPage();
          }, []);


          function sendid(temp){
history.push(`/detail/${temp}`)

          }
    return (
        <>
        <div className="homeDiv">
         <div className="inside">
      
      {formDataServer.map((temp,index)=>{
      return(   <div key={index} className="card maincard" style={{width: "270px", height:"280px"}}>
  <div className="card-body">
    <h4 className="card-title">Project Name</h4>
    <h6 className="card-subtitle mb-2 text-muted mt-2">{temp.projectname}</h6>
    <h4 className="card-title">Project Description</h4>
    <p className="card-text pcard">{temp.projectdescription}</p>
  
<button className='btn btn-primary buttondet' onClick={()=>{
  sendid(temp._id);
}} >View Details</button>
  </div>
</div>)
})}

            
      
            </div></div>
        </>
    )
}

export default Home
