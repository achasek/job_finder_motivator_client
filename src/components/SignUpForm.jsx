import { useState } from 'react';
import SignUpFormP2 from './SignUpFormP2';

export default function SignUpForm(){
    const [showSignUpFormP2, setShowSignUpFormP2] = useState(false)
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirm: '',
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
  
    const handleSubmit = async (evt) => {
        console.log('handlesubmit')
    //   console.log(formData, "THIS IS THE STATE")
    //   evt.preventDefault();
    //   try {
    //     const {name, email, password, userType, photoUrl, address, state, zipCode, city, phoneNumber, businessName, businessType} = formData;
    //     const data = {name, email, password, userType, photoUrl, address, state, zipCode, city, phoneNumber, businessName, businessType} ;
    //     const user = await signUp(data);
    //     setUser(user)
    //   } catch {
    //     setFormData({ ...formData, error: 'Sign Up Failed - Try Again' });
    //   }
    };
  
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
                        <label>Q 1</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
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
                  <SignUpFormP2 formData={formData} setFormData={setFormData}/>
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