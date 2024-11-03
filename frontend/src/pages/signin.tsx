import { Auth } from "../components/input"
import { Quote } from "../components/Quote"


export const Signin =()=>{
    return <div className="grid grid-cols-1 lg:grid-cols-2 ">
        <div>
           <Auth type="Signin" />
          
        </div>
            
        <div className="hidden lg:block">
            <Quote/>
        </div>
    </div>
  

    
}