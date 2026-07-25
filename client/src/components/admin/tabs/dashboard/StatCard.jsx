import PropTypes from "prop-types";


function StatCard({
  title,
  value,
  change,
  icon,
  trend = "up",
  subtitle,
}) {

  return (
    <div className="stat-card">

      <div className="stat-card-top">

        <div className="stat-icon">
          {icon}
        </div>


        <span
          className={
            trend === "up"
              ? "stat-positive"
              : "stat-negative"
          }
        >
          {change}
        </span>

      </div>


      <div className="stat-content">

        <p>{title}</p>

        <h2>{value}</h2>

        <small>
          {subtitle}
        </small>

      </div>


    </div>
  );
}


StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  change: PropTypes.string,
  icon: PropTypes.node,
  trend: PropTypes.string,
  subtitle: PropTypes.string,
};


export default StatCard;