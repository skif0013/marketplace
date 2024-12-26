import { Link } from 'react-router-dom'
import SearchForm from '../search/searchForm'
import { HeaderNavigation } from '../CheckAuth/CheckAuth'
import './Header.css'

export default function Header() {

   return (
      <>
         <header className="flex justify-between items-center bg-black p-6">
            <div className="logo">
               <h1 className="font-bold"><Link to='/'>Shopilyze</Link></h1>
            </div>
            <div className="header-tools flex items-center justify-between space-x-6">
               <div className="flex items-center gap-3">
                  <SearchForm />
                  <select name="lang" className="select-lang">
                     <option value="RU">RU</option>
                     <option value="UA">UA</option>
                  </select>
               </div>
               <HeaderNavigation />
            </div>
         </header>
      </>

   )
}
