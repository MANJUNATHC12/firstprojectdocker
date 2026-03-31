import axios from "axios";
import { useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";


function Login(){

    const[form, setform] = useState({email:"", pass:""})
    const[error, seterror] = useState({});
    const navigate = useNavigate();


       const validate = () => {
        let temp = {};

        if(!form.email){
            temp.email = "Email is requried";
        }
        else if(!/\S+@\S+\.\S+/.test(form.email)){
            temp.email = "Email is not vaild";
        }

        if(!form.pass){
            temp.pass = "password is requried";
        }
        else if(form.pass.length > 6){
            temp.pass = "password should be 6 characater";
        }
        else if(form.pass.length < 6){
            temp.pass = "password should be 6 character";
        }

        seterror(temp);

        return Object.keys(temp).length === 0;
    };


    const submit = async (e) =>{
        e.preventDefault();

        if(validate()){
            // alert("login successfully");

            let res = await axios.get(`http://backend:8081/Register/Login?email=${form.email}&pass=${form.pass}`);
            console.log(res);

            if(res.data === true){
                // alert("Login successfull")
                document.getElementById("msg").innerText = "Login successfully";
                navigate("/Home"); 
            }
            else {
                // alert("Login failed");
                document.getElementById("msg").innerText = "Login failed";
            }



            setform({email:"", pass:""})
    }
};


    return(
        <>
        <form onSubmit={submit}>
            <h2>Login</h2>
            <input type="email" placeholder="enter your email" value={form.email} onChange={(e) => setform({...form, email: e.target.value})}/>
            {error.email && <p style={{color:"red"}}>{error.email}</p>}
            <input type="password" placeholder="enter your password" value={form.pass} onChange={(e) => setform({...form, pass: e.target.value})}/>
            {error.pass && <p style={{color:"red"}}>{error.pass}</p>}
            <button onClick={submit}>Login</button>

            <p id="msg"></p>
        </form>
    
        </>
    )
}
export default Login;