import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Star,
  Tag,
  Building2,
} from "lucide-react";



const menu = [

  {
    id:"dashboard",
    name:"Dashboard",
    icon:LayoutDashboard,
  },


  {
    id:"products",
    name:"Products",
    icon:Package,
  },


  {
    id:"orders",
    name:"Orders",
    icon:ShoppingBag,
  },


  {
    id:"customers",
    name:"Customers",
    icon:Users,
  },


  {
    id:"reviews",
    name:"Reviews",
    icon:Star,
  },


  {
    id:"coupons",
    name:"Coupons",
    icon:Tag,
  },


  {
    id:"brands",
    name:"Brands",
    icon:Building2,
  },

];





function Sidebar({
  activeSection,
  setActiveSection,
}) {



return (

<aside

className="
w-72
bg-black
text-white
min-h-screen
p-6
"

>


<h1

className="
text-2xl
font-bold
tracking-widest
mb-10
"

>

LUMIÈRE

</h1>





<nav

className="
space-y-2
"

>


{

menu.map((item)=>{


const Icon = item.icon;


return (

<button

key={item.id}


onClick={()=>
  setActiveSection(item.id)
}


className={`
w-full
flex
items-center
gap-4
px-4
py-3
text-sm
uppercase
tracking-wider
transition

${
activeSection === item.id

?

"bg-white text-black"

:

"hover:bg-white hover:text-black"

}

`}

>


<Icon size={18}/>


{item.name}


</button>


);


})

}



</nav>


</aside>


);


}


export default Sidebar;