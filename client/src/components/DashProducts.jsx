import { Table } from "flowbite-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function DashProducts() {
    const {currentUser} = useSelector(state => state.user)
    const [products, setProducts] = useState([])

    console.log(products)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/product/get');
                const data = await response.json();
                if (response.ok) {
                    setProducts(data.products);
                }
                return data;
            } catch (error) {
                setProducts([]);
            }
        }
        if (currentUser.isAdmin) fetchProducts(); 
    }, [currentUser.isAdmin])

  return (
    <div>
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
                                    <img 
                                        src={product.image}
                                        alt={product.name}
                                        className="h-10 w-20 object-cover bg-gray-500" 
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    {product.name}
                                </Table.Cell>
                                <Table.Cell>
                                    {product.type}
                                </Table.Cell>
                                <Table.Cell>
                                    {product.price}
                                </Table.Cell>
                                
                            </Table.Row>
                        </Table.Body>
                    ))}
                </Table>
            </>

        ):(
            <p>There are no products</p>
        )}
    </div>
  )
}
