import SearchBar from "@/components/SearchBar";
import StartupCard from "@/components/StartupCard";
import Image from "next/image";


export default async function Home({searchParams}:{searchParams:Promise<{query?:string}>}) {
  const query = (await searchParams).query
  const posts=[{
    _createdAt:new Date(),
    author:{name:"mayank",_id:1,image:"https://avatars.githubusercontent.com/u/161747646?v=4"},
    views:5,
    _id:1,
    description:"this is a startup",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlTH0O23WPs5bvs2cLnMwJnwSbRAl2sTc5wg&s",
    category:"Robots",
    title:"We Robots"

  },
  {
    _createdAt:new Date(),
    author:{name:"mayank",_id:1},
    views:5,
    _id:2,
    description:"this is a startup",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlTH0O23WPs5bvs2cLnMwJnwSbRAl2sTc5wg&s",
    category:"Robots",
    title:"We Robots"

  }]
  return (
    <>
      <section className="pink_container">
          <h1 className="heading">Pitch Your Startup, <br />
          Connect With Entrepreneurs</h1>
          <p className="sub-heading !max-w-3xl">
              Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
              Competitions.
          </p>
          <SearchBar query={query}/>
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query? `Search for "${query}"`: "All startups"}
        </p>
        <ul className="mt-7 card_grid">
          {
           posts.length>0? posts.map((post:StartupCardType)=>(
              <StartupCard key={post?._id} post={post}/>
            )):
            <p className="no-results">No startup found</p>
          }
        </ul>
      </section>
    </>
  );
}
