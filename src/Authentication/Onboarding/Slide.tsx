import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";

interface SlideProps {
  label: string;
  right?: boolean;
}

const { width, height } = Dimensions.get("window");
export const SLIDER_HEIGHT = 0.61 * height;
const styles = StyleSheet.create({
  container: {
    width,
  },
  titeContiner: {
    height: 100,
    justifyContent: "center",
  },
  title: {
    fontSize: 80,
    lineHeight: 80,
    fontFamily: "bold",
    color: "white",
    textAlign: "center",
  },
});
const Slide = ({ label, right }: SlideProps) => {
  const transform = [
    {
      translateY: (SLIDER_HEIGHT - 100) / 2,
    },
    {
      translateX: right ? width / 2 - 50 : -width / 2 + 50,
    },
    {
      rotate: right ? " -90deg" : "90deg",
    },
  ];
  return (
    <View style={{ width }}>
      <View style={[styles.titeContiner, { transform }]}>
        <Text style={styles.title}>{label}</Text>
      </View>
    </View>
  );
};

export default Slide;
