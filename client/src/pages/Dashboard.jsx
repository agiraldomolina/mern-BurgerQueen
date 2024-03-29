import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashProducts from "../components/DashProducts";
import DashUsers from "../components/DashUsers";
import DashOrders from "../components/DashOrders";

export default function Dashboard() {
    const location = useLocation();
    const [tab, setTab] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl) setTab(tabFromUrl)
    }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="md:w-56">
            <DashSidebar />
        </div>
        {/* right side content */}
        {tab === 'profile' && <DashProfile /> }
        {tab === 'products' && <DashProducts /> }
        {tab === 'users' && <DashUsers /> }
        {tab === 'orders' && <DashOrders /> }
    </div>
    
  )
}
