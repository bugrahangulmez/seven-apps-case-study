import React from "react";
import { View, ActivityIndicator, Text } from "react-native";

const Loading = () => {
  return (
    <View className="justify-center items-center h-10">
      <ActivityIndicator size="small" color="#0000ff" />
    </View>
  );
};

export default Loading;
