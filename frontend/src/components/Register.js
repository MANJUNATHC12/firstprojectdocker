import axios from "axios";
import { useEffect, useState } from "react";
import './Register.css';
import { useNavigate } from "react-router-dom";


function Register(){
    const[User, setuser] = useState([]);
    const[form, setform] = useState({name:"", email:"", phone:"", pass:"", cpass:""})
    const[editid, seteditid] = useState("");
    const[error, seterror] = useState({});
    const navigate = useNavigate();
    const[searchTrem, setsearchTrem] = useState("");

     const loadUsers = async() => {
        const res = await axios.get("http://localhost:8081/Register");
        setuser(res.data);
    }

    useEffect(() => {
        loadUsers();
    },[])



    const validate = () => {

       let temp = {};

        if(!form.name) temp.name = "Name is required";

        
        if(!form.email){
            temp.email = "Email is requried";
        }
        else if(!/\S+@\S+\.\S+/.test(form.email)){
            temp.email = "Email is not vaild";
        }


        if(!form.phone){
            temp.phone = "phone number is requried";
        }
        else if(form.phone.length > 10){
            temp.phone = "phone number should be 10 digit";
        }
        else if(form.phone.length < 10){
            temp.from.phone = "phone number should be 10 digit";
        }


        if(!form.pass){
            temp.pass = "password is requried";
        }
        else if(form.pass.length > 6){
            temp.pass = "password must be contain 6 character";
        }
        else if(form.pass.length < 6){
            temp.pass = "password must be contain 6 character";
        }


        if(!form.cpass){
            temp.cpass = "conform password is requried";
        }
        else if(form.cpass !== form.pass){
            temp.cpass = "conform password must be match with your password";
        }
        seterror(temp);

        return Object.keys(temp).length === 0;
    };


    const handlesubmit = async (e) => {
        e.preventDefault();
        
        if(!validate()) return;

        try{
             if(editid){
            await axios.put(`http://localhost:8081/Register/${editid}`, form);
            seteditid(null);
                     document.getElementById("msg").innerText = "User upadated";
        }
        else{
            await axios.post("http://localhost:8081/Register", form);
                 document.getElementById("msg").innerText = "Register successfull";
                 navigate("/Login");
        }   
    }
    catch(error){
        console.error(error);
    }
         setform({name:"", email:"", phone:"", pass:"", cpass:""});
            loadUsers();
    };

    const edituser = (u) => {
        setform(u);
        seteditid(u.id);
    }

    const deleteuser = async(id) => {
        await axios.delete(`http://localhost:8081/Register/${id}`);
        loadUsers();    
    }

    
    const search = () => {
        axios.get("http://localhost:8081/Register/search", {
            params: {keyword: searchTrem}
        })
        .then(res => setuser(res.data))
        .catch(error => console.error(error))
    };



    return(
    <div className="container">
        <form onSubmit={handlesubmit} className="register-form">
            <h2>Register</h2>
            <input placeholder="enter your name" value={form.name} onChange={(e) => setform({...form, name: e.target.value})} type="text"/>
              {error.name && <p style={{color:"red", padding:0}}>{error.name}</p>}
            <input placeholder="enter your email" value={form.email} onChange={(e) => setform({...form, email: e.target.value})} type="email"/>
              {error.email && <p style={{color:"red"}}>{error.email}</p>}
            <input placeholder="enter your phone" value={form.phone} onChange={(e) => setform({...form, phone: e.target.value})} type="number"/>
              {error.phone && <p style={{color:"red"}}>{error.phone}</p>}
            <input placeholder="enter your pass" value={form.pass} onChange={(e) => setform({...form, pass: e.target.value})} type="password"/>
              {error.pass && <p style={{color:"red"}}>{error.pass}</p>}
            <input placeholder="enter your cpass" value={form.cpass} onChange={(e) => setform({...form, cpass: e.target.value})} type="password"/>
              {error.cpass && <p style={{color:"red"}}>{error.cpass}</p>}
              
               <button onClick={handlesubmit}><link to="login"></link>
                {editid ? "update" : "Register"}
            </button>
            
    
        

            <p id="msg"></p>
        </form>

    


        <input type="text" placeholder="Search by name or email" value={searchTrem} onChange={(e) => setsearchTrem(e.target.value)}/>
        <button onClick={search}>search</button>

        <table className="user-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {User.map(u =>(
                    <tr>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.phone}</td>
                        <td className="action-cell">
                            <button onClick={() => {edituser(u)}}>Edit</button>
                            <button onClick={() => {deleteuser(u.id)}}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

export default Register;