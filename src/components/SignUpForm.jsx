export default function SignUpForm(props){
  const { pageData, formData, onChange, handleClick } = props;

  return ( 
    <>
      {pageData?.map((item) => {
        return (
          <div key={item.id}>
            {item.question ? <p>{item.question}</p> : null }
            { item.type === "button" ? <button id={item.id} name={item.name} onClick={(e) => {handleClick(e)}}>{item.label}</button>
            : 
            <>
              <label htmlFor={item.id}>{item.label}</label>
              <input type={item.type} name={item.id} id={item.id} value={formData[item.id]} onChange={(e)=>{onChange(e, item.type)}}  />
            </>
            }
          </div>
        )
      })}
    </>
  );
};
