import Overview from '@/components/dashboard/student/courses/overview'
import React from 'react'

const points :string[]= [
    "You will learn how to design beautiful websites using Figma, an interface design tool used by designers at Uber, Airbnb and Microsoft.",
    "You will learn secret tips of Freelance Web Designers and how they make great money freelancing online.",
    "Understand how to use both the Jupyter Notebook and create .py files",
    "You will learn how to take your designs and build them into powerful websites using Webflow, a state of the art site builder used by teams at Dell, NASA and more.",
    "Learn to use Python professionally, learning both Python 2 and Python 3!",
    "Get an understanding of how to create GUIs in the Jupyter Notebook system!"]
const description = "<h1>It gives you a huge self-satisfaction when you look at your work and say, 'I made this!'. I love that feeling after I'm done working on something. When I lean back in my chair, look at the final result with a smile, and have this little 'spark joy' moment. It's especially satisfying when I know I just made $5,000.</h1><h1>What you will learn in this course</h1><h1>What you will learn in this course</h1><br/><h1>What you will learn in this course</h1>"
export default function page() {
    return (
        <div className='bg-secondary-background h-lvh'>
            <Overview description={description} points={points}/>
            
        </div>
    )
}
