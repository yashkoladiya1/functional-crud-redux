import React from "react";
import { Table } from "antd";
import { getUserDetails } from "../services/actions/actions";
import { connect } from "react-redux";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

const mapStateToProps = (state) => ({
  storeData: state.userItems.userData
});

const mapDispatchToProps = (dispatch) => ({
  // editDetailsHandler: (data) => dispatch(getEditDetails(data)),
  userDetailsHandler: (data) => dispatch(getUserDetails(data)),
});


function UserTable(props) {
  const navigate = useNavigate();


const handleEdit = (i) => {
    // props.navigate(`/edit/${i}`)
    navigate(`/edit/${i}`);
    // console.log(i)
  };

const handleDelete = (i) =>{
    console.log(i)
    let newData = props.storeData;
    newData.splice(i,1);
    console.log(newData)
    props.userDetailsHandler([...newData])
  }

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Middle Name",
      dataIndex: "middleName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (record, data, i) => {
        return (
          <>
            <Space>
              <Button
                type="primary"
                onClick={()=>handleEdit(i)}
                className="btn btn-success mx-2"
              >
                Edit
              </Button>
              <Button
                type="primary"
                danger
                onClick={()=>handleDelete(i)}
                className="btn btn-danger mx-2"
              >
                Delete
              </Button>
            </Space>
          </>
        );
      },
    },
  ];

  return (
    <div className="my-3">
      <Table dataSource={props.storeData} columns={columns} />;
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
