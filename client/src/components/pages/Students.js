import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Axios from 'axios'

function Students() {

    const [studentList, setStudentList] = useState([])
    const {sectionID} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        Axios.get('http://localhost:3001/api/students', { params: {sectionID: sectionID}})
        .then((response) => {
            setStudentList(response.data)
        })
    })

    function studentAttend(event, source){
        Axios.get('http://localhost:3001/api/insert', { 
            params: {
                sectionID: sectionID,
                studentID: source
            }
        })
    }

    function studentReverse(event, source) {
        Axios.get('http://localhost:3001/api/delete', { 
            params: {
                sectionID: sectionID,
                studentID: source
            }
        })
    }

    function studentDetail(event, source) {
        navigate(`/Student/${source}`)
    }

    return (
        <div>
            <Link to='/Sections'>
                <img id='backBttn' src='/images/back.png' alt='back' />
            </Link>
            <div>
                {studentList.map((elm) => {
                    if (elm.action === 1) {
                        return (
                            <div 
                                className='absent' 
                                key={elm.key_id} 
                                onClick = {(event) => studentAttend(event, elm.student_id)}
                            >
                                <div>{elm.fname} {elm.lname}</div>
                                <div>
                                    <img 
                                        className='dtlBttn'
                                        src='/images/detail.png'
                                        alt='Details' 
                                        onClick = {(event) => studentDetail(event, elm.student_id)}
                                    />
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div 
                                className='attending' 
                                key={elm.key_id} 
                                onClick = {(event) => studentReverse(event, elm.student_id)}
                            >
                                <div>{elm.fname} {elm.lname}</div>
                                <div>
                                    <img 
                                        className='dtlBttn'
                                        src='/images/detail.png'
                                        alt='Details' 
                                        onClick = {(event) => studentDetail(event, elm.student_id)}
                                    />
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default Students