import { formateDate } from "@/lib/utils"
import { client } from "@/sanity/lib/client"
import { sanityFetch, SanityLive } from "@/sanity/lib/live"
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import markdownit from "markdown-it"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import Views from "@/components/Views"

export const experimental_ppr=true

const md=markdownit()

const Page = async({params}:{params:Promise<{id:string}>}) => {
    const id=(await params).id
    const param={id}
    const post=(await client.fetch(STARTUP_BY_ID_QUERY,param))
    if(!post) return notFound();

    const parsedContent=md.render(post.pitch || "")
  return (
    <>
     <section className="pink_container !min-h-[230px]">
      <p className="tag">{formateDate(post._createdAt)}</p>
      <h1 className="heading">{post.title}</h1>
      <p className="sub-heading !max-w-5xl">{post.description}</p>
     </section>

     <section className="section_container">
     <img
        src={post.image}
        alt="startup-img"
        className="w-full rounded-xl aspect-[4/3]"
      />

      <div className="space-y-5 mt-10 max-w-4xl mx-auto">
        <div className="flex-between gap-5">
          {/* author detail */}
          <Link href={`/user/${post.author?._id}`}
          className="flex gap-2 items-center mb-3"
          >
            <Image
            src={post.author?.image}
            alt="author-img"
            width={64}
            height={64}
            className="rounded-full drop-shadow-lg"
            />
            <div>
              <p className="text-20-medium">{post.author.name}</p>
              <p className="text-16-medium !text-black-300">@{post.author.username}</p>
            </div>
          </Link>
          {/* category detail */}
          <p className="category-tag">{post.category}</p>
        </div>
        {/* pitch section */}
        <h3 className="text-30-bold">Pitch Details</h3>

        {
          parsedContent?(
            <article
            className="prose max-w-4xl font-work-sans break-all"
            dangerouslySetInnerHTML={{__html:parsedContent}}
            />
          ):
          <p className="no-result">No details provided</p>
        }

      </div>
     </section>

     <hr className="divider"/>

     <Suspense fallback={<Skeleton className="view_skeleton>"/>}>
        <Views id={id}/>
     </Suspense>
   
    </>
  )
}
export default Page