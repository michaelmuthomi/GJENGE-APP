import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, ScrollView } from 'react-native';
import { H1, P } from '~/components/ui/typography';
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Link } from 'expo-router';

const SignupScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        // Handle signup logic here
        if (firstName && lastName && email && phoneNumber && password) {
            Alert.alert('Signup Successful', `Welcome, ${firstName}!`);
        } else {
            Alert.alert('Error', 'Please fill in all fields.');
        }
    };

    return (
        <ScrollView className='flex-1 bg-[#101010]'>
            <View className="flex-1 justify-end gap-6 p-6 pt-28">
            <View className="mt-auto mb-auto">
                <H1 className="text-white leading-loose text-center">Create an Account</H1>
            </View>
            <View className="gap-2">
                <View className="gap-4">
                    <View className='grid gird-cols-2 gap-2'>
                    <View className="gap-1">
                        <P className="text-white">First Name</P>
                        <Input
                            placeholder="First Name"
                            value={firstName}
                            onChangeText={setFirstName}
                            className="bg-[#212121] border-0 !h-14 color-white"
                            style={{ fontFamily: "Inter_500Medium" }}
                        />
                    </View>
                    <View className="gap-1">
                        <P className="text-white">Last Name</P>
                        <Input
                            placeholder="Last Name"
                            value={lastName}
                            onChangeText={setLastName}
                            className="bg-[#212121] border-0 !h-14 color-white"
                            style={{ fontFamily: "Inter_500Medium" }}
                        />
                    </View>
                    </View>
                    <View className="gap-1">
                        <P className="text-white">Email</P>
                        <Input
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            className="bg-[#212121] border-0 !h-14 color-white"
                            style={{ fontFamily: "Inter_500Medium" }}
                        />
                    </View>
                    <View className="gap-1">
                        <P className="text-white">Phone Number</P>
                        <Input
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="phone-pad"
                            className="bg-[#212121] border-0 !h-14 color-white"
                            style={{ fontFamily: "Inter_500Medium" }}
                        />
                    </View>
                    <View className="gap-1">
                        <P className="text-white">Password</P>
                        <Input
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            className="bg-[#212121] border-0 !h-14 color-white"
                            style={{ fontFamily: "Inter_500Medium" }}
                        />
                    </View>
                </View>
            </View>
            <View className="py-6 gap-4">
                <Button
                    size={"lg"}
                    variant={"default"}
                    className='bg-[#66d46f] text-white rounded-full h-10'
                    onPress={handleSignup}
                >
                    <P className='text-base' style={{fontFamily: "Inter_700Bold"}}>Join now</P>
                </Button>
                <Link href={{ pathname: "/screens/LoginScreen" }} className='w-full text-center'>
                    <P className='text-base text-center text-white' style={{ fontFamily: "Inter_500Medium" }}>Already have an account? Login</P>
                </Link>
            </View>
        </View>
        </ScrollView>
    );
};

export default SignupScreen;
