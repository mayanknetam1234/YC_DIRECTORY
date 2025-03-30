
import Form from "next/form"
import SearchBarReset from "./SearchBarReset"


const SearchBar = ({query}:{query?:string}) => {
    
  return (
    <Form action="/" scroll={false} className="search-form">
        <input
        name="query"
        defaultValue={query}
        placeholder="Search Startups"
        className="search-input"
         type="text" />
        
        <div className="flex gap-2">
            {query && <SearchBarReset/>}
            <button
            type="submit"
            className="search-btn text-2xl text-white cursor-pointer"
            >S</button>
        </div>


    </Form>
  )
}
export default SearchBar