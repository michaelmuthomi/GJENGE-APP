import * as React from 'react';
import { Image, View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { H1, H2, H3, H4, P } from '~/components/ui/typography';
import GjengeLogo from "~/assets/images/gjenge-logo.png"
import CEO from "~/assets/images/ceo.png"
import { Link } from 'expo-router';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { useLocalSearchParams } from 'expo-router';
import { checkUser } from '~/lib/supabase';
import { greeting } from '~/services/greeting';

interface UserDetails {
  first_name: string;
  last_name: string;
}

export default function Screen() {
  const { email } = useLocalSearchParams();
  const [userDetails, setUserDetails] = React.useState<UserDetails | null>(null);
  React.useEffect(()=>{
    async function fetchUserDetails(){
      return await checkUser(email.toString())
    }
    fetchUserDetails().then(setUserDetails)
    console.log(userDetails)
  }, [])
  
  const user_abreviation = userDetails ? `${userDetails.first_name[0]}${userDetails.last_name[0]}` : '';
  return (
    <View className=' bg-[#060606] flex-1 pt-14 px-6'>
      <View className='flex justify-center'>
        <H4 className='capitalize color-white' style={{fontFamily: "Inter_600SemiBold"}}>{greeting()}, {userDetails && userDetails['first_name']}</H4>
        <Avatar alt="User" className='absolute right-0'>
          <AvatarFallback>
            <P className='uppercase'>{user_abreviation}</P>
          </AvatarFallback>
        </Avatar>
      </View>
    </View>
  );
}
