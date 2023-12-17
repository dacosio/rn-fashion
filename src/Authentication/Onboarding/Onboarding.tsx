import { View, StyleSheet, Dimensions } from "react-native";
import React, { useEffect } from "react";

import Animated, {
  useSharedValue,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from "react-native-reanimated";

import Slide, { SLIDER_HEIGHT } from "./Slide";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slider: {
    height: SLIDER_HEIGHT,
    backgroundColor: "cyan",
    borderBottomRightRadius: 75,
  },
  footer: {
    flex: 1,
  },
});

const Onboarding = () => {
  const x = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        x.value,
        [0, width, width * 2, width * 3],
        ["#BFEAF5", "#BEECC4", "#FFE4D9", "#FFDDDD"]
      ),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, animatedStyle]}>
        <Animated.ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          style={animatedStyle}>
          <Slide label="Relaxed" />
          <Slide label="Playful" right />
          <Slide label="Eccentric" />
          <Slide label="Funky" right />
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View style={[StyleSheet.absoluteFillObject, animatedStyle]} />
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            borderTopLeftRadius: 75,
          }}></View>
      </View>
    </View>
  );
};

export default Onboarding;
