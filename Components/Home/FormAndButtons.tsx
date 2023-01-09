import { Button, View, Text, TextInput } from "react-native";
import { useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export function Main() {
  const [int, setInt] = useState(0);
  const [lorem, setLorem] = useState("Lorem ipsum dolor sit amet");
  return (
    <View className="m-8 border-4 border-dotted border-gray-400">
      <Button
        title="Add 1 to int"
        onPress={async () => {
          setInt(int + 1);
          console.log("Here!");

          console.log("We here");
          const docRef = await addDoc(collection(db, "lorem"), {
            int: int,
            text: lorem,
          });
          console.log("Document written with ID: ", docRef.id);
        }}
      ></Button>
      <TextInput
        onChangeText={setLorem}
        value={lorem}
        className="bg-zinc-600 p-5 m-2 rounded-md"
      ></TextInput>
      <Text className="text-white m-10">{int}</Text>
    </View>
  );
}
