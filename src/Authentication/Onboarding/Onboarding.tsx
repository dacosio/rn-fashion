import { View, StyleSheet, Dimensions } from "react-native";
import React, { useRef } from "react";

import Animated, {
  useSharedValue,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withSpring,
  useAnimatedRef,
  scrollTo,
} from "react-native-reanimated";

import Slide, { SLIDER_HEIGHT } from "./Slide";
import SubSlide from "./SubSlide";

const { width } = Dimensions.get("window");
const BORDER_RADIUS = 75;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slider: {
    height: SLIDER_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  footerContent: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: BORDER_RADIUS,
    flexDirection: "row",
  },
  footer: {
    flex: 1,
  },
});

const slides = [
  {
    title: "Relaxed",
    subtitle: "Find Your Outfits",
    description:
      "Confused about your outfit? Don't worry! Find the best outfit here!",
    color: "#BFEAF5",
  },
  {
    title: "Playful",
    subtitle: "Hear it First, Wear it First",
    description:
      "Hatung the clothes in your wardrobe? Explore hundreds of outfit ideas",
    color: "#BEECC4",
  },
  {
    title: "Eccentric",
    subtitle: "Your Style, Your Way",
    description:
      "Create your individual & unique style and look amazing everyday",
    color: "#FFE4D9",
  },
  {
    title: "Funky",
    subtitle: "Look Good, Feel Good",
    description:
      "Discover the latest trends in fashioun and explore your personality",
    color: "#FFDDDD",
  },
];

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
        slides.map((_, i) => width * i),
        slides.map((slide) => slide.color)
      ),
    };
  });

  const subslideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withSpring(x.value * -1) }],
  }));

  const scroll = useRef<Animated.ScrollView>(null);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, animatedStyle]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={scrollHandler}>
          {slides.map((slide, index) => (
            <Slide key={index} title={slide.title} right={!!(index % 2)} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <Animated.View style={styles.footer}>
        <Animated.View style={[StyleSheet.absoluteFillObject, animatedStyle]} />
        <Animated.View
          style={[
            styles.footerContent,
            subslideStyle,
            {
              width: width * slides.length,
              flex: 1,
            },
          ]}>
          {slides.map(({ subtitle, description }, index) => (
            <SubSlide
              key={index}
              last={index === slides.length - 1}
              {...{ subtitle, description }}
              onPress={() => {
                if (scroll.current) {
                  scroll.current?.scrollTo({
                    x: width * (index + 1),
                    animated: true,
                  });
                }
              }}
            />
          ))}
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default Onboarding;
