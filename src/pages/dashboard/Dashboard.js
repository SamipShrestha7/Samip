import { Map, Marker } from "pigeon-maps";
import "react-tooltip/dist/react-tooltip.css";

export default function Dashboard() {
  const roadInfo = JSON.parse(localStorage.getItem("roadInfo")) || [];
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  function buildColor(condt) {
    switch (condt) {
      case "HEAVY_TRAFFIC":
        return "red";
      case "LESS_TRAFFIC":
        return "brown";
      case "CLEAR_ROAD":
        return " green";
      case "BLOCKED_ROAD":
        return "yellow";
      default:
        return;
    }
  }

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h3 className="p-3 font-bold stroke-zinc-100">
            Hello {userInfo?.userName}. Your Role is {userInfo?.role}.{" "}
            {userInfo?.role === "TRAFFIC" &&
              "You can Add Road status by clicking right corner button."}{" "}
            {userInfo?.role === "USER" && "You can view the road status."}{" "}
          </h3>
        </div>
        <div className="flex">
          <div className="flex m-3">
            <div
              style={{ backgroundColor: "red" }}
              className="w-5 h-5 mr-2  rounded"
            ></div>
            <p>Heavy traffic</p>
          </div>
          <div className="flex m-3">
            <div
              style={{ backgroundColor: "brown" }}
              className="w-5 h-5 mr-2  rounded"
            ></div>
            <p>Less traffic</p>
          </div>
          <div className="flex m-3">
            <div
              style={{ backgroundColor: "green" }}
              className="w-5 h-5 mr-2  rounded"
            ></div>
            <p>Clear road</p>
          </div>
          <div className="flex m-3">
            <div
              style={{ backgroundColor: "yellow" }}
              className="w-5 h-5 mr-2  rounded"
            ></div>
            <p>Blocked road</p>
          </div>
        </div>
      </div>
      <Map height={460} defaultCenter={[27.702469, 85.310251]} defaultZoom={11}>
        {roadInfo.map((item) => (
          <Marker width={50} anchor={[item.latitude, item.longitude]}>
            <div
              style={{
                height: "50px",
                width: "50px",
                backgroundColor: buildColor(item.conditionSelect),
                borderRadius: "50%",
                opacity: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "10px solid orange",
                cursor: "pointer",
              }}
            ></div>
          </Marker>
        ))}
      </Map>
    </>
  );
}
