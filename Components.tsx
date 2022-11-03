import { Component } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

export class DimensionButton extends Component<{
  onPress: (event: GestureResponderEvent) => void;
  value: number;
  highlight: number;
}> {
  render() {
    let { onPress, value, highlight } = this.props;
    if (value === highlight) {
      return (
        <TouchableOpacity style={this.styles.highlight} onPress={onPress}>
          <Text style={this.styles.highlightText}>{value}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableHighlight style={this.styles.button} onPress={onPress}>
          <Text style={this.styles.text}>{value}</Text>
        </TouchableHighlight>
      );
    }
  }

  styles = StyleSheet.create({
    button: {
      elevation: 8,
      backgroundColor: "#ffffff",
      borderRadius: 10,
      borderColor: "#1894ff",
      borderWidth: 2,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    highlight: {
      elevation: 8,
      backgroundColor: "#1894ff",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    text: {
      fontSize: 18,
      color: "#000000",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase",
    },
    highlightText: {
      fontSize: 18,
      color: "#ffffff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase",
    },
  });
}
