import { Alert, Button, Modal, TextInput } from "flowbite-react"
import { useSelector, useDispatch } from "react-redux"
import userIcon from '../assets/images/userIcon.png'
import { useRef, useState } from "react"
import { useEffect } from "react"
import {CircularProgressbar} from 'react-circular-progressbar';
import {HiOutlineCheckCircle, HiOutlineExclamationCircle, HiXCircle} from'react-icons/hi';
import 'react-circular-progressbar/dist/styles.css';
import {app} from '../firebase'
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
    } from "firebase/storage"
import{
    updateStart,
    updateSuccess,
    updateFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOutStart,
    signOutSuccess,
    signOutFailure
} from '../redux/user/userSlice'

export default function DashProfile() {
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false)
    const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null)
    const [imageFileUploadedError, setImageFileUploadedError]= useState(null)
    const [updateUserSuccess, setUserUpdateSuccess] = useState(null)
    const [updateUserError, setUpdateUserError] = useState(null)
    const [formData, setFormData]= useState({})
    const [showModal, setShowModal] = useState(false)
    const filePickerRef = useRef();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile( event.target.files[0]);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    const handleDeleteAccount = async() => {
        setShowModal(false)
        try {
            dispatch(deleteUserStart())
            const response = await fetch(`/api/user/delete/${currentUser._id}`,{
                method: 'DELETE',
            });
            const data = await response.json();
            response.ok? dispatch(deleteUserSuccess(data)) : dispatch(deleteUserFailure(data.message))
        } catch (error) {
            dispatch(deleteUserFailure(error.message))
        }
    }

    useEffect(()=>{
        if (imageFile) {
            uploadImage();   
        }
    },[imageFile]);

    const uploadImage = async () => {
        setImageFileUploading(true);
        setImageFileUploadedError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot)=>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100;
                setImageFileUploadingProgress(progress.toFixed(0))
            },
            ()=>{
               setImageFileUploadedError('Could not upload image, file must be smaller than 2MB')
               setImageFileUploadingProgress(null)
               setImageFile(null)
               setImageFileUrl(null)
               setImageFileUploading(false)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downLoadURL)=>{
                    setImageFileUrl(downLoadURL);
                    setFormData({...formData, profilePicture: downLoadURL })
                    setImageFileUploading(false)              
                })
            }
        )    
    };

    const handleChange= (event) => {
        setFormData({...formData, [event.target.id]: event.target.value})
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        setUpdateUserError(null)
        setUserUpdateSuccess(null)
        if(Object.keys(formData).length === 0){
            setUpdateUserError('No changes were made')
            return
        }
        if(imageFileUploading){
            setUpdateUserError('Please wait while image is uploading')
            return
        }
        try {
            dispatch(updateStart())
            console.log('current user from dashboard profile: ' +  currentUser._id)
            const response = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if(!response.ok){
                dispatch(updateFailure(data.message))
                setUpdateUserError(data.message)
            }else{
                dispatch(updateSuccess(data))
                setUserUpdateSuccess("User's profile updated successfully")
            }
        } catch (error) {
            dispatch(updateFailure(error.message))
            setUpdateUserError(error.message)
        }
    };

    const handleSignOut = async() => {
        try {
            dispatch(signOutStart())
            const response = await fetch('/api/auth/signout', {
                method: 'POST',
            });
            const data = await response.json();
            !response.ok? dispatch(signOutFailure(data.message)) : dispatch(signOutSuccess())
        } catch (error) {
            dispatch(signOutFailure(error.message))
        }
    };
    
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
        <form 
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file"
                ref={filePickerRef}
                hidden
            />
            <div 
                className="relative w-32 h-32 self-center cursor-pointer shadow-md rounded-full" 
                onClick={()=>filePickerRef.current.click()}
            >
                {imageFileUploadingProgress && (
                    <CircularProgressbar
                        value={imageFileUploadingProgress || 0}
                        text={`${imageFileUploadingProgress}%`}
                        strokeWidth={5}
                        styles={{
                            root: {
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                            },
                            path: {
                                stroke: `rgba(62,152,199,${imageFileUploadingProgress/100})`,
                            }
                        }}
                     />
                )}
                <img 
                    src={imageFileUrl? imageFileUrl: currentUser.avatar === ""? userIcon : currentUser.avatar}  
                    alt="user mage"
                    className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadingProgress && imageFileUploadingProgress < 100 && 'opacity-30'}`} 
                />
            </div>
            {imageFileUploadedError && <Alert color='failure'>{imageFileUploadedError}</Alert>}
            <TextInput
                type="text"
                id="email"
                placeholder="email address"
                defaultValue={currentUser.email}
                onChange={handleChange}              
            />
            <TextInput
                type="text"
                id="role"
                placeholder="role"
                defaultValue={currentUser.role}
                {...(currentUser.role === "admin"? {disabled: false} : {disabled:true})}
                onChange={handleChange}                      
            />
            <TextInput
                type="text"
                id="password"
                placeholder="password"
                onChange={handleChange}              
            />
            <Button
                type="submit"
                gradientDuoTone='pinkToOrange'
                outline
            >
                Update
            </Button>
        </form>
        <div className="text-red-500 flex justify-between mt-5" >
            <span 
                className="cursor-pointer"
                onClick={()=>setShowModal(true)}
            >
                Delete Account
            </span>
            <span 
                className="cursor-pointer"
                onClick={handleSignOut}
            >
                Sign Out
            </span>
        </div>
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
        <Modal
            show={showModal}
            onClose={()=>setShowModal(false)}
            popup
            size='md'
        >
            <Modal.Header/>
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle 
                        className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'
                    />
                    <h3
                        className='text-lg text-gray-500 dark:text-gray-300 mb-2'
                    >
                        Are you sure you want to delete your account?
                    </h3>
                </div>
            </Modal.Body>
            <div className="flex mx-auto gap-5 mb-6">
                <Button
                    gradientMonochrome="failure"
                    outline
                    onClick={()=>setShowModal(false)}
                >
                    No, cancel
                </Button>
                <Button
                    gradientMonochrome="failure"
                    outline
                    onClick={handleDeleteAccount}
                >
                    Yes, I'm sure
                </Button>
            </div>
        </Modal>
    </div>
  )
}

