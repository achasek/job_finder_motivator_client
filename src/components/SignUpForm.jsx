import '../styles/components/SignUpForm.css'; 

export default function SignUpForm(props){
  const { pageData, formData, onChange, handleClick, isActive } = props;

  return ( 
    <>
      {pageData?.map((item) => {
        return (
          <div className="container">
            <div className="form" key={item.id}>
              {item.question ? <p>{item.question}</p> : null }
              { item.type === "button" ? <button className={isActive ? 'activeBtns': 'toggleBtns'} id={item.id} name={item.name} onClick={(e) => {handleClick(e)}}>{item.label}</button>
              :
              <>
                <label htmlFor={item.id}>{item.label}</label>
                <input placeholder="pumkineater69" type={item.type} name={item.id} id={item.id} value={formData[item.id]} onChange={(e)=>{onChange(e, item.type)}}  />
              </>
              }
            </div>
          </div>
        )
      })}
    </>
  );
};
