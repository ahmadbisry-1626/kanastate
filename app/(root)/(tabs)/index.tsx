import { Card, FeaturedCard } from "@/components/Cards";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    return (
        <SafeAreaView className="bg-white h-full">
            <View className="px-5">
                <View className="flex flex-row items-center justify-between mt-5">
                    <View className="flex flex-row gap-2">
                        <Image source={images.avatar} className="size-12 rounded-full" />
                        <View className="flex flex-col items-start ml-2 justify-center">
                            <Text className="text-sm font-rubik text-black-100">Good Morning</Text>
                            <Text className="text-base font-rubik-medium text-black-300">Azril</Text>
                        </View>
                    </View>

                    <Image source={icons.bell} className="size-7" />
                </View>

                <Search />
                <View className="my-5">
                    <View className="flex flex-row items-center justify-between">
                        <Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
                        <TouchableOpacity className="">
                            <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <FeaturedCard />
            <Card />
        </SafeAreaView>
    );
}
