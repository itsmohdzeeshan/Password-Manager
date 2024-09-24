import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const ref = useRef()
    const passwordRef = useRef()

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setpasswordArray(passwords)
    }


    useEffect(() => {
        getPasswords()
    }, [])

    const showPassword = () => {
        if (ref.current.src.includes("eye.png")) {
            ref.current.src = "./eyeCross.png";
            passwordRef.current.type = "text"
        }
        else {
            ref.current.src = "./eye.png";
            passwordRef.current.type = "password"
        }
    }

    const copyText = (text) => {
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }



    const addPassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {


            // await fetch("http://localhost:3000/", { method: 'DELETE', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

            const newPassword = { ...form, id: uuidv4() };
            setpasswordArray([...passwordArray, newPassword]);
            await fetch("http://localhost:3000/", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPassword)
            });

            console.log([...passwordArray, form]);
            setform({ site: "", username: "", password: "" });

            toast('Password saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast('Error: Password not saved');
        }
    };



    const deletePassword = (id) => {
        console.log("deleting password with id: " + id)
        let con = confirm("Are you sure you want to delete ")
        if (con) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            let res = fetch("http://localhost:3000/", { method: 'DELETE', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

        }
        toast('Password deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const editPassword = (id) => {

        console.log("editing password with id: " + id)
        setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setpasswordArray(passwordArray.filter(i => i.id != id))

    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <ToastContainer />
            <div>
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
                </div>
            </div>

            <div className=" container  min-h-[81.64vh] max-w-4xl mx-auto">
                <div className="heading  py-8"><h1 className='text-center font-bold text-2xl'> <span className='text-green-600'>&lt;</span> Pass <span className='text-green-600'>OP</span> <span className='text-green-600'>&gt;</span></h1><p className='text-center'>Your Own Password Manager</p></div>

                <div className="input p-3 flex flex-col gap-7 ">

                    <input value={form.site} onChange={handleChange} type="text" placeholder='Enter website url' name='site' className='text-black border border-black rounded-full px-1 w-full justify-center 
                    mx-auto  ' />

                    <div className="flex flex-col md:flex-row justify-center gap-8">
                        <input value={form.username} onChange={handleChange} type="text" placeholder='Enter Username' name='username' className=' text-black border border-black rounded-full px-1 justify-center 
                        w-full' />

                        <div className='relative'>
                            <input ref={passwordRef} value={form.password} onChange={handleChange} type="password" placeholder='Enter Password' name='password' className=' text-black border border-black rounded-full px-1  justify-center w-full' />

                            <span className='absolute right-1 top-1'>
                                <img onClick={showPassword} ref={ref} className='cursor-pointer' width={21} src="./eye.png" alt="eye" />
                            </span>

                        </div>
                    </div>
                </div>


                <button onClick={addPassword} className='border rounded-full bg-green-500 hover:bg-green-400 p-2 my-6 flex justify-center items-center mx-auto px-4 gap-2 border-green-900 border-2'>
                    <lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover">
                    </lord-icon>
                    <span>Add Password</span>
                </button>

                <div className="passwords my-8">
                    <h2 className='text-2xl font-bold py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 &&
                        < table class="table-auto w-full text-center rounded-md overflow-hidden mb-10 ">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item) => {
                                    return <tr className='hover:bg-green-500 hover:cursor-pointer'>
                                        <td className='py-2 text-center border border-white w-12'>
                                            <div className='flex justify-center items-center gap-3'>
                                                {item.site}
                                                <div className='flex items-center justify-center' onClick={() => { copyText(item.site) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 text-center border border-white w-12'>
                                            <div className='flex justify-center items-center gap-3'>
                                                {item.username}
                                                <div className='flex items-center justify-center' onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div></td>
                                        <td className='py-2 text-center border border-white w-12'>
                                            <div className='flex justify-center items-center gap-3'>
                                            {/* {"*".repeat(item.password.length)} */}
                                            {item.password}
                                                <div className='flex items-center justify-center' onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2 text-center border border-white w-12'>

                                            <span className='mx-2 ' onClick={() => { editPassword(item.id) }}>

                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>

                                            <span className='mx-2 ' onClick={() => { deletePassword(item.id) }}>


                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>

                                        </td>
                                    </tr>
                                })}
                            </tbody>

                        </table>
                    }
                </div>

            </div >
        </>
    );
}

export default Manager;
