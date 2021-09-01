import React from 'react'
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { getLoggedUser } from "../../../../graphql-client/query"
function Profile() {
    const { id } = useParams()
    const { loading, error, data } = useQuery(getLoggedUser)
    console.log(id)
    return (
        <div className="col-12">
            <div className="col-7 pl-5 pt-5">
                <ul className="p-0">
                    <li>Username: {data?.getLoggedUser.username}</li>
                    <li>Gender: {data?.getLoggedUser.gender}</li>
                    <li>Birthday: {data?.getLoggedUser.birthday}</li>
                    <li>Phone: {data?.getLoggedUser.phone}</li>
                    <li>Address: {data?.getLoggedUser.address}</li>
                </ul>
                <h5>Biography</h5>
                <p>{data?.getLoggedUser.biography}</p>
            </div>
        </div>
    )
}

export default Profile
