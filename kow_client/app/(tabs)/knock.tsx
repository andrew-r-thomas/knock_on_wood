import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

export default function Knock() {
  const knock = async () => {
    setWaiting(true);
    console.log("pressed knock");
    const resp = await fetch("http://192.168.50.68:8090/knock");
    const resp_data = await resp.json();
    console.log(resp_data.message);
    setWaiting(false);
  }

  const [waiting, setWaiting] = useState(false);

  return (
    <ThemedView style={styles.container}>
      <Pressable
        onPress={knock}
        style={{
          backgroundColor: "green",
          paddingHorizontal: 12,
          paddingVertical: 4,
          width: 200,
          height: 50,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center"
        }}
      >
        {
          waiting ?
            <FontAwesomeIcon
              // TODO: add animation
              style={{
                justifyContent: "center",
                alignContent: "center",
              }}
              icon={faSpinner}
              size={30}
              color="white"
            /> :
            <ThemedText
              style={{
                fontWeight: 800,
                fontSize: 30,
                alignContent: "center",
                justifyContent: "center",
                textAlign: "center"
              }}
            >
              Knock
            </ThemedText>
        }
      </Pressable>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    overflow: "hidden",
  }
});
