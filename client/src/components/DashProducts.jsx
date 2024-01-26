import { Table } from "flowbite-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function DashProducts() {
    const {currentUser} = useSelector(state => state.user)
    const [products, setProducts] = useState([])
    const [showMore, setShowMore] = useState(true)

    console.log(products)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/product/get');
                const data = await response.json();
                if (response.ok) {
                    setProducts(data.products);
                    if (data.products.length < 10) setShowMore(false)
                }
                return data;
            } catch (error) {
                setProducts([]);
            }
        }
        if (currentUser.isAdmin) fetchProducts(); 
    }, [currentUser.isAdmin])

    const handleShowMore = async() => {
        const startIndex= products.length
        try {
            const response = await fetch(`/api/product/get?startIndex=${startIndex}`)
            const data = await response.json();
            if(response.ok) {
                setProducts((prev)=> [...prev,...data.products])
                if (data.products.length < 10) setShowMore(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {currentUser.isAdmin && products.map.length > 0 ?(
            <>
                <Table
                    hoverable className="shadow-md"
                >
                    <Table.Head>
                        <Table.HeadCell>Date Updated</Table.HeadCell>
                        <Table.HeadCell>Image</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Type</Table.HeadCell>
                        <Table.HeadCell>Price</Table.HeadCell>
                        <Table.HeadCell>Edit</Table.HeadCell>
                        <Table.HeadCell>Delete</Table.HeadCell>
                    </Table.Head>
                    {products.map((product, index)=>(
                        <Table.Body key={index} className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>
                                    {new Date(product.dateEntry).toLocaleDateString()}
                                </Table.Cell>
                                <Table.Cell>
                                    <Link to={`/product/${product.slug}`}>
                                        <img 
                                            src={product.image}
                                            alt={product.name}
                                            className="h-10 w-20 object-cover bg-gray-500" 
                                        />
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link
                                        to={`/product/${product.slug}`}
                                        className="font-medium text-gray-900 dark:text-white"
                                    >
                                        {product.name}
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    {product.type}
                                </Table.Cell>
                                <Table.Cell>
                                    {product.price}
                                </Table.Cell>
                                <Table.Cell>
                                    <Link
                                        to={`/update-product/${product._id}`}
                                        className="text-teal-500 hover:underline"
                                    >
                                        <span>
                                            Edit
                                        </span>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <span
                                        className="text-red-500 hover:underline cursor-pointer"
                                    >
                                        Delete
                                    </span>
                                </Table.Cell>
                                
                            </Table.Row>
                        </Table.Body>
                    ))}
                </Table>
                {
                    showMore && (
                        <button
                            className="w-full text-teal-500 self-center text-sm py-7"
                            onClick={handleShowMore}
                        >
                            Show More Results
                        </button>
                    )
                }
            </>

        ):(
            <p>There are no products</p>
        )}
    </div>
  )
}
