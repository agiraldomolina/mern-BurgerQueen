import { Alert, Button, Modal, Select, TextInput } from "flowbite-react"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import {HiOutlineCheckCircle, HiXCircle} from'react-icons/hi';
import { LuChefHat } from "react-icons/lu";
import 'react-circular-progressbar/dist/styles.css';

import{
    updateStart,
    updateSuccess,
    updateFailure,
} from '../redux/user/userSlice'
import { useState } from "react";
import { FaUserTie } from "react-icons/fa";

export default function UpdateUser() {
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state => state.user)
    const [updateUserSuccess, setUserUpdateSuccess] = useState(null)
    const [updateUserError, setUpdateUserError] = useState(null)
    const [formData, setFormData]= useState({})
    const [loadUserData, setLoadUserData] = useState(false)
    const params = useParams()
    const userId =params.userId
    console.log(userId)

    
    useEffect(()=>{
        try {
            const fetchUser = async() => {
                const response = await fetch(`/api/user/get?userId=${userId}`)
                const data = await response.json()
                const user = data.users[0]
                console.log(user)
                if(!response.ok || data.success === false){
                    setLoadUserData(false)
                    return
                }
                setLoadUserData(true)
                setFormData(user)
            }
            fetchUser()
        } catch (error) {
            console.log(error)
        }
    },[ userId]);

    const handleSubmit = async(event)=>{
        event.preventDefault();
        setUpdateUserError(null)
        setUserUpdateSuccess(null)
        if(Object.keys(formData).length === 0){
            setUpdateUserError('No changes were made')
            return
        }
        try {
            //dispatch(updateStart())
            console.log('current user from dashboard profile: ' +  currentUser._id)
            const response = await fetch(`/api/user/update/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if(!response.ok){
                //dispatch(updateFailure(data.message))
                setUpdateUserError(data.message)
                setUserUpdateSuccess(null)
            }else{
                //dispatch(updateSuccess(data))
                setUserUpdateSuccess("User's profile updated successfully")
                setTimeout(() => {
                    window.location.href='/dashboard?tab=users'
                },1000)
            }
        } catch (error) {
            //dispatch(updateFailure(error.message))
            setUpdateUserError(error.message)
            setUserUpdateSuccess(null)
        }
    };
    
  return (
    <div className=" max-w-lg mx-auto p-3 w-full">
        <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
        <form 
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
        >
            <img 
                src={formData.avatar} 
                alt="profile avatar" 
                className="rounded-full h-32 w-32 object-cover bg-gray-50 mx-auto"  
            />
            <TextInput
                type="text"
                id="email"
                placeholder="email address"
                Value={formData.email}
                onChange={(event)=>setFormData({...formData, email: event.target.value})}              
            />
            <select 
              id="role" 
              className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 rounded-md"
              onChange={(event)=>setFormData({...formData, role:event.target.value})}
              value={formData.role}
              {...(currentUser.isAdmin?{disabled:false}:{disabled:true})}
              >             
                <option value=''>Choose a type</option>
                <option value="admin">Admin</option>
                <option value="waiter">Waiter</option>
                <option value="chef">Chef</option>
                <option value="client">Client</option>
            </select>

            <TextInput
                type="text"
                id="password"
                placeholder="password"
                disabled                            
            />
            <Button
                type="submit"
                gradientDuoTone='pinkToOrange'
                outline
            >
                Update
            </Button>
        </form>
        {updateUserSuccess && (
            <Alert
                color='success'
                icon={HiOutlineCheckCircle}
                className="mt-5"
            >
                {updateUserSuccess}
            </Alert>
        )}
        {updateUserError && (
            <Alert
                color='failure'
                icon={HiXCircle}
                className="mt-5"
            >
                {updateUserError}
            </Alert>
        )}
    </div>
  )
}

