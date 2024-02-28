import { Button, Modal, Table } from "flowbite-react"
import { useState,useEffect } from "react"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import userIcon from '../assets/images/userIcon.png'
import { useSelector } from "react-redux"
export default function DashUsers() {
    const {currentUser} = useSelector(state => state.user)
    const [users, setUsers] = useState([])
    const [sortBy, setSortBy] = useState('role');
    const [sortDirection, setSortDirection] = useState('asc');
    const [showMore, setShowMore] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [userIdToDelete, setUserIdToDelete] = useState(null)
    const [userMailToDelete, setUserMailToDelete] = useState(null)

    console.log(users)
    console.log(sortDirection)

    const handleDeleteUser=async()=> {
        setShowModal(false)
        try {
            const response = await fetch(`/api/user/delete/${userIdToDelete}`,{
                method: 'DELETE',
            })
            const data = await response.json()
            if(!response.ok || data.success === false){
                setUserMailToDelete(null)
                return
            }else{
              setUsers((prev)=>
               prev.filter(user=>user._id!== userIdToDelete))
               setUserMailToDelete(null)  
            }
        } catch (error) {
           console.log(error)
           setUserMailToDelete(null)  
        }
    }

    useEffect(() => {
        setShowMore(true)
        const fetchUsers = async () => {
            try { 
                const response = await fetch(`/api/user/get?sortBy=${sortBy}&order=${sortDirection}`)
                const data = await response.json();
                if (response.ok) {
                    setUsers(data.users)
                    if (data.users.length < 10) setShowMore(false)
                }
            return data
            } catch (error) {
               setUsers([]) 
            }
        }
        fetchUsers()
    }, [currentUser, sortBy, sortDirection]);

    const handleShowMore = async() => {
        const startIndex = users.length;
        try {
            const response = await fetch(`/api/user/get?startIndex=${startIndex}&sortBy=${sortBy}&order=${sortDirection}`)
            const data = await response.json();
            if (response.ok) {
                setUsers((prev) => [...prev,...data.users])
                if (data.users.length < 10) setShowMore(false)
            }
        } catch (error) {
         console.log(error)   
        }
    }


  return (
    <div
        className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
    >
        {users.length > 0?(
            <>
                <Table striped hoverable className="shadow-md">
                    <Table.Head>
                        <Table.HeadCell  
                            onClick={()=>{
                                setSortBy('updatedAt')
                                setSortDirection(sortDirection === 'asc'? 'desc' : 'asc')}}
                            className="cursor-pointer"
                        >
                            Updated
                        </Table.HeadCell>
                        <Table.HeadCell>Imagen</Table.HeadCell>
                        <Table.HeadCell 
                            onClick={()=>{
                                setSortBy('email')
                                setSortDirection(sortDirection === 'asc'? 'desc' : 'asc')}}
                            className="cursor-pointer"
                        >
                            Email
                        </Table.HeadCell>
                        <Table.HeadCell 
                            className="cursor-pointer" 
                            onClick={()=>{
                                setSortBy('role')
                                setSortDirection(sortDirection === 'asc'? 'desc' : 'asc')
                                }}
                        >
                            Role
                        </Table.HeadCell>
                        {
                            currentUser.isAdmin &&(
                                <>
                                    <Table.HeadCell
                                        onClick={()=>{
                                            setSortBy('_id')
                                            setSortDirection(sortDirection === 'asc'? 'desc' : 'asc')}}
                                        className="cursor-pointer"
                                    >
                                        User Id
                                    </Table.HeadCell>
                                    <Table.HeadCell>Edit</Table.HeadCell>
                                    <Table.HeadCell>Delete</Table.HeadCell>
                                </>
                            )
                        }
                    </Table.Head>
                    {users.map((user,index)=>(
                        <Table.Body key={index}>
                            <Table.Cell>{new Date(user.updatedAt).toLocaleDateString()}</Table.Cell>
                            <Table.Cell>
                                <img 
                                    src={user.avatar === ""? userIcon : user.avatar}  
                                    alt="user avatar"
                                    className="h-20 w-20 object-cover bg-gray-500 rounded-full" 
                                    />
                            </Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>{user.role}</Table.Cell>
                            {
                                currentUser.isAdmin &&(
                                    <>
                                        <Table.Cell>
                                            {user._id}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <span
                                                 className="cursor-pointer text-teal-500"
                                                 onClick={()=>window.location.href=`/update-user/${user._id}`}
                                            >
                                                edit
                                            </span>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <span
                                                 className="cursor-pointer text-red-500"
                                                 onClick={()=>{
                                                     setUserIdToDelete(user._id)
                                                    setUserMailToDelete(user.email)
                                                     setShowModal(true)
                                                 }}
                                            >
                                                Delete
                                            </span>
                                        </Table.Cell>
                                    </>
                                )
                            }
                        </Table.Body>
                    ))}
                </Table>
                {
                    showMore &&(
                        <button
                            onClick={handleShowMore}
                            className="w-full text-teal-400 font-semibold self-center text-sm py-7"
                        >
                            Show More
                        </button>
                    )
                }
            </>
        ):(
            <p>There are no users to show</p>
        )}
        <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              {`Are you sure you want to delete ${userMailToDelete}?`}
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
