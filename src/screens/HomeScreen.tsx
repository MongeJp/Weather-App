import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { Image, Button } from "react-native";

const Container = styled(SafeAreaView)`
  background-color: white;
  flex: 1;
  padding: 22px;
`;

const Address = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 0.1;
`;

const City = styled.Text`
  color: #363636;
  font-size: 20px;
  font-weight: bold;
  margin-right: 5px;
`;

const Country = styled.Text`
  color: #363636;
  font-size: 18px;
  font-weight: normal;
`;

const Weather = styled.View`
  background-color: #437aff;
  flex: 0.7;
  border-radius: 14px;
`;

const GeneralInfo = styled.View`
  justify-content: center;
  align-items: center;
  flex: 0.7;
`;

const WeatherType = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Date = styled.Text`
  font-size: 16px;
  color: #91b8ff;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Celsius = styled.Text`
  font-size: 100px;
  color: white;
  font-weight: 700;
`;

const ExtraInfo = styled.View`
  flex-direction: row;
  flex: 0.15;
  border-bottom-width: ${({ isTop }: { isTop: boolean }) =>
    isTop ? "1px" : "0px"};
  border-top-width: ${({ isTop }: { isTop: boolean }) =>
    isTop ? "1px" : "0px"};
  border-color: #9bc3ff;
`;

const InfoBox = styled.View`
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-color: #9bc3ff;
  flex: 1;
  border-right-width: ${({ isFirst }: { isFirst: boolean }) =>
    isFirst ? "1px" : "0px"};
`;

const Key = styled.Text`
  color: #99bffc;
  font-size: 14px;
  text-transform: uppercase;
`;

const Value = styled.Text`
  color: white;
  font-size: 14px;
`;

const Input = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  padding: 5px 10px;
  border-radius: 3px;
  margin-bottom: 10px;
`;

const HomeScreen = () => {
  const [input, setInput] = useState("");
  // weather data
  const [location, setLocation] = useState<object | null>(null);

  const getWeather = () => {
    const url = `https://api.weatherapi.com/v1/current.json?key==${input}&aqi=no`;
    axios.get(url).then(({ data }) => {
      setLocation(data);
    });
  };

  // icon image url
  const imageUrl = { uri: `https:${location?.current.condition.icon}` };

  return (
    <Container>
      <Input
        value={input}
        onChangeText={setInput}
        placeholder="Enter city name"
      />
      <Button title="Search" onPress={() => getWeather()} />
      {location ? (
        <>
          <Address>
            <City>{location?.location.name},</City>
            <Country>{location?.location.country}</Country>
          </Address>
          <Weather>
            <GeneralInfo>
              <Image source={imageUrl} resizeMode="contain" />
              <WeatherType>{location?.current.condition.text}</WeatherType>
              <Date>{location?.location.localtime}</Date>
              <Celsius>{location?.current.temp_c}°</Celsius>
            </GeneralInfo>
            <ExtraInfo isTop>
              <InfoBox isFirst>
                <Key>Wind</Key>
                <Value>{location?.current.wind_mph}mp/h</Value>
              </InfoBox>
              <InfoBox isFirst={false}>
                <Key>Feels Like</Key>
                <Value>{location?.current.feelslike_c}°</Value>
              </InfoBox>
            </ExtraInfo>
            <ExtraInfo isTop={false}>
              <InfoBox isFirst>
                <Key>Index UV</Key>
                <Value>{location?.current.uv}</Value>
              </InfoBox>
              <InfoBox isFirst={false}>
                <Key>Pressure</Key>
                <Value>{location?.current.pressure_mb} mbar</Value>
              </InfoBox>
            </ExtraInfo>
          </Weather>
        </>
      ) : null}
    </Container>
  );
};

export default HomeScreen;
