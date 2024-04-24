import { useForm } from "react-hook-form";
import { json, useNavigate } from "react-router-dom";

function Feedback() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { handleSubmit, register } = useForm();
  const previousFeedback = JSON.parse(localStorage.getItem("feedback")) || [];
  console.log(previousFeedback);
  function handleFormSubmit(data) {
    if (data.feedback !== "") {
      localStorage.setItem(
        "feedback",
        JSON.stringify([...previousFeedback, data])
      );
      navigate(0);
      return;
    }
    alert("Please fill feedback form");
  }

  return (
    <div className="min-h-screen ">
      {userInfo.role === "USER" && (
        <div className="text-center">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-10">
            <input
              className="border h-10 w-80 p-3 mr-2"
              type="text"
              placeholder="Enter feedback about road conditions"
              {...register("feedback")}
            />

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white  p-2 rounded  h-10"
            >
              Submit
            </button>
          </form>
        </div>
      )}
      {userInfo.role === "TRAFFIC" && (
        <div className="flex justify-center mt-10">
          <div className="w-6/12 h-72">
            <h1>
              <b>Feedback about road given by user:</b>
            </h1>
            {previousFeedback.length <= 0 ? (
              <h3>No feedback found</h3>
            ) : (
              <ul>
                {previousFeedback.map((item, index) => (
                  <ol>
                    <li className="border p-2" key={index}>
                      {item.feedback}
                    </li>
                  </ol>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default Feedback;
