import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

export default function Dashboard() {
    const locatioon = useLocation()
    const [tab, setTab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(locatioon.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl) setTab(tabFromUrl)
    }, [location.search])
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="md:w-56">
            <DashSidebar />
        </div>
        {/* Prifile */}
        <div>
            {tab === 'profile' && <DashProfile /> }
        </div>
    </div>
    
  )
}
