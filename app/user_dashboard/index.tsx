import * as React from 'react';
import { Image, ScrollView, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { H1, H2, H3, H4, P } from "~/components/ui/typography";
import GjengeLogo from "~/assets/images/gjenge-logo.png";
import CEO from "~/assets/images/ceo.png";
import { Link } from "expo-router";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { useLocalSearchParams } from "expo-router";
import { checkUser } from "~/lib/supabase";
import { greeting } from "~/services/greeting";
import { Products } from "~/data/productsData";
import variationsIMG from "~/assets/images/variations.png";

interface UserDetails {
  first_name: string;
  last_name: string;
}

export default function UserDashboard() {
  const { email } = useLocalSearchParams();
  const [userDetails, setUserDetails] = React.useState<UserDetails | null>(
    null
  );
  React.useEffect(() => {
    async function fetchUserDetails() {
      return await checkUser(email.toString());
    }
    fetchUserDetails().then(setUserDetails);
    console.log(userDetails);
  }, []);

  const user_abreviation = userDetails
    ? `${userDetails.first_name[0]}${userDetails.last_name[0]}`
    : "";
  return (
    <View className=" bg-[#060606] flex-1 pt-14 px-6 gap-12">
      <View className="flex justify-center">
        <H4
          className="capitalize color-white"
          style={{ fontFamily: "Inter_600SemiBold" }}
        >
          {greeting()}, {userDetails && userDetails["first_name"]}
        </H4>
        <Avatar alt="User" className="absolute right-0">
          <AvatarFallback>
            <P className="uppercase">{user_abreviation}</P>
          </AvatarFallback>
        </Avatar>
      </View>
      <ScrollView>
        <View className='gap-10'>
          <View className="gap-4">
            <H4
              className="color-white text-base uppercase"
              style={{ fontFamily: "Inter_300Light" }}
            >
              Product catalogue
            </H4>
            <ScrollView horizontal directionalLockEnabled>
              <View className="gap-4 flex-row">
                {Products.map((product) => (
                  <Link key={product['id']} href={`/user_dashboard/products/${product['id']}`}>
                    <ProductShowcase
                      imageSrc={product["imageSrc"]}
                      title={product["title"]}
                      details={product["details"]}
                      price={product["price"]}
                      bgcolor={product["bgcolor"]}
                    />
                  </Link>
                ))}
              </View>
            </ScrollView>
          </View>
          <View className="gap-4">
            <H4
              className="color-white text-base uppercase"
              style={{ fontFamily: "Inter_300Light" }}
            >
              Available special variations
            </H4>
            <Image
              source={variationsIMG}
              style={{
                width: "100%",
                height: 100,
                objectFit: "contain",
                borderRadius: 10,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function ProductShowcase(props: {
  imageSrc: any;
  title: string;
  details: string;
  price: string;
  bgcolor: string;
}) {
  return (
    <View
      className="gap-4 overflow-auto"
      style={{
        width: 280,
      }}
    >
      <Image
        source={props.imageSrc}
        style={{
          width: "100%",
          height: 400,
          objectFit: "contain",
          backgroundColor: props.bgcolor,
          borderRadius: 10,
        }}
      />
      <View>
        <H4 className="color-white" style={{ fontFamily: "Inter_700Bold" }}>
          {props.title}
        </H4>
        <P className="color-white">{props.details}</P>
      </View>
    </View>
  );
}