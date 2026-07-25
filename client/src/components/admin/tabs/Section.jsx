function Section({
  title,
  children,
  actions,
}) {
  return (
    <section className="admin-section">

      <div className="admin-section-header">

        <h2>
          {title}
        </h2>


        {actions && (
          <div className="admin-section-actions">
            {actions}
          </div>
        )}

      </div>


      <div className="admin-section-content">
        {children}
      </div>


    </section>
  );
}


export default Section;