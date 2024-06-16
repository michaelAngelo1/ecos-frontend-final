import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './../config/Fonts'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebaseConfig.js'
import Snackbar from '@/components/Snackbar'

interface SignInProps {
  email: string
  password: string
}

const SignIn: React.FC<SignInProps> = () => {

  const [form, setForm] = useState<SignInProps>({
    email: '',
    password: ''
  });

  const [showSnackbar, setShowSnackbar] = useState(false); // State for Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // State for Snackbar message

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleSignIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("successful sign in");
      router.push('/home');
    } catch (error) {
      console.log('ERROR SIGN IN', error);
      // setShowSnackbar(true); // Show Snackbar on error
      // setSnackbarMessage('Sign in failed. Please check your email and password.');
      setSnackbarVisible(true);
    }
  };

  return (
    <SafeAreaView className='bg-[#fff] h-full'>
      <ScrollView>
        <View className='flex flex-col min-h-[100vh] justify-center items-center px-4'>
          <Text className='text-4xl text-green' style={styles.montserratRegular}>Sign in to ECOS</Text>
          <FormField
            title="Enter your email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, 
              email: e
            })}
            otherStyles="mt-4"
            keyboardType="email-address"
          />
          <FormField
            title="Enter your password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, 
              password: e
            })}
            otherStyles="mt-3"
            keyboardType='password'
          />
          
          <CustomButton
            actionText="Log in"
            bgColor='bg-green'
            textColor='text-white'
            handlePress={() => {
              handleSignIn(form.email, form.password);
            }}
          />
          <View className='justify-center pt-2 flex-row gap-2'>
            <Text className='text-sm text-green' style={styles.montserratRegular}>
              Forgot password?
            </Text>
            <Link href="/forgotPassword" className='text-sm text-green' style={styles.montserratMedium}>Click here</Link>
          </View>
          <View className='justify-center pt-2 flex-row gap-2'>
            <Text className='text-sm text-green' style={styles.montserratRegular}>
              Don't have an account?
            </Text>
            <Link href="/role" className='text-sm text-green' style={styles.montserratMedium}>Sign up</Link>
          </View>
          
          { snackbarVisible && 
            <Snackbar
              message="Sign in failed. Check your username and password." // Update message if needed
              setVisible={setSnackbarVisible} // Pass the function to update visibility
              duration={3000}
            />
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn