const useCurrentPosition = () => {
  // 현재 위치 가져오는 함수
  const getCurrentPositionAsync = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve(pos); // 위치 수신 성공
        },
        (error) => {
          reject(error); // 위치 수신 실패
        }
      );
    });
  };

  // 위치를 받아서 좌표로 반환하는 함수
  const fetchLocation = async () => {
    try {
      const position = await getCurrentPositionAsync();
      const { latitude, longitude } = position.coords;
      return { coords: [latitude, longitude], error: null };
    } catch (error) {
      return {
        coords: null,
        error: "위치 정보를 가져오는 데 실패했습니다: " + error.message,
      };
    }
  };

  return { fetchLocation };
};

export default useCurrentPosition;
