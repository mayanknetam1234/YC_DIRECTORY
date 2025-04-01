import { client } from "@/sanity/lib/client"
import Ping from "./Ping"
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries"
import { formateViews } from "@/lib/utils"
import { after } from "next/server"
import { writeClient } from "@/sanity/lib/write-client"

const Views = async({id}:{id:string}) => {
    let {views:totalViews}=(await client
        .withConfig({useCdn:false})
        .fetch(STARTUP_VIEWS_QUERY,{id}))
 
    totalViews++;
        after(
            async () =>{
                console.log("before",totalViews)
                await writeClient
                  .patch(id)
                  .set({ views: totalViews })
                  .commit()
                console.log("after",totalViews)
            }
          );
  return (
    <div className="view-container">
    <div className="absolute -top-2 -right-2">
      <Ping />
    </div>

    <p className="view-text">
      <span className="font-black">{formateViews(totalViews)}: {totalViews}</span>
    </p>
  </div>
  )
}
export default Views