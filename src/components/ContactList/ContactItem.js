import React from 'react';
import PropTypes from 'prop-types';

const ContactItem = ({ contact, deleteContact }) => {
  const { name, number } = contact;
  return (
    <>
      &#9742; {name} : {number}
      <button type="button" onClick={deleteContact}>
        &#10008;
      </button>
    </>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.exact({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactItem;
