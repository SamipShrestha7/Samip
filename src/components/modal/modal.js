import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import deleteImg from "../../assets/delete.png";
import Select from "react-select";

export default function Modal({ setShowModal, showModal }) {
  const [conditionSelect, setConditionSelect] = useState();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const previousRoadInfo = JSON.parse(localStorage.getItem("roadInfo")) || [];
  const { register, handleSubmit, setValue } = useForm();

  const previousIndividualRoadInfo = previousRoadInfo.filter(
    (item) => userInfo.userName === item.userName
  );

  function onModalSubmit(data) {
    if (data?.roadCondition && conditionSelect) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let req = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          roadCondition: data.roadCondition,
          userName: userInfo.userName,
          conditionSelect: conditionSelect,
        };
        let roadInfo = [req, ...previousRoadInfo];
        localStorage.setItem("roadInfo", JSON.stringify(roadInfo));
        setShowModal(false);
        window.location.reload(true);
      });
    } else {
      alert("All feild must be filled");
    }
  }

  function handleRoleChange(value) {
    setConditionSelect(value.value);
  }

  function handleDelete(key) {
    let updated = previousRoadInfo.filter((item) => item.roadCondition !== key);
    localStorage.setItem("roadInfo", JSON.stringify(updated));
    window.location.reload(true);
  }

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Road Condition</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <form onSubmit={handleSubmit(onModalSubmit)}>
                  <div className="relative p-6 flex-auto">
                    <label className="block text-sm font-semibold text-gray-800">
                      About Road Condition on your location
                    </label>
                    <input
                      {...register("roadCondition")}
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 undefined"
                    >
                      Condition
                    </label>
                    <div className="flex flex-col items-start">
                      <Select
                        options={[
                          { value: "HEAVY_TRAFFIC", label: "Heavytraffic" },
                          { value: "LESS_TRAFFIC", label: "Lesstraffic" },
                          { value: "CLEAR_ROAD", label: "Clearroad" },
                          { value: "BLOCKED_ROAD", label: "Blockedroad" },
                        ]}
                        className="block w-full  mt-2 text-purple-700 focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        name="conditionSelect"
                        onChange={handleRoleChange}
                      />
                    </div>
                  </div>
                  {previousIndividualRoadInfo?.map((item, index) => (
                    <div
                      key={index}
                      className="relative px-6 flex justify-between pb-2"
                    >
                      <div>
                        <label className="block text-sm font-semibold text-gray-800">
                          {item?.roadCondition}
                        </label>
                      </div>
                      <img
                        width="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(item?.roadCondition)}
                        src={deleteImg}
                        alt=""
                      />
                    </div>
                  ))}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
