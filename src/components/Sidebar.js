import React from 'react'
import '../CSS/Sidebar.css'
import { Link } from "react-router-dom";
const sidebar = () => {
  return (
    <div className='Sidebar'> 
    <div className='chart_details'>
    <h1>All Charts</h1>
    <Link to='/'><p>BarChart</p></Link>
    <Link to='/line'><p>LineChart</p></Link>
    <Link to='/Pie'><p>PieChart</p></Link>
    </div>
    </div>
  )
}

export default sidebar