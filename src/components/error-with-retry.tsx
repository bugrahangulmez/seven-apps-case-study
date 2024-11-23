import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React from "react";

interface ErrorWithRetryProps {
  message?: string;
}

const ErrorWithRetry = ({
  message = "Something went wrong!",
  ...props
}: ErrorWithRetryProps & TouchableOpacityProps) => {
  return (
    <View className="flex-1 justify-center align-middle items-center gap-4">
      <Text>{message}</Text>
      <TouchableOpacity {...props} className="bg-blue-500 p-3 rounded-md">
        <Text className="text-white font-semibold">{"Retry"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorWithRetry;

const styles = StyleSheet.create({});
