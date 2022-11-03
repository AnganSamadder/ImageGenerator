import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Button,
  TouchableHighlight,
  Alert,
  Platform,
  StatusBar,
} from "react-native";
import { DimensionButton } from "./Components";

export default function App() {
  interface picture {
    uri: string;
    width: number;
    height: number;
  }

  const [image, setImage] = useState<picture>({
    uri: "https://picsum.photos/200/300",
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
        uri: `https://picsum.photos/${newWidth}/${newHeight}`,
        width: newWidth,
        height: newHeight,
      });
    }
  };

  const handleWidth = async (width: number) => {
    const response = await fetch(
      `https://picsum.photos/${width}/${image.height}`
    );

    setImage({
      uri: response.url,
      width: width,
      height: image.height,
    });
  };

  const handleHeight = async (height: number) => {
    const response = await fetch(
      `https://picsum.photos/${image.width}/${height}`
    );

    setImage({
      uri: response.url,
      width: image.width,
      height: height,
    });
  };

  const handleRefresh = async () => {
    const response = await fetch(
      `https://picsum.photos/${image.width}/${image.height}`
    );

    setImage({
      ...image,
      uri: response.url,
    });
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <Text>Random Picture Generator</Text>
      <View style={styles.imageContainer}>
        <TouchableHighlight onPress={handleRefresh}>
          <Image source={image} />
        </TouchableHighlight>
      </View>
      <View style={{ padding: 10 }}>
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
      </View>
      <View style={styles.buttonRow}>
        <DimensionButton
          onPress={() => handleWidth(100)}
          value={100}
          highlight={image.width}
        />
        <DimensionButton
          onPress={() => handleWidth(200)}
          value={200}
          highlight={image.width}
        />
        <DimensionButton
          onPress={() => handleWidth(300)}
          value={300}
          highlight={image.width}
        />
        <DimensionButton
          onPress={() => handleWidth(400)}
          value={400}
          highlight={image.width}
        />
      </View>
      <View style={styles.buttonRow}>
        <DimensionButton
          onPress={() => handleHeight(100)}
          value={100}
          highlight={image.height}
        />
        <DimensionButton
          onPress={() => handleHeight(200)}
          value={200}
          highlight={image.height}
        />
        <DimensionButton
          onPress={() => handleHeight(300)}
          value={300}
          highlight={image.height}
        />
        <DimensionButton
          onPress={() => handleHeight(400)}
          value={400}
          highlight={image.height}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 400,
    height: 400,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: "5%",
    justifyContent: "space-evenly",
  },
});
