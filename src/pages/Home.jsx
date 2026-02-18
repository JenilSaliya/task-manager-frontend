import LanguageCard from '../components/TechnologyCard'
import Navbar from '../components/Navbar'
import React from 'react'

const Home = () => {

    return (

        <div className='h-screen w-screen overflow-auto'>

            <Navbar />
            <div className='py-5 px-3'>

                <h1 className="border p-3 border-emerald-600 text-2xl font-semibold text-emerald-700">About Us</h1>
                <div className="bg-emerald-600 text-white p-4 mt-3 rounded-md shadow-md">

                    <p >
                        Our Employee Task Management System is built to streamline your team's workflow and maximize productivity.With our platform, you can:
                    </p>
                    <ul className="list-disc list-inside mt-2 ">

                        <li>Assign tasks to employees</li>
                        <li>Track the status of tasks — whether they are Accepted, Completed, or Overdue.</li>
                        <li>Set deadlines and monitor due dates to ensure timely delivery.</li>
                        <li>Get real-time updates and notifications on task progress.</li>
                        <li>Improve collaboration and accountability across teams.</li>

                    </ul>

                    Empower your workforce with an efficient, organized, and transparent task management solution.

                </div>

            </div>

            <div className="py-5 px-3">

                <h1 className="border p-3 border-emerald-600 text-2xl font-semibold text-emerald-700">About Project</h1>
                <div className="bg-emerald-600 text-white p-4 mt-3 rounded-md shadow-md">

                    <p>
                        This Employee Task Management System is built using the latest technologies to ensure high performance and scalability.    The project stack includes:
                    </p>

                    <ul className="list-disc list-inside mt-2">

                        <li>React.js (v19.0.0) powered by Vite for a blazing-fast frontend experience.</li>
                        <li>Node.js (v22.15.0) and Express.js (v4.21.2) for building a robust backend server.</li>
                        <li>TailwindCSS (v4.1) for modern, responsive UI design.</li>
                        <li>MongoDB for flexible and scalable database management.</li>

                    </ul>

                    Every technology used is aimed at delivering the best user experience and performance.

                </div>

            </div>

            <div className="py-5 px-3">

                <h1 className="border p-3 border-emerald-600 text-2xl font-semibold text-emerald-700">Technologies Used</h1>
                <div className="py-8 px-5">

                    <div className="flex flex-wrap justify-around">

                        <LanguageCard
                            logo="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                            title="React.js"
                            version="19.0.0"
                        />

                        <LanguageCard
                            logo="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"
                            title="Node.js"
                            version="22.15.0"
                        />

                        <LanguageCard
                            logo="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png"
                            title="Express.js"
                            version="4.21.2"
                        />

                        <LanguageCard
                            logo="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
                            title="TailwindCSS"
                            version="4.1"
                        />

                        <LanguageCard
                            logo="https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png"
                            title="MongoDB"
                            version="Latest"
                        />

                        <LanguageCard
                            logo="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAb1BMVEX////99/f57+/+/Pzlysq3c3PSpaWdNjaHAACBAADVq6uvYGCMAACPAAC1bW16AACwZGShQECZLCyQEBB+AADCh4eAAACSGRmWJibz5eXHkpLZsrLevr6jSUmoUVHKmJju3t768/O8fX2aNTXn0dGi5lwOAAAAsklEQVR4AeXOURqCIBBF4UFUZ1QVFUkw0qz9r7HAUL+WUPeFA/8LEMYiFpJHUcg4SYGnGRJmub8XJVFVb542grUNdllPsgYYlLpkI6pKe5RCkHknm5CuqbQxB9A3ZT1SiTH4zTSWgvuMerV4JAPbdIlj+Estc4+4wLZ7Ryt8ZqRxqEYI+KAp9CxXh9IeiM8DE4/FCZdvFP+BTbFjd8LG4dQO4YEJq0PnrXEHh3383PBLewEQBBA5C4H39wAAAABJRU5ErkJggg=="
                            title="Mongoose"
                            version="Latest"
                        />

                    </div>

                </div>

            </div>

        </div>

    )

}

export default Home
