import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text className="text-4xl font-rubik-semibold my-4">
                Aduh mamae
            </Text>
        </View>
    );
}
