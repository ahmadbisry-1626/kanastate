import icons from "@/constants/icons"
import images from "@/constants/images"
import { priceFormatter } from "@/lib/utils"
import { PropertyProps } from "@/types"
import { Image, Text, TouchableOpacity, View } from "react-native"

export const FeaturedCard = ({ onPress, item }: { onPress?: () => void, item: PropertyProps }) => {
    return (
        <TouchableOpacity onPress={onPress} className="flex flex-col items-start w-60 h-80 relative">
            <Image source={{ uri: item.image }} className="size-full rounded-2xl" />
            <Image source={images.cardGradient} className="size-full rounded-2xl absolute bottom-0" />

            <View className="flex flex-row items-center justify-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5 gap-2">
                <Image source={icons.star} className="size-3.5" />
                <Text className="text-xs mt-0.5 font-rubik-bold text-primary-300">
                    {item.rating}
                </Text>
            </View>

            <View className="flex flex-col items-start absolute bottom-5 inset-x-5 gap-2">
                <Text className="text-xl font-rubik-extrabold text-white" numberOfLines={1}>
                    {item.name}
                </Text>
                <Text className="text-base font-rubik text-white" numberOfLines={1}>
                    {item.address}
                </Text>

                <View className="flex flex-row items-center justify-between w-full">
                    <Text className="text-xl font-rubik-extrabold text-white leading-[1.2]">
                        {priceFormatter(item.price)}
                    </Text>

                    <Image source={icons.heart} className="size-5" />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export const Card = ({ onPress, item }: { item: PropertyProps, onPress: () => void }) => {
    return (
        <TouchableOpacity className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow shadow-black-100/70 relative" onPress={onPress}>
            <View className="flex flex-row items-center absolute px-2 py-0.5 top-6 right-6 bg-white/90 rounded-full z-50 gap-1">
                <Image source={icons.star} className="size-3.5" />
                <Text className="text-xs mt-0.5 font-rubik-bold text-primary-300">
                    {item.rating}
                </Text>
            </View>

            <Image source={{ uri: item.image }} className="w-full h-44 rounded-lg" />

            <View className="flex flex-col mt-2 gap-1">
                <Text className="text-base font-rubik-bold text-black-300" >
                    {item.name}
                </Text>
                <Text className="text-sm font-rubik text-black-200" numberOfLines={1}>
                    {item.address}
                </Text>

                <View className="flex flex-row items-center justify-between mt-2">
                    <Text className="text-base font-rubik-bold leading-[1.2] text-primary-300">
                        {priceFormatter(item.price)}
                    </Text>

                    <Image source={icons.heart} className="size-5 mr-2" tintColor="#191331" />
                </View>
            </View>
        </TouchableOpacity>
    )
}
