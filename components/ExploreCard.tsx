import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { PropertyProps } from '@/types'
import { priceFormatter } from '@/lib/utils'

const ExploreCard = ({ onPress, item }: { onPress?: () => void, item: PropertyProps }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} className='flex flex-row items-center gap-3 bg-white shadow py-4 px-4 rounded-xl relative'>
            <Image source={{ uri: item.image }} className='size-28 rounded-xl' />
            <Image source={icons.heart} className='absolute right-4 top-4 size-6' tintColor="#191331" />

            <View className='flex flex-col flex-1'>
                <Text className='text-2xl text-black-300 font-rubik-semibold max-w-[150px]' numberOfLines={2}>{item.name}</Text>
                <View className='flex flex-row items-center gap-2'>
                    <Image source={icons.star} className='size-5' />
                    <Text className='text-base font-rubik-medium mt-1 text-primary-300'>{item.rating}</Text>
                </View>
                <View className='flex flex-row items-center justify-between mt-1'>
                    <Text className='text-base text-black-200'>{item.address}</Text>
                    <Text className='font-rubik-semibold text-xl text-primary-300 mr-1'>{priceFormatter(item.price)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ExploreCard
