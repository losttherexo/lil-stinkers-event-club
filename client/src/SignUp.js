import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import {useFormik} from "formik"
import * as yup from "yup"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function SignUp({ setUser }) {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [passwordConfirmation, setPasswordConfirmation] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [dob, setDob] = useState("");
  // const [fans, setFans] = useState([{}]);
    const navigate = useNavigate()

  // useEffect(() => {
  //   // console.log("FETCH! ");
  //   fetch("/fans")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setFans(data);
  //       console.log(data);
  //     });
  // }, []);

    const formSchema = yup.object().shape({
        email: yup
        .string()
        .email("Invalid email")
        .required('required'),
        password: yup
        .string()
        .required('required')
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol'),
        password_confirmation: yup
        .string()
        .required('required')
        .oneOf([yup.ref('password'), null], 'Must match "password" field value'),
        first_name: yup
        .string()
        .required('required'),
        last_name: yup
        .string()
        .required('required'),
        dob: yup
        .date()
        .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
        .required('required')
    })

    const formik = useFormik({
        initialValues: {
        email: "",
        password: "",
        password_confirmation: "",
        first_name: "",
        last_name: "",
        dob: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((r) => {
                if (r.ok) {
                    r.json().then((user) => setUser(user));
                }
            });
            navigate('/')
        },
    });

    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(!show)
    }
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   fetch("/signup", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       username,
  //       password,
  //       passwordConfirmation,
  //       first_name: firstName,
  //       last_name: lastName,
  //       dob: dob
  //     }),
  //   }).then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     }
  //   })
  //   navigate('/login')
  // }

    return (
        <div class='mt-28'>
            <form onSubmit={formik.handleSubmit} class="mx-auto mt-16 max-w-sm sm:mt-20">
                <div class="mx-auto max-w-2xl text-center justify-between gap-x-6 p-6 lg:px-8">
                    <h2 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">Sign Up</h2>
                </div>
                <label for="username">Email Address</label>
                <input
                type="text"
                name="email"
                id="email"
                autoComplete="off"
                value={formik.values.email}
                onChange={formik.handleChange}
                class="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                />
                <p style={{ color: "red" }}> {formik.errors.email}</p>
                <div class="relative w-full">
                    <label htmlFor="password">Password</label>
                    <div class="absolute inset-y-11 right-0 flex items-center px-2">
                        <input class="hidden js-password-toggle" id="toggle" type="checkbox" />
                        <span class="z-auto ">
                            {show ? <FontAwesomeIcon icon="fa-solid fa-eye" onClick={handleShow}/> :  <FontAwesomeIcon icon="fa-solid fa-eye-slash" onClick={handleShow}/>
                            }
                        </span>
                    </div>
                    <input
                        type={show ? "text" : "password"}
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        autoComplete="current-password"
                        class="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6 js-password"
                    />
                    <p style={{ color: "red" }}> {formik.errors.password}</p>
                </div>

                <label htmlFor="password">Password Confirmation</label>
                <input
                type="password"
                id="password_confirmation"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                // autoComplete="current-passwordConfirmation"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                />
                <p style={{ color: "red" }}> {formik.errors.password_confirmation}</p>

                <label for="first_name">First Name</label>
                <input
                type="text"
                name="first_name"
                id="first_name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                class="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                />
                <p style={{ color: "red" }}> {formik.errors.first_name}</p>

                <label for="last_name">Last Name</label>
                <input
                type="text"
                name="last_name"
                id="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                class="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                />
                <p style={{ color: "red" }}> {formik.errors.last_name}</p>

                <label for="dob">Date of Birth</label>
                <input
                type="date"
                id="dob"
                name="dob"
                placeholder={formik.values.dob}
                value={formik.values.dob}
                onChange={formik.handleChange}
                class="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-amber-400 sm:text-sm sm:leading-6"
                />
                <p style={{ color: "red" }}> {formik.errors.dob}</p>
                <div class="mt-10">
                    <button type="submit" class="block w-full rounded-md bg-slate-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
