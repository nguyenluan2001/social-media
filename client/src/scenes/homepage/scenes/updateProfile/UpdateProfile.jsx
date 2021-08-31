import React, { useEffect, useRef } from 'react'
import { useFormik } from "formik"
import { storage } from '../../../../services/firebase'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useQuery, useMutation } from "@apollo/client"
import { getUser } from '../../../../graphql-client/query'
import { updateProfile } from "../../../../graphql-client/mutation"
const stylePreviewAvatar = {
    width: "300px",
    height: "300px",
    backgroundPosition: "center",
    backgroundSize: "cover"
}
function UpdateProfile() {
    const avatarRef = useRef()
    const { loading, error, data } = useQuery(getUser)
    const [updateProfileMutation, dataMutation] = useMutation(updateProfile)
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            gender: "",
            birthday: "",
            biography: "",
            phone: "",
            address: "",
            avatar: "",
            avatarFile: null
        },
        onSubmit: async (values) => {
            let userInfo = { ...values }
            if (formik.values.avatarFile) {
                let imageName = "image-" + Math.random().toString(36).substr(2, 5) + ".jpg";
                const storageRef = ref(storage, imageName)
                uploadBytes(storageRef, values.avatarFile).then((snapshot) => {
                    getDownloadURL(ref(storageRef)).then(url => {
                        userInfo.avatar = url
                        updateProfileMutation({
                            variables: {
                                username: userInfo.username,
                                email: userInfo.email,
                                gender: userInfo.gender,
                                birthday: userInfo.birthday,
                                phone: userInfo.phone,
                                address: userInfo.address,
                                biography: userInfo.biography,
                                avatar: userInfo.avatar,
                            },
                            refetchQueries: [{ query: getUser }]
                        })
                    })
                });
            }
            else {
                updateProfileMutation({
                    variables: {
                        username: userInfo.username,
                        email: userInfo.email,
                        gender: userInfo.gender,
                        birthday: userInfo.birthday,
                        phone: userInfo.phone,
                        address: userInfo.address,
                        biography: userInfo.biography,
                        avatar: userInfo.avatar,
                    },
                    refetchQueries: [{ query: getUser }]
                })
            }

        }
    })


    useEffect(() => {
        if (!loading) {
            formik.setFieldValue("username", data?.getUser.username)
            formik.setFieldValue("email", data?.getUser.email)
            formik.setFieldValue("gender", data?.getUser.gender)
            formik.setFieldValue("birthday", data?.getUser.birthday)
            formik.setFieldValue("phone", data?.getUser.phone)
            formik.setFieldValue("address", data?.getUser.address)
            formik.setFieldValue("biography", data?.getUser.biography)
            formik.setFieldValue("avatar", data?.getUser.avatar)
            avatarRef.current.style.backgroundImage = `url(${data?.getUser.avatar})`
        }
    }, [loading])
    function handleAvatar(e) {
        console.log(e.target.files[0])
        let previewImg = URL.createObjectURL(e.target.files[0])
        avatarRef.current.style.backgroundImage = `url(${previewImg})`
        formik.setFieldValue("avatar", previewImg)
        formik.setFieldValue("avatarFile", e.target.files[0])
    }
    return (
        <div className="col-12 py-5">
            <h4>Update profile</h4>
            <form action="" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="">Username</label>
                    <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Emai</label>
                    <input type="text" name="email" value={formik.values.email} onChange={formik.handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Gender</label>
                    <select name="gender" className="custom-select" onChange={formik.handleChange}>
                        <option value="" hidden>Choose your gender</option>
                        <option value="male" selected={formik.values.gender == "male" ? "selected" : ""}>Male</option>
                        <option value="female" selected={formik.values.gender == "female" ? "selected" : ""}>Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="">Birthday</label>
                    <input type="text" name="birthday" value={formik.values.birthday} onChange={formik.handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Phone</label>
                    <input type="text" name="phone" value={formik.values.phone} onChange={formik.handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Address</label>
                    <input type="text" name="address" value={formik.values.address} onChange={formik.handleChange} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Biography</label>
                    <textarea name="biography" value={formik.values.biography} onChange={formik.handleChange} id="" cols="30" rows="10" className="form-control"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="">Avatar</label>
                    <div className="custom-file">
                        <label htmlFor="file" className="custom-file-label">Avatar</label>
                        <input onChange={(e) => handleAvatar(e)} type="file" id="file" className="custom-file-input" />
                    </div>
                    <div className="preview" style={stylePreviewAvatar} ref={avatarRef}>
                    </div>
                </div>
                <button className="btn btn-success btn-block mt-3">Update</button>
            </form>

        </div>
    )
}

export default UpdateProfile
