    import axios from "axios";
import { useEffect, useState } from "react";

function Reg1(){

    const[User, setuser] = useState([]);
    const[form, setform] = useState({name:"", email:"", phone:"", pass:"", cpass:""})
    const[editid, seteditid] = useState("");
    const[Error, seterror] = useState({})
 


     const loadUsers = async() => {
        const res = await axios.get("http://backend:8081/Register");
        setuser(res.data);
    }


    useEffect(() => {
        loadUsers();
    },[])



    const validate = () => {
       
        let temperror = {};
        
        if(!form.name) temperror.name = "Name is requried";
        

        if(!form.email){
            temperror.email = "Email is required ";
        }
        else if(!/\S+@\S+\.\S+/.test(form.email)){
            temperror.email = "Email is not valid";
        }

        if(!form.phone){
            temperror.phone = "phone number is required";
        }
        else if(form.phone.length > 10){
            temperror.phone = "phone number is more than 10 digit";
        }
        else if(form.phone.length < 10){
            temperror.phone = "phone number is less than 10 digit";
        }
        seterror(temperror);

        return Object.keys(temperror).length === 0;
    };


    const handlesubmit = async(e) => {
        e.preventDefault();
        
        if(!validate()) return; 
            console.log("valid data");

            try{
                if(editid){
            await axios.put(`http://backend:8081/Register/${editid}`, form);
            seteditid(null);
        }
        else{
            await axios.post("http://backend:8081/Register", form);
        }
     }
     catch (error){
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
        await axios.delete(`http://backend:8081/Register/${id}`);
        loadUsers();    
    }
   




    // const loadUsers = async() => {
    //     const res = await axios.get("http://localhost:8081/Register");
    //     setuser(res.data);
    // }

    // useEffect(() => {
    //     loadUsers();
    // },[])

    // const edituser = (u) => {
    //     setform(u);
    //     seteditid(u.id);
    // }


    // const submit = async() => {
    //     if(editid){
    //         await axios.put(`http://localhost:8081/Register/${editid}`, form);
    //         seteditid(null);
    //     }
    //     else{
    //         await axios.post("http://localhost:8081/Register", form);
    //     }
    //        setform({name:"", email:"", phone:"", pass:"", cpass:""});
    //         loadUsers();
    // };

    // const deleteuser = async(id) => {
    //     await axios.delete(`http://localhost:8081/Register/${id}`);
    //     loadUsers();    
    // }



    return(
    <div className="container">
        <form onSubmit={handlesubmit}>
            <input placeholder="enter your name" value={form.name} onChange={(e) => setform({...form, name: e.target.value})}/>
              {Error.name && <p style={{color:"red"}}>{Error.name}</p>}
            <input placeholder="enter your email" value={form.email} onChange={(e) => setform({...form, email: e.target.value})}/>
              {Error.email && <p style={{color:"red"}}>{Error.email}</p>}
            <input placeholder="enter your phone" value={form.phone} onChange={(e) => setform({...form, phone: e.target.value})}/>
              {Error.phone && <p style={{color:"red"}}>{Error.phone}</p>}
            <input placeholder="enter your pass" value={form.pass} onChange={(e) => setform({...form, pass: e.target.value})}/>
              {Error.pass && <p style={{color:"red"}}>{Error.pass}</p>}
            <input placeholder="enter your cpass" value={form.cpass} onChange={(e) => setform({...form, cpass: e.target.value})}/>
              {Error.cpass && <p style={{color:"red"}}>{Error.cpass}</p>}
            <button onClick={handlesubmit}>
                {editid ? "update" : "add"}
            </button>
        </form>

        <br/>
        <hr/>


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


export default Reg1;