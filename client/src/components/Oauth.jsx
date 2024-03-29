import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { app} from '../firebase'
import{ 
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import {signInSuccess} from '../redux/user/userSlice'
import { useNavigate } from "react-router-dom";

export default function Oauth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = getAuth(app);
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        try {
            const resultsFromGoogle= await signInWithPopup(auth, provider);
            const response = await fetch('/api/auth/googlesignin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL
                })
            })
            //console.log(response)
            const data = await response.json()
            console.log(data)
            if (response.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    }
       
    return (
    <Button
        type="button"
        gradientDuoTone='pinkToOrange'
        outline
        onClick={handleGoogleSignIn}
    >
        <AiFillGoogleCircle className="w-6 h-6 mr-2"/>
        Continue with Google
    </Button>
  )
}
