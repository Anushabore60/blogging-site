import { Auth } from "../components/input"
import { Quote } from "../components/Quote"


export const Signup =()=>{
    return <div className="grid grid-cols-1 lg:grid-cols-2 ">
        <div>
           <Auth type="Signup" />
          
        </div>
            
        <div className="hidden lg:block">
            <Quote/>
        </div>
    </div>
  

    
}