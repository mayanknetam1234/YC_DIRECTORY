import { formateDate } from "@/lib/utils"
import { EyeIcon } from "lucide-react"
import Link from "next/link";
import { Button } from "./ui/button";

const StartupCard = ({post}:{post:StartupCardType}) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  }=post
  console.log(typeof _createdAt)
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formateDate(_createdAt)} </p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary"/>
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`} className="text-16-medium line-clamp-1">
          <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
          <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
        <img src={author?.image} alt={author?.name} 
        width={48}
        height={48}
        className="rounded-full"
        />
        </Link>
      </div>

      <Link href={`/startup/${_id}`} >
        <p className="startup-card_desc">{description}</p>
        {/* to-do : set next config so it allows img from different site 2:08:47 */}
        {/* to-do : explore <Image/> tag of nextjs */}
        <img src={image} alt="placeholder" className="startup-card_img" />
      </Link>

      <div className="flex-between mt-5 gap-3">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>
          Details
          </Link>
        </Button>
      </div>
        
    </li>
  )
}
export default StartupCard