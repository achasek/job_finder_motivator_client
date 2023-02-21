import { useContext } from 'react';
import { UserContext } from '../App';

export default function SignUpFormP2({ formData, setFormData, handleSubmit, handleChange }) {
    const { currUser } = useContext(UserContext)
    console.log(currUser)
    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
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
    </div>
    <div>
    </div>
    <button onClick={handleSubmit}>Create</button>
  </div>
  </form>
    )
}