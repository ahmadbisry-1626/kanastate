import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NoResults from '@/components/NoResults'
import icons from '@/constants/icons'
import Search from '@/components/Search'
import Filters from '@/components/Filters'
import { useAppwrite } from '@/lib/useAppwrite'
import { getProperties } from '@/lib/appwrite'
import { router, useLocalSearchParams } from 'expo-router'
import ExploreCard from '@/components/ExploreCard'
import { PropertyProps } from '@/types'

const explore = () => {
    const params = useLocalSearchParams<{ query: string, filter?: string }>()
    const { query, filter } = params
    const [refresh, setRefresh] = useState(false)
    const { data, loading, refetch } = useAppwrite<PropertyProps[], any>({
        fn: getProperties,
        params: {
            filter: filter!,
            query: query
        }
    })

    const handleRefresh = async () => {
        setRefresh(true)
        await refetch({
            filter: filter!,
            query: query
        })
        setRefresh(false)
    }


    useEffect(() => {
        refetch({
            filter: filter!,
            query: query
        })
    }, [filter, query])

    const handleCardPress = (id: string) => router.push(`/properties/${id}`)

    return (
        <SafeAreaView className='bg-white h-full px-5'>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <ExploreCard onPress={() => handleCardPress(item.$id)} item={item} />
                    )
                }}
                className=''
                keyExtractor={(item) => item.$id}
                showsVerticalScrollIndicator={false}
                contentContainerClassName='flex gap-5 pb-32'
                ListEmptyComponent={
                    loading ? (
                        <ActivityIndicator size={"large"} className="text-primary-300 mt-20" />
                    ) : (
                        <NoResults />
                    )
                }
                refreshControl={<RefreshControl refreshing={refresh} onRefresh={handleRefresh} />}
                ListHeaderComponent={
                    <View className='-mb-1'>
                        <View className='flex flex-row items-center justify-between mt-5'>
                            <TouchableOpacity className='size-10 rounded-full flex items-center justify-center p-2 bg-primary-200' onPress={() => router.back()}>
                                <Image source={icons.backArrow} className='size-full' />
                            </TouchableOpacity>
                            <Text className='text-base font-rubik-medium text-black-300'>Search for Your Ideal Home</Text>
                            <Image source={icons.bell} className="size-6" />
                        </View>

                        <Search />
                        <Filters className='mt-5' />
                        <Text className='text-2xl font-rubik-semibold text-black-300 mt-6'>
                            {
                                filter === 'All' ? `Found ${data?.length} Properties` : `Found ${data?.length} ${filter}`
                            }
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    )
}

export default explore
