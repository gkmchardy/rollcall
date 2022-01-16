import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'

function Sections() {

    const [sectionList, setSectionList] = useState([])
    const linkStyle = {
        color: '#ffb81c',
        textDecoration: 'none'
    }

    useEffect(() => {
        Axios.get('http://localhost:3001/api/sections')
        .then((response) => {
            setSectionList(response.data)
        })
    }) 

    return (
        
        <sections>
            {sectionList.map((elm) => {
                return (
                    <div key={elm.section_id}>
                        <section>
                            <Link style={linkStyle} to={`/Students/${elm.section_id}`} >
                                {elm.class_nbr} {elm.section_nbr}
                            </Link>
                        </section>
                    </div>
                )
            })}
        </sections>
    )
}

export default Sections