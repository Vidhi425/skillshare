import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
// import userApi from "../../services/menteeservices/instance"

const RequestForm = ({ onClose, onSubmit, userId }) => {
  const [formData, setFormData] = useState({
    topic: "",
    title: "",
    description: "",
    mode: "ONLINE",
    
  });
   const menteeId = useSelector((state)=>state.auth.user.userId)
  //  console.log(menteeId)

//    const reduxState = useSelector((state) => state);
// console.log("Redux State:", reduxState);
  const [loading, setloading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    console.log(menteeId)

    try {
      const data = {
        ...formData,
        mentorId:userId,
        userId:menteeId
      };
      console.log(data);
      const response = await axios.post("http://localhost:8080/user/create-appointment", data);
      console.log("Appointment Created", response.data);
      alert("Request Sent Successfully!");
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to send request.");
    } finally {
      setloading(false);
      onClose();
    }

    // onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md  text-black">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Send Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-black">Topic</label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
