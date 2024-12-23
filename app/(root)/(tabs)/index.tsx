import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/GlobalProvider";
import { useAppwrite } from "@/lib/useAppwrite";
import { PropertyProps } from "@/types";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    const { user } = useGlobalContext()
    const params = useLocalSearchParams<{ query: string, filter?: string }>()
    const [greeting, setGreeting] = useState('');
    const { query, filter } = params
    const [refresh, setRefresh] = useState(false)

    const { data: latestProp, loading: latestPropsLoading } = useAppwrite<PropertyProps[], any>({
        fn: getLatestProperties
    })

    const { data: properties, loading, refetch } = useAppwrite<PropertyProps[], any>({
        fn: getProperties,
        params: {
            filter: filter!,
            query: query,
            limit: 6
        },
        skip: true
    })

    const handleRefreshRecommend = async () => {
        setRefresh(true)
        await refetch({
            filter: filter!,
            query: query,
            limit: 6
        })
        setRefresh(false)
    }

    const handleCardPress = (id: string) => router.push(`/properties/${id}`)

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            setGreeting('Good Morning');
        } else if (currentHour < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }
    }, []);

    useEffect(() => {
        refetch({
            filter: filter!,
            query: query,
            limit: 6
        })
    }, [filter, query])

    return (
        <SafeAreaView className="bg-white h-full px-5">
            <FlatList
                data={properties}
                renderItem={({ item }) => {
                    return (
                        <Card onPress={() => handleCardPress(item.$id)} item={item} />
                    )
                }}
                keyExtractor={(item) => item.$id}
                numColumns={2}
                ListHeaderComponentClassName="-mb-2"
                contentContainerClassName="pb-32"
                columnWrapperClassName="flex gap-5"
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    loading ? (
                        <ActivityIndicator size={"large"} className="text-primary-300 mt-20" />
                    ) : (
                        <NoResults />
                    )
                }
                refreshControl={<RefreshControl refreshing={refresh} onRefresh={handleRefreshRecommend} />}
                ListHeaderComponent={
                    <>
                        <View className="flex flex-row items-center justify-between mt-5">
                            <View className="flex flex-row gap-2">
                                <Image source={{ uri: user?.avatar }} className="size-12 rounded-full" />
                                <View className="flex flex-col items-start ml-2 justify-center">
                                    <Text className="text-sm font-rubik text-black-100">{greeting}</Text>
                                    <Text className="text-base font-rubik-medium text-black-300">{user?.name}</Text>
                                </View>
                            </View>

                            <Image source={icons.bell} className="size-7" />
                        </View>

                        <Search />
                        <View className="my-5">
                            <View className="flex flex-row items-center justify-between my-5">
                                <Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
                                <TouchableOpacity className="">
                                    <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                                </TouchableOpacity>
                            </View>

                            {latestPropsLoading ? (
                                <ActivityIndicator size={"large"} className="text-primary-300" />
                            ) : !latestProp || latestProp.length === 0 && (
                                <NoResults />
                            )}

                            <FlatList
                                data={latestProp}
                                renderItem={({ item }) => {
                                    return (
                                        <FeaturedCard item={item} onPress={() => handleCardPress(item.$id)} />
                                    )
                                }}
                                keyExtractor={(item) => item.$id}
                                showsVerticalScrollIndicator={false}
                                horizontal
                                bounces={false}
                                contentContainerClassName="flex gap-5"
                            />
                        </View>

                        <View className="my-5">
                            <View className="flex flex-row items-center justify-between">
                                <Text className="text-xl font-rubik-bold text-black-300">Our Recommendations</Text>
                                <TouchableOpacity className="">
                                    <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                                </TouchableOpacity>
                            </View>

                            <Filters />
                        </View>
                    </>
                }
            />
        </SafeAreaView>
    );
}
