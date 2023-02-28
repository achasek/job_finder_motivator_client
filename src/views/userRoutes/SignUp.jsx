import SignUpForm from "../../components/SignUpForm";
import { useState, useContext, useEffect } from "react";
import { ConstContext, UserContext } from "../../App";
import { useAuth0 } from "@auth0/auth0-react";
import { callExternalApi } from "../../services/external-api.service";
import { useNavigate } from "react-router-dom";
import { GrTestDesktop } from "react-icons/gr";
import '../../styles/views/SignUp.css';

const pageData = [
    [   //page 1 data
        {
            className: 'placeHolder',
            question: "What would you like your display name to be?",
            id: "display_name",
            label: "",
            type: "text",
        },
    ], 
    [   //page 2 data
        {
            question: "Do you want the social dashboard?",
            id: "isSocialDash",
            label: "",
            type: "checkbox",
        }
    ], 
    [   //page 3 data
        {
            question: "What do you do?",
            name: "interests",
            id: 'uxBtn',
            label: 'ux guy',
            type: "button",
        },
        {
            question: null,
            name: 'interests',
            id: 'engineerBtn',
            label: 'engineer',
            type: 'button',
        }
    ], 
]

export default function SignUp() {

    const [showSignUpFormP2, setShowSignUpFormP2] = useState(false);
    const [currPage, setCurrPage] = useState(0);
    const [formData, setFormData] = useState({
      display_name: '',
      interests: '',
    });
    const [isActive, setIsActive] = useState(false);
    const { BACK_URI } = useContext(ConstContext);
    const { currUser, setCurrUser } = useContext(UserContext);
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    const handleClick = (e) => {
        setIsActive(!isActive);
        e.preventDefault();
        const tmpData = {...formData};
        console.log({tmpData},e, e.target.name, e.target.innerText)
        // conditional chaining
        const idx = tmpData?.interests?.indexOf(e.target.id);
        console.log({idx}, {interests: tmpData.interests});
        if(idx != -1) {    // found at idx
            tmpData[e.target.name].splice(idx,1);
        } else {    // not found
            tmpData[e.target.name].push(e.target.id);
        }
        console.log({tmpData});
        setFormData(tmpData)
    }

    const handleNext = (e) => {
        // e.preventDefault()
        if(currPage + 1 < pageData.length)
            setCurrPage(currPage+1);
    };

    const handleChange = (evt) => {
        // debugger;
        const tmpData = {...formData};
        if ("value" != '') {
            tmpData[evt.target.name] = evt.target.value;
        } else {
            tmpData[evt.target.name] = evt.target.checked;
        }
        setFormData(tmpData);
        console.log("this is the form data: ", formData)
    };

    // const handleClick = (e) => {
    //     // setFormData([e.target.name]: )
    // };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const token = await getAccessTokenSilently();
        const config = {
            url: `${BACK_URI}/api/user/update`,
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Authorization": `bearer ${token}`
            },
            data: formData
        }
        // debugger;
        console.log({config});
        const { data, status, error } = await callExternalApi({config});
        console.log({data}, {status}, {error});
        if (data) {
            setCurrUser(data.user);
            navigate('/');
        }
        if (error) {
            console.error(error);
        }
    };

    useEffect(()=>{
        setFormData({
            display_name: currUser.display_name,
            interests: [],
        });
    },[]);

    return (
        <>
            <form autoComplete="off" onSubmit={handleSubmit}>
                { formData && pageData ? <SignUpForm pageData={pageData[currPage]} formData={formData} onChange={handleChange} handleClick={handleClick} isActive={isActive} /> : null }
                
                <div className="formBtns">
                    <button className="nextBtn" type="button" onClick={(e)=>{handleNext(e)}} disabled={(currPage+1 < pageData.length)?false:true}>Next</button>
                    <button className="createBtn" type="submit" onClick={(e)=>{handleSubmit(e)}} disabled={(currPage+1 < pageData.length)?true:false}>Create</button>
                </div>
            </form>
        </>
    )
}