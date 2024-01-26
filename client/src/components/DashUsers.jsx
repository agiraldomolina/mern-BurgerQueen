import { Table } from "flowbite-react"
import { useState,useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


export default function DashUsers() {
    const {currentUser} = useSelector(state => state.user)
    const [users, setUsers] = useState([])
    const [showMore, setShowMore] = useState(false)

    console.log(users)

    useEffect(() => {
        const fetchUsers = async () => {
            try { 
                const response = await fetch('/api/user/get')
                const data = await response.json();
                if (response.ok) {
                    setUsers(data.users)
                    if (data.users.length > 10) setShowMore(true)
                }
            return data
            } catch (error) {
               setUsers([]) 
            }
        }
        fetchUsers()
    }, [currentUser])


  return (
    <div
        className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
    >
        {users.length > 0?(
            <>
                <Table hoverable className="shadow-md">
                    <Table.Head>
                        <Table.HeadCell>Created At</Table.HeadCell>
                        <Table.HeadCell>Imagen</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Role</Table.HeadCell>
                        {
                            currentUser.isAdmin &&(
                                <>
                                    <Table.HeadCell>User Id</Table.HeadCell>
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
                                    src={user.avatar}
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
                                            Edit
                                        </Table.Cell>
                                        <Table.Cell>
                                            Delete
                                        </Table.Cell>
                                    </>
                                )
                            }
                        </Table.Body>
                    ))}
                </Table>
            </>
        ):(
            <p>There are no users to show</p>
        )}

    </div>
  )
}
