import { Signup } from "./pages/signup"
import { Signin } from "./pages/signin"
import { Blog } from "./pages/blog"
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import { Blogs } from "./pages/blogs";
function App() {
  
  return <div>
    <BrowserRouter>
    <Routes>
    <Route path="signup" element={<Signup/>}/>
    <Route path="/signin" element={<Signin />}/>
    <Route  path="/blog" element={<Blog/>}/>
    <Route path="/blogs" element={<Blogs/>}/>
    </Routes>

    </BrowserRouter>
  </div>

}


export default App
