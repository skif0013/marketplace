import './SearchForm.css';

export default function SearchForm() {
   return (
      <form action="#" className="search">
         <input type="text" placeholder="Поиск" />
         <button type="submit" className='search-btn'><img src="/images/main/search.svg" alt="search.svg" /></button>
      </form>
   )
}