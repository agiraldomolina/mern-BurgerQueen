import {Sidebar} from 'flowbite-react'
import {HiOutlineArrowSmRight, HiUser} from 'react-icons/hi'
import {FaCoffee, FaGulp, FaHandHoldingMedical, FaRegListAlt } from'react-icons/fa'
import {useSelector, useDispatch} from'react-redux'
import {
    signOutStart,
    signOutSuccess,
    signOutFailure
} from '../redux/user/userSlice'
import { Link } from 'react-router-dom'

export default function DashSidebar() {
    const {currentUser} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleSignOut= async () => {
        try {
            dispatch(signOutStart())
            const response = await fetch('/api/auth/signout', {
                method: 'POST',
            });
            const data = await response.json();
            !response.ok? dispatch(signOutFailure(data.message)) : dispatch(signOutSuccess())
        } catch (error) {
            dispatch(signOutFailure(error))
        }
    }
    //console.log(currentUser)
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Sidebar.Item
                    active
                    icon ={HiUser}
                    label={currentUser.role}
                    labelColor="dark"
                    as="div"
                >
                   Profile
                </Sidebar.Item>
                {currentUser && currentUser.isAdmin &&(
                    <Link to="/create-product">
                        <Sidebar.Item
                            icon ={FaHandHoldingMedical}
                            as="div"
                        >
                            Create New Product
                        </Sidebar.Item>
                    </Link>
                )}
                {
                    currentUser.isAdmin && (
                        <>
                            <Link to="/dashboard?tab=products">
                                <Sidebar.Item
                                    icon ={FaGulp}
                                    as="div"
                                >
                                    Manage Products
                                </Sidebar.Item>
                            </Link>
                        </>
                    )
                }
                <Link to="/orders">
                    <Sidebar.Item
                        icon ={FaRegListAlt}
                        labelColor="dark"
                        as="div"
                    >
                        Orders
                    </Sidebar.Item>
                </Link>
                <Sidebar.Item
                    icon ={HiOutlineArrowSmRight}
                    className="cursor-pointer"
                    onClick={handleSignOut}
                >
                    Sign Out
                </Sidebar.Item>

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
