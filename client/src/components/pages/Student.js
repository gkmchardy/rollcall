import React from 'react'
import { useParams } from 'react-router-dom'


function Student() {
    const {studentID} = useParams()

    return (
        <div>
            This is Student Detail for student {studentID}
        </div>
    )
}

export default Student