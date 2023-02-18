import axios from 'axios';
import { useState } from 'react';
import SignUpFormP2 from './SignUpFormP2';
import { useContext } from 'react';
import { UserContext } from '../App';
import { callExternalApi } from '../services/external-api.service';

export default function SignUpForm(){
    const [showSignUpFormP2, setShowSignUpFormP2] = useState(false)
    const [formData, setFormData] = useState({
      display_name: '',
    //   links: '',
        //  what are your goals: '',
        //  how rigourous of job search do desire: '',
    //   etc.
    //   userType: UserTypes.Hero,
      photoUrl: '',
      businessName: '',
      businessType: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNumber: '',
      error: ''
    });
    const BACK_URI = process.env.REACT_APP_API_SERVER_URL;
    const { currUser, setCurrUser } = useContext(UserContext)
  
    const handleChange = (evt) => {
      setFormData({
        ...formData,
        [evt.target.name]: evt.target.value,
        error: ''
      });
      console.log("this is the form data: ", formData)
    };
  
    const handleNext = () => {
      setShowSignUpFormP2(true)
    }
  
    const handleSubmit = async () => {
        const token = await getAccessTokenSilently();
        const config = {
            // change
            url: `${BACK_URI}/api/user/${currUser._id}/update`,
            // change to update method
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Authorization": `bearer ${token}`
            }
        }
        const { data, status, error } = await callExternalApi({config});
        console.log(data)
        if (data) {
            // point to dashboard
            if (status.code === 200) { // returning user loging in
                setCurrUser(data.user);
                navigate(`/`);
            // sign up route
            } else if (status.code === 201) { // new user loging in
                setCurrUser(data.user);
                navigate(`/`);  // TODO: do new user profile setup path here 
            } else { // should never hit
                console.error('ERROR: invalid login response')
            }  
        } else {
            console.error(`ERROR: problem with login: ${error.message}`)
        }
    }
  
    const disable = formData.password !== formData.confirm;

        return (
            <div>
              <div>
                <div>
                  <form autoComplete="off" onSubmit={handleSubmit}>
                        { showSignUpFormP2 === false ?
                  <div>
                    <div>
                      <div>
                        <label>User Name</label>
                        <input type="text" name="display_name" value={formData.display_name} onChange={handleChange} required />
                      </div>
                      <div>
                        <label>Q 2</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                      </div>
                      <div>
                        <label>Q 3</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                      </div>
                      <div>
                        <label>Q 4</label>
                        <input type="password" name="confirm" value={formData.confirm} onChange={handleChange} required />
                      </div>
                      {/* <div>
                        <label>Type</label>
                        <select type="userType" name="userType" onChange={handleChange} required>
                          <option>Select either Hungry or Hero</option>
                          <option value={UserTypes.Hungry}>Hungry</option>
                          <option value={UserTypes.Hero}>Hero</option>
                        </select>
                      </div> */}
                    </div>
                    <div>
                      {/* <PhotoUpload formData={formData} setFormData={setFormData}/> */}
                    </div>
                    <button onClick={handleNext} disabled={disable}>Next</button>
                  </div>
                  :
                  <SignUpFormP2 formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} handleChange={handleChange}/>
                // <SignUpFormP2 setUser={setUser} handleSubmit={handleSubmit} handleChange={handleChange} formData={formData} setFormData={setFormData}/>
                }
                  </form>
                </div>
              {/* <div><button onClick={() => setShowSignUp(true)}>Already Have an Account?</button></div> */}
            </div>
              <p>&nbsp;{formData.error}</p>
          </div>
          );
};