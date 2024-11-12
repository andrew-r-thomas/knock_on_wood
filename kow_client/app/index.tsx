import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import * as Haptics from "expo-haptics";

export default function Home() {
  const [waiting, setWaiting] = useState(false);

  const knock = async () => {
    setWaiting(true);
    const resp = await fetch("http://192.168.50.68:8090/knock");
    const resp_data = await resp.json();
    console.log(resp_data.message);
    setWaiting(false);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    await new Promise(r => setTimeout(r, 200));
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    await new Promise(r => setTimeout(r, 200));
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ThemedView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable
          disabled={waiting}
          onPress={knock}
          style={{
            backgroundColor: "green",
            width: "66%",
            padding: 18,
            borderRadius: 10,
            alignItems: "center"
          }}
        >
          {
            waiting ?
              // TODO: animate
              <FontAwesomeIcon
                icon={faSpinner}
                color="white"
                size={24}
              /> :
              <ThemedText
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "800",
                  fontSize: 24,
                }}
              >
                Knock
              </ThemedText>
          }
        </Pressable>
      </ThemedView>
    </SafeAreaView>
  )
}
