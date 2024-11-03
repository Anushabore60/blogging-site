import { ChangeEvent } from "react";
import { useState } from "react";
import { Signupinput } from "@anusha_bore/medium-common";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import {BACKEND_URL} from "../../config"

export const Auth=({type}:{type:"Signup"|"Signin"})=>{
    
const navigate =useNavigate()
const [postInput,setPostInput] =useState<Signupinput>({
    username:"",
    email:"",
    password:""
})
  async function signuprequest(){
    try{
      const resopnse=await axios.post(`${BACKEND_URL}/api/V1/user/${type==="Signup"?"signup":"signin"}`,postInput)
    const jwt =resopnse.data
    localStorage.setItem("token",jwt)
    navigate("/blogs")
    }
    catch(err){
        alert("your input details are incorrect")

    }
  
 }
    return<div className=" h-screen flex justify-center flex-col items-center ">
        <div className="px-20">
        <div className="text-center text-3xl font-extrabold mb-2 ">
          Create an account 
        </div>
        <div className="text-md  text-center pb-8 ">
            {type==="Signup"?"Already have an account?":"Don't have any account?" }
          <Link className="underline pl-2" to={type==="Signup"?"/signin":"/Signup"} >{type==="Signup"?"signin":"Signup"}</Link>
        </div> 
        <div className=" ">
        {type==="Signup"?<Input label="Username" placeholder="Jhon" onChange={(e)=>{
            setPostInput({
                ...postInput,
                username:e.target.value,
            })
        }} /> :null}  
        <Input label="E-mail" placeholder="jhondoe@gmail.com" onChange={(e)=>{
            setPostInput({
                ...postInput,
                email:e.target.value,
        })
        }} />    
        <Input label="Password" type="password" placeholder="password" onChange={(e)=>{
            setPostInput({
                ...postInput,
                password:e.target.value,
            })
        }} />   
        <button onClick={signuprequest} type="button" className=" mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full">{type==="Signup"?"Signup":"Signin"}</button> 
        </div>
        </div>
    </div>
}
interface Labeledinput{
    label:string;
    placeholder:string,
    onChange:(e: ChangeEvent<HTMLInputElement>)=>void;
    type?:string
   
    
}
function Input ({label,placeholder,onChange,type}:Labeledinput){
    return<div>
            <div>
              <label  className="block mb-2 text-sm font-medium text-gray-700 dark:text-black mt-1">{label}</label>
              <input onChange={onChange} type={type ||"text"}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
           </div>
    </div>
}