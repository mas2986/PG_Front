import React, { useEffect } from 'react';
import { NavLink , useHistory} from 'react-router-dom';
import './Admin.css';


function Admin() {
    const history = useHistory()

    useEffect(()=>{
        const tokenJSON = JSON.parse(localStorage.getItem("userDetails"));
        if (tokenJSON) {
          const { token } = tokenJSON;
          const { rol } = tokenJSON.data.user;
          if(token&&rol==="user") return history.push("/login")
        }
        if(!tokenJSON) return history.push("/login")
      },[])

    return (
        <div className='admin_container'>
            <div className='admin_item'>
                <NavLink to='/admin/create' className="NavLink" >Agregar producto</NavLink>
            </div>
            <div className='admin_item'>
                <NavLink to='/admin/category' className="NavLink">Agregar categoria</NavLink>
            </div> 
            <div className='admin_item'>
                <NavLink to='/admin/editUsers' className="NavLink">Editar Usuarios</NavLink>
            </div>   
            <div className='admin_item'>
                <NavLink to='/admin/orders' className="NavLink">Ver ordenes</NavLink>
            </div> 
        </div>
    )
}

export default Admin