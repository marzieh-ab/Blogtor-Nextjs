import Sidebar from './../../components/dashbord-nav/Sidebar';
import BloglistCom from "../../components/mybloglist/MyBlogList"


const blogList = () => {

  
    return (
        <div  className="flex    flex-row-reverse">
        <Sidebar/>
        <BloglistCom/>
        </div>
    )
  }
  
  export default blogList;