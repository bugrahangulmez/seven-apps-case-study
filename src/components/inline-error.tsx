import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface InlineErrorProps {
  message?: string;
}

const InlineError = ({
  message = "Something went wrong!",
}: InlineErrorProps) => {
  return <Text className="text-center text-red-500">{message}</Text>;
};

export default InlineError;

const styles = StyleSheet.create({});
