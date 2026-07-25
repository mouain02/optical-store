function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  textarea = false,
  required = false,
}) {
  return (
    <div className="admin-field">

      <label htmlFor={name}>
        {label}
      </label>


      {textarea ? (

        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows="4"
        />

      ) : (

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />

      )}

    </div>
  );
}


export default Field;