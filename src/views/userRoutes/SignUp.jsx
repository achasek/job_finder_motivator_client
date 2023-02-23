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
        {
            question: "Do you want the social dashboard?",
            id: "isSocialDash",
            label: "Social Dashboard",
            type: "checkbox",
        }
    ], 
    // [   //page 2 data
    //     {
    //         question: "Do you want the social dashboard?",
    //         id: "isSocialDash",
    //         label: "Social Dashboard",
    //         type: "checkbox",
    //     }
    // ],
]

export default function SignUp() {
    const [showSignUpFormP2, setShowSignUpFormP2] = useState(false);
    const [currPage, setCurrPage] = useState(0);
    const [formData, setFormData] = useState({
      display_name: '',
    });
    const { BACK_URI } = useContext(ConstContext);
    const { currUser, setCurrUser } = useContext(UserContext);
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    const handleNext = () => {
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

    const handleSubmit = async () => {
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
        debugger;
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
        });
    },[]);

    return (
        <>
            <form autoComplete="off" onSubmit={handleSubmit}>
                { formData && pageData ? <SignUpForm pageData={pageData[currPage]} formData={formData} onChange={handleChange} /> : null }
                
                <button type="button" onClick={(e)=>{handleNext(e)}} disabled={(currPage+1 < pageData.length)?false:true}>Next</button>           
                <button type="submit" onClick={(e)=>{handleSubmit(e)}} disabled={(currPage+1 < pageData.length)?true:false}>Create</button>
            </form>
        </>
    )
}