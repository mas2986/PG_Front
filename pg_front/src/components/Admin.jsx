import React from 'react';
import { NavLink } from 'react-router-dom';
import './Admin.css';


function Admin() {
    return (
        <div className='admin_container'>
            <div className='admin_item'>
                <NavLink to='/admin/product' className="NavLink" >Agregar producto</NavLink>
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