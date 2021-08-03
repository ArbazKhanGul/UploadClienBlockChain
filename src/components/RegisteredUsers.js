import React,{useEffect,useState} from 'react';
import { useHistory } from 'react-router-dom';

const RegisteredUsers = () => {
const history =useHistory();
const [page, setpage] = useState(false);
const [allUSersData, setallUSersData] = useState([])


async function callAboutPage(){
    try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/registerdusers`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

  
        const data = await res.json();
        console.log(data);
  
        if (data.stat === "wrong" || !data) {
        
          throw new Error("Invalid Login");

          
        }

        if (!(res.status === 200) || data.stat === "notadmin") { 
          history.push("/");  
        }

        setallUSersData(data.allUsersDetail);
        console.log("Above all Users Data")
        console.log(allUSersData)
          setpage(true);
      } 
      
      catch (err) {
          
        history.push("/Login");
          
    }
    }

    useEffect(() => {
      callAboutPage();
    }, []);
  
    return (
        <>

        {page?<>
         <h2 className="text-center my-4">Registered Uers Information</h2>   
        
         <table className="table table-bordered">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
    </tr>
  </thead>
  <tbody>

{allUSersData.map((temp,index)=>{
  return(
    
    <tr key={index}>
      <th scope="row">{index+1}</th>
      <td>{`${temp.firstname}  ${temp.lastname}`} </td>
      <td>{temp.email}</td>
      <td>{temp.phone}</td>
    </tr>)
    })
    }
  </tbody>
</table></>:<h1>Loading...</h1>}
        </>
    );
}

export default RegisteredUsers;
