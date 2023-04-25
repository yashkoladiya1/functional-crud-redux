import React, { useEffect } from "react";
import { useState } from "react";
import { getUserDetails } from "../services/actions/actions";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
const mapStateToProps = (state) => ({
  storeData: state.userItems.userData,
  editData: state.editData || {},
});

const mapDispatchToProps = (dispatch) => ({
  userDetailsHandler: (data) => dispatch(getUserDetails(data)),
});

function Home(props) {
  let { id } = useParams();
  // console.log("props--->",props)
  // const arr=[];
  const [index, setindex] = useState("");
  const [arr, setArr] = useState([]);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
  });

  useEffect(() => {
    if (id !== undefined) {
      const val = props?.storeData[id] || [];
      // console.log("val--->",val)
      setUserDetails({
        firstName: val.firstName,
        middleName: val.middleName,
        lastName: val.lastName,
      });
      setindex(id);
    }
    setArr(props.storeData)
    //eslint-disable-next-line
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let index = document.getElementById("inde").value;
    if (index === "" || index === undefined) {
      let newArr = arr;
      newArr.push(userDetails);
      setArr([...newArr]);
      props.userDetailsHandler(arr);
    }else{
      let newData = arr;
      let newArr = userDetails;
      newData.splice(index,1,newArr)
      setArr([...newData])
    }
    setUserDetails({
      firstName: "",
      middleName: "",
      lastName: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  return (
    <div className="container my-2" onSubmit={handleSubmit}>
      <form id="myForm">
        <input id="inde" type="hidden" value={index} />
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={userDetails.firstName}
            onChange={handleChange}
            className="form-control"
            id="firstName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Middle Name
          </label>
          <input
            type="text"
            name="middleName"
            value={userDetails.middleName}
            onChange={handleChange}
            className="form-control"
            id="middleName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={userDetails.lastName}
            onChange={handleChange}
            className="form-control"
            id="lastName"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
