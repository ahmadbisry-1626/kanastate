import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { categories } from '@/constants/data'

const Filters = () => {
    const params = useLocalSearchParams<{ filter?: string }>()

    const [selectedCategories, setSelectedCategories] = useState(params.filter || 'All')

    const handleFilter = (category: string) => {
        if (selectedCategories === category) {
            setSelectedCategories('All')
            router.setParams({ filter: 'All' })
            return;
        }

        setSelectedCategories(category)
        router.setParams({ filter: category })
    }

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className='mt-4 '>
            {categories.map((item, i) => (
                <TouchableOpacity key={i} className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${selectedCategories === item.category && '!bg-primary-300'} bg-primary-100 border border-primary-200`} onPress={() => handleFilter(item.category)}>
                    <Text className={`${selectedCategories === item.category && '!text-white font-rubik-bold'} text-sm text-black-300 font-rubik`} style={{ transform: [{ translateY: 1 }] }}>
                        {item.title}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default Filters
