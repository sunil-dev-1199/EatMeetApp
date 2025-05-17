import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Tabs } from 'expo-router';
import { useRouter } from 'expo-router';
import { Calendar, Home, User } from 'lucide-react-native';

export default function TabLayout() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      const mockSession = {
        user: {
          id: 'user-id',
          email: 'test@domain.com',
        },
      };
      setSession(mockSession);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/(auth)/login');
    }
  }, [session, loading, router]);

  if (loading || !session) {
    return <Text>Loading...</Text>;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#6B6B6B',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter-Regular',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="events/index"
        options={{
          title: 'Events',
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile/index"

        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tickets/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="events/[id]"
        options={{
          href: null,
        }}
      />

    </Tabs>
  );
}
