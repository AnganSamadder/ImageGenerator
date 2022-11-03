import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableHighlight,
  Button,
  Alert,
} from "react-native";

export default function App() {
  interface picture {
    url: string;
    width: number;
    height: number;
  }

  const [image, setImage] = useState<picture>({
    url: "https://picsum.photos/200/300",
    width: 200,
    height: 300,
  });

  const asyncWidthPrompt = async () =>
    new Promise<number>((resolve) => {
      Alert.alert(
        "Width",
        "Current Width: " + image.width,
        [
          { text: "200", onPress: () => resolve(200) },
          { text: "300", onPress: () => resolve(300) },
          { text: "400", onPress: () => resolve(400) },
        ],
        { cancelable: false }
      );
    });

  const asyncHeightPrompt = async (): Promise<number> =>
    new Promise<number>((resolve) => {
      Alert.alert(
        "Height",
        "Current Height: " + image.height,
        [
          { text: "200", onPress: () => resolve(200) },
          { text: "300", onPress: () => resolve(300) },
          { text: "400", onPress: () => resolve(400) },
        ],
        { cancelable: false }
      );
    });

  const handleDimensions = async () => {
    const newWidth: number = await asyncWidthPrompt();
    const newHeight: number = await asyncHeightPrompt();
    const sameDimensions: boolean =
      newWidth === image.width && newHeight === image.height;
    if (sameDimensions) {
      await handleRefresh();
    } else {
      setImage({
        url: `https://picsum.photos/${newWidth}/${newHeight}`,
        width: newWidth,
        height: newHeight,
      });
    }
  };

  const handleRefresh = async () => {
    const response = await fetch(
      `https://picsum.photos/${image.width}/${image.height}`
    );

    setImage({
      ...image,
      url: response.url,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Random Picture Generator</Text>
      <TouchableHighlight onPress={handleRefresh}>
        <Image
          source={{
            width: image.width,
            height: image.height,
            uri: image.url,
          }}
        />
      </TouchableHighlight>
      <Button
        title="Change Dimensions"
        onPress={() =>
          Alert.alert("Would you like to change dimensions?", "", [
            {
              text: "Yes",
              onPress: handleDimensions,
            },
            { text: "No" },
          ])
        }
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
