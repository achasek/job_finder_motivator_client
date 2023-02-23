export default function SignUpForm(props){
  const { pageData, formData, onChange } = props;

  return ( 
    <>
      {pageData?.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.question}</p>
            <label htmlFor={item.id}>{item.label}</label>
            { item.type === "button" ? <input></input> 
            :<input type={item.type} name={item.id} id={item.id} value={formData[item.id]} onChange={(e)=>{onChange(e, item.type)}}  />
            }
          </div>
        )
      })}
    </>
  );
};
