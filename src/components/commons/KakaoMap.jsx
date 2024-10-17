import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import RedPin from "../../assets/icons/write/ic-location-red.svg";
import BlackPin from "../../assets/icons/write/ic-location-black.svg";
import blackSpot from "../../assets/icons/workerMode/pickupPin_needed.png";
import greenSpot from "../../assets/icons/workerMode/pickupPin_added_green.png";
import blueSpot from "../../assets/icons/workerMode/pickupPin_added_blue.png";
import redSpot from "../../assets/icons/workerMode/pickupPin_view.png";
import redBuyo from "../../assets/icons/adminMode/redBuyo.png";
import orangeLife from "../../assets/icons/adminMode/orangeLife.png";
import greenTire from "../../assets/icons/adminMode/greenTire.png";
import purpleTree from "../../assets/icons/adminMode/purpleTree.png";
import blueFishing from "../../assets/icons/adminMode/blueFishing.png";
import { useEffect, useState } from "react";

const KakaoMap = ({
  myCoords,
  setDetail = null,
  nowView = null,
  searchedData = null,
  predictedData = null,
  neededSpots = null,
  addedSpots = null,
  lines = null,
  line = null,
  pickUpPlace = null,
}) => {
  const trashToPin = {
    부표류: redBuyo,
    생활쓰레기류: orangeLife,
    대형_투기쓰레기류: greenTire,
    초목류: purpleTree,
    폐어구류: blueFishing,
  };
  const [trashAmount, setTrashAmount] = useState([]);

  useEffect(() => {
    if (predictedData && predictedData.length > 0) {
      const trashAmounts = predictedData.map(
        (item) => item.expectedTrashAmount
      );
      setTrashAmount(trashAmounts);
    }
  }, [predictedData]);

  const minTrashAmount = Math.min(...trashAmount);
  const maxTrashAmount = Math.max(...trashAmount);

  function getTrashAmountCategory(amount) {
    const range = (maxTrashAmount - minTrashAmount) / 5; // 5개 구간으로 나누기

    if (amount <= minTrashAmount + range) return "low";
    if (amount <= minTrashAmount + 2 * range) return "mediumLow";
    if (amount <= minTrashAmount + 3 * range) return "medium";
    if (amount <= minTrashAmount + 4 * range) return "mediumHigh";
    return "high";
  }

  function getMarkerColor(category) {
    switch (category) {
      case "low":
        return blueFishing;
      case "mediumLow":
        return purpleTree;
      case "medium":
        return greenTire;
      case "mediumHigh":
        return orangeLife;
      case "high":
        return redBuyo;
    }
  }

  return (
    <Map
      center={{
        lat: myCoords.lat,
        lng: myCoords.lng,
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
      level={3} // 지도의 확대 레벨
    >
      {neededSpots &&
        neededSpots.map((spot) => {
          const markerImage = {
            size: { width: 35, height: 35 },
            src: spot.id === nowView ? redSpot : blackSpot,
          };
          return (
            <MapMarker
              key={spot.id + "." + Math.random()}
              position={{ lat: spot.latitude, lng: spot.longitude }}
              title={spot.pickUpPlace}
              image={markerImage}
              onClick={() => {
                setDetail(spot.id);
              }}
            />
          );
        })}
      {addedSpots &&
        addedSpots.map((spot) => {
          const markerImage = {
            size: { width: 35, height: 35 },
            src: spot.id === nowView ? redSpot : greenSpot,
          };
          return (
            <MapMarker
              key={spot.id}
              position={{ lat: spot.latitude, lng: spot.longitude }}
              title={spot.pickUpPlace}
              image={markerImage}
              onClick={() => {
                setDetail(spot.id);
              }}
            />
          );
        })}
      {searchedData &&
        searchedData.map((data) => {
          const markerImage = {
            size: { width: 35, height: 35 },
            src: trashToPin[data.mainTrashType],
          };
          return (
            <MapMarker
              key={data.id}
              position={{ lat: data.fixedLatitude, lng: data.fixedLongitude }}
              title={data.beachName}
              image={markerImage}
            />
          );
        })}
      {predictedData &&
        predictedData.map((item) => {
          const category = getTrashAmountCategory(item.expectedTrashAmount);
          const color = getMarkerColor(category);
          const markerImage = {
            size: { width: 35, height: 35 },
            src: color,
          };
          return (
            <MapMarker
              key={item.id}
              position={{ lat: item.fixedLatitude, lng: item.fixedLongitude }}
              title={`${item.beachName} - ${item.expectedTrashAmount}톤(t)`}
              image={markerImage}
            />
          );
        })}
      {lines &&
        lines.map((line, index) => {
          const start = line.start;
          const end = line.end;
          return (
            <Polyline
              key={index}
              path={[[start, end]]}
              strokeWeight={50}
              strokeColor={"red"}
              strokeOpacity={0.7}
              strokeStyle={"dash"}
            />
          );
        })}
      {line && (
        <Polyline
          path={[[line.start, line.end]]}
          strokeWeight={50}
          strokeColor={"red"}
          strokeOpacity={0.7}
          strokeStyle={"dash"}
        />
      )}
      {pickUpPlace && (
        <MapMarker
          position={{ lat: pickUpPlace.lat, lng: pickUpPlace.lng }}
          title="집하지"
          image={{
            size: { width: 35, height: 35 },
            src: RedPin,
          }}
        />
      )}
    </Map>
  );
};

export default KakaoMap;
