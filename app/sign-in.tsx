import { ScrollView, Image, View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { login } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/GlobalProvider'
import { Redirect } from 'expo-router'

const SignIn = () => {
    const { refetch, loading, isLoggedIn } = useGlobalContext()
    if (!loading && isLoggedIn) return <Redirect href="/" />

    const handleLogin = async () => {
        const result = await login()

        if (result) {
            refetch()
        } else {
            Alert.alert('Error', 'Failed to login')
        }
    }

    return (
        <SafeAreaView className='bg-white h-full'>
            <ScrollView contentContainerClassName='h-full'>
                <Image source={images.onboardingHD} className='w-full h-4/6' resizeMode='contain' />

                <View className='px-10'>
                    <Text className='text-center text-base uppercase font-rubik text-black-200'>
                        Welcome to KanaState
                    </Text>
                    <Text className='text-3xl font-rubik-bold text-black-300 text-center mt-2'>
                        Let's Get You Closer to {"\n"}
                        <Text className='text-primary-300'>Your Ideal Home</Text>
                    </Text>
                    <TouchableOpacity onPress={handleLogin} className='bg-white border border-gray-200 rounded-full w-full py-4 mt-12' activeOpacity={0.7}>
                        <View className='flex items-start justify-center flex-row'>
                            <Image
                                source={icons.google}
                                className='size-5'
                                resizeMode='contain' />
                            <Text className='text-lg font-rubik-medium text-black-300 ml-3'>
                                Continue with Google
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn
