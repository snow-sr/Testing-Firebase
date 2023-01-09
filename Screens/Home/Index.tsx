import { StatusBar } from "expo-status-bar";
import { Text, View, Button, TextInput, ScrollView } from "react-native";
import { Main } from "../../Components/Home/FormAndButtons";
import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export function Home() {
  const [items, setItems] = useState<any[]>([]);

  return (
    <>
      <SafeAreaView>
        <View className="h-full bg-zinc-800 flex justify-center items-center w-full">
          <View className="flex justify-center items-center border-2 border-dashed border-gray-400 w-full">
            <Text className="text-white mt-10">
              Simple CRD system, where we can create items, see and delete them
            </Text>
            <Main />
            <Button
              title="See already registered"
              onPress={async () => {
                const querySnapshot = await getDocs(collection(db, "lorem"));
                let allItems: any = [];
                querySnapshot.forEach((doc) => {
                  console.log(`${doc.id} => ${doc.exists()}`);
                  allItems.push({ data: doc.data(), id: doc.id });
                });
                setItems(allItems);
              }}
            ></Button>
          </View>
          <ScrollView className="border-2 border-dashed border-emerald-300 w-full">
            {items.length > 0 ? (
              items.map((item: any) => {
                return (
                  <View
                    className="bg-zinc-600 p-5 m-2 rounded-md mt-10"
                    key={item.id}
                  >
                    <Text className="text-white">{item.data.int}</Text>
                    <Text className="text-white mb-2">{item.data.text}</Text>
                    <Button
                      title="Delete"
                      onPress={() => {
                        console.log(item.id);
                        deleteDoc(doc(db, "lorem", item.id))
                          .then((res) => {
                            console.log("Deleted " + res);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    ></Button>
                  </View>
                );
              })
            ) : (
              <Text className="text-white mt-10">No items</Text>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
      <StatusBar style="dark" />
    </>
  );
}
