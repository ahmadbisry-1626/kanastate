import { View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppwrite } from '@/lib/useAppwrite'
import { getPropertyById } from '@/lib/appwrite'
import { PropertyProps } from '@/types'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { priceFormatter } from '@/lib/utils'

const Property = () => {
    const { id } = useLocalSearchParams()
    const { data, loading, refetch } = useAppwrite<PropertyProps, any>({
        fn: () => getPropertyById(id as string)
    })

    if (!data) return null

    return (
        <SafeAreaView className='bg-white h-full'>
            <FlatList
                data={data.facillities}
                renderItem={({ item }) => {
                    return (
                        <View className='px-5 flex items-start justify-center' style={{ marginVertical: 12 }}>
                            <View className='flex flex-col items-center justify-center gap-2'>
                                <View className='flex items-center justify-center p-5 bg-primary-100 rounded-full'>
                                    <Image source={
                                        item === 'Wifi' ? icons.wifi :
                                            item === 'Gym' ? icons.dumbell :
                                                item === 'Laundry' ? icons.laundry :
                                                    item === 'Parking' ? icons.carPark :
                                                        item === 'Pet-friendly' ? icons.dog : icons.wifi
                                    } className='size-8' />
                                </View>
                                <Text className='text-lg text-black-200 line-clamp-1 max-w-[65px] text-center'>{item}</Text>
                            </View>
                        </View>
                    )
                }}
                columnWrapperClassName='flex items-center justify-start'
                contentContainerClassName=''
                numColumns={4}
                keyExtractor={(item) => item.toString()}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        <View className='relative w-full h-[400px]'>
                            <Image source={{ uri: data.image }} className='absolute size-full' resizeMode='cover' />
                            <View className='absolute flex-1 flex flex-row items-center justify-between inset-x-6 top-8 bg-white/90 rounded-full px-5 py-3'>
                                <TouchableOpacity className='' onPress={() => router.back()}>
                                    <Image source={icons.backArrow} className='size-7' tintColor="#000000" resizeMode='contain' />
                                </TouchableOpacity>

                                <View className='flex flex-row items-center gap-3'>
                                    <TouchableOpacity>
                                        <Image source={icons.heart} className='size-7' tintColor="#000000" />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image source={icons.send} className='size-7' tintColor="#000000" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View className='px-5 mt-5 flex flex-col gap-3'>
                            <Text className='text-3xl font-rubik-bold text-black-300'>{data.name}</Text>
                            <View className='flex flex-row items-center gap-3'>
                                <Text className='text-base font-rubik-medium text-primary-300' style={{ transform: [{ translateY: 3.5 }] }}>{data.type}</Text>
                                <View className='flex flex-row items-center gap-1'>
                                    <Image source={icons.star} className='size-5' />
                                    <Text className='text-base text-black-100 font-rubik-medium mt-1'>{data.rating}</Text>
                                </View>
                            </View>

                            <View className='flex flex-row items-center gap-7 mt-2 border-b border-gray-200 pb-7'>
                                <View className='flex flex-row items-center justify-center gap-3'>
                                    <View className='p-2 rounded-full bg-primary-100'>
                                        <Image source={icons.bed} className='size-6' />
                                    </View>
                                    <Text className='text-base font-rubik-medium text-black-500'>{data.bedrooms} {data.bedrooms > 0 ? 'beds' : 'bed'}</Text>
                                </View>
                                <View className='flex flex-row items-center justify-center gap-3'>
                                    <View className='p-2 rounded-full bg-primary-100'>
                                        <Image source={icons.bath} className='size-5' />
                                    </View>
                                    <Text className='text-base font-rubik-medium text-black-500'>{data.bathrooms} {data.bathrooms > 0 ? 'beds' : 'bed'}</Text>
                                </View>
                                <View className='flex flex-row items-center justify-center gap-3'>
                                    <View className='p-2 rounded-full bg-primary-100'>
                                        <Image source={icons.area} className='size-5' />
                                    </View>
                                    <Text className='text-base font-rubik-medium text-black-500'>{data.area} sqft</Text>
                                </View>
                            </View>

                            <View className='flex flex-col gap-3 mt-7'>
                                <Text className='text-3xl font-rubik-bold text-black-300'>Agent</Text>
                                <View className='flex flex-row items-center justify-between mt-3'>
                                    <View className='flex flex-row items-center gap-3'>
                                        <Image source={{ uri: data.creator.avatar }} className='size-16 rounded-full' />
                                        <View className='flex flex-col gap-1'>
                                            <Text className='text-lg font-rubik-semibold text-black-300'>{data.creator.name}</Text>
                                            <Text className='text-sm font-rubik-medium text-black-100'>Owner</Text>
                                        </View>
                                    </View>

                                    <View className='flex flex-row items-center gap-5 mr-2'>
                                        <TouchableOpacity>
                                            <Image source={icons.chatSolid} className='size-7' tintColor="#0061FF" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ transform: [{ translateY: -2 }] }}>
                                            <Image source={icons.call} className='size-7' tintColor="#0061FF" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View className='flex flex-col gap-2 mt-7'>
                                <Text className='text-3xl font-rubik-bold text-black-300'>Overview</Text>
                                <Text className='text-lg text-black-200'>{data.description}</Text>
                            </View>

                            <Text className='text-3xl font-rubik-bold text-black-300 mt-7 mb-1'>Facillities</Text>
                        </View>
                    </View>
                }
                ListFooterComponent={
                    <View className='flex flex-col gap-10'>
                        <View className='px-5'>
                            <Text className='text-3xl font-rubik-bold text-black-300 mt-7 mb-1'>Galleries</Text>
                            <FlatList
                                data={data.gallery}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity activeOpacity={0.7}>
                                            <Image source={{ uri: item.image }} className='size-40 rounded-xl' />
                                        </TouchableOpacity>
                                    )
                                }}
                                keyExtractor={(item) => item.$id}
                                horizontal
                                bounces={false}
                                contentContainerClassName='flex gap-3 mt-3'
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>

                        <View className='flex gap-3 px-5'>
                            <Text className='text-3xl font-rubik-bold text-black-300'>Location</Text>
                            <View className='flex flex-row items-center gap-3'>
                                <Image source={icons.location} className='size-6' />
                                <Text className='text-base font-rubik-medium text-black-200 mt-0.5'>{data.address}</Text>
                            </View>
                            <Image source={images.map} className='w-full h-52 mt-3' />
                        </View>

                        <View className='flex gap-3 flex-row items-center flex-1 justify-between -mb-5 px-5'>
                            <View className='flex flex-row items-center gap-1'>
                                <Image source={icons.star} className='size-6' />
                                <Text className='text-xl font-rubik-bold text-black-300' style={{ transform: [{ translateY: 2 }] }}>
                                    {data.rating} {" "} ({data.reviews.length} reviews)
                                </Text>
                            </View>

                            <TouchableOpacity className="mr-1">
                                <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={data.reviews.slice(0, 1)}
                            renderItem={({ item }) => {
                                return (
                                    <View className='px-5'>
                                        <View className='flex flex-row items-center gap-3'>
                                            <Image source={{ uri: item.avatar }} className='size-12 rounded-full' />
                                            <Text className='text-base font-rubik-semibold text-black-300'>{item.name}</Text>
                                        </View>
                                        <Text className='text-lg text-black-200 mt-3'>{item.review}</Text>

                                        <View className='flex-1 flex-row items-center justify-between mt-3'>
                                            <View className='flex-row items-center gap-3'>
                                                <Image source={icons.heart} className='size-6' tintColor="#0061FF" />
                                                <Text className='text-base font-rubik-semibold text-black-300' style={{ transform: [{ translateY: 1.5 }] }}>
                                                    234
                                                </Text>
                                            </View>
                                            <Text className='text-sm text-black-100 mr-1'>2 days ago</Text>
                                        </View>
                                    </View>
                                )
                            }}
                            keyExtractor={(item) => item.$id}
                        />

                        <View className='flex items-center flex-row justify-between py-8 rounded-t-[50px] border border-primary-200 px-10'>
                            <View className='flex gap-1'>
                                <Text className='text-base font-rubik-medium text-black-200'>Price</Text>
                                <Text className='font-rubik-semibold text-primary-300 text-2xl'>{priceFormatter(data.price)}</Text>
                            </View>

                            <TouchableOpacity className='bg-primary-300 px-16 py-4 rounded-full'>
                                <Text className='text-base font-semibold text-white'>Booking Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            />

        </SafeAreaView>
    )
}

export default Property
