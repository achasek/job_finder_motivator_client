import SignUpForm from "../../components/SignUpForm";
import { useState, useContext, useEffect } from "react";
import { ConstContext, UserContext } from "../../App";
import { useAuth0 } from "@auth0/auth0-react";
import { callExternalApi } from "../../services/external-api.service";
import { useNavigate } from "react-router-dom";
// import "../styles/components/SignUpForm.css"

const pageData = [
    [   //page 1 data
        {
            question: "What would you like to be called?",
            id: "display_name",
            label: "Display Name",
            type: "text",
        },
        // {
        //     question: "Do you want the social dashboard?",
        //     id: "isSocialDash",
        //     label: "Social Dashboard",
        //     type: "checkbox",
        // }
    ], 
    [   //page 2 data
        {
            question: "Do you want the social dashboard?",
            id: "isSocialDash",
            label: "Social Dashboard",
            type: "checkbox",
        }
    ],
]

export default function SignUp() {
    const [currPage, setCurrPage] = useState(0);
    const [formData, setFormData] = useState({
      display_name: '',
      isSocialDash: false,
    });
    const { BACK_URI } = useContext(ConstContext);
    const { currUser, setCurrUser } = useContext(UserContext);
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    const handleNext = (evt) => {
        if(currPage + 1 < pageData.length)
            setCurrPage(currPage+1);
    };

    const handleChange = (evt, type) => {
        // debugger;
        const tmpData = {...formData};
        switch (type) {
            case "checkbox": 
                tmpData[evt.target.name] = evt.target.checked;
                break;
            case "text":
                tmpData[evt.target.name] = evt.target.value;
                break;
            default:
                console.info('INFO: onChange type not handled. SignUp.jsx');
        }
        setFormData(tmpData);
        console.log("this is the form data: ", formData)
    };

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
        console.log({config});
        const { data, status, error } = await callExternalApi({config});
        console.log({data}, {status}, {error});
        // debugger;
        if (data) {
            setCurrUser(data.user);
            navigate('/profile');
        }
        if (error) {
            console.error(error);
        }
    };

    useEffect(()=>{
        setFormData({
            display_name: currUser.display_name,
            isSocialDash: currUser.isSocialDash,
        });
    },[]);

    return (
        <>
            <form autoComplete="off" onSubmit={handleSubmit}>
                { pageData &&
                    <SignUpForm pageData={pageData[currPage]} formData={formData} onChange={handleChange} />
                }
                
                <button type="button" onClick={(e)=>{handleNext(e)}} disabled={(currPage+1 < pageData.length)?false:true}>Next</button>           
                <button type="submit" disabled={(currPage+1 < pageData.length)?true:false}>Create</button>
            </form>
        </>
    )
}