import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: {
    school,
    qualification,
    fieldofstudy,
    current,
    to,
    from,
    description,
  },
}) => {
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
        {!to ? " Now " : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Qualification: </strong>
        {qualification}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {fieldofstudy}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
