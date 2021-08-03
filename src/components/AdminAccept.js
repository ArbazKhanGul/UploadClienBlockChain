import React,{useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const AdminAccept = () => {
const history =useHistory();

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
          // setpage(true);
      } catch (err) {
          
        history.push("/Login");
          
    }
    }

    useEffect(() => {
      callAboutPage();
    }, []);
  
    return (
        <>
         <h1>I amd Admin Accepted Requests</h1>   
        </>
    );
}

export default AdminAccept;
