
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { CreditCard, LogOut, Settings, Ticket, User, Utensils } from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Static data to replace Supabase queries
  const session = {
    user: {
      id: '123',
      email: 'john.doe@example.com',
    },
  };

  const userProfile = {
    full_name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'attendee',
  };

  const ticketCount = 5;

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      // Simulate logout
      setTimeout(() => {
        router.replace('/(auth)/login');
      }, 1000);
    } catch (error) {
      Alert.alert('Error', 'There was a problem signing out');
    } finally {
      setIsLoading(false);
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          onPress: handleLogout,
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{userProfile?.full_name.charAt(0)}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userProfile?.full_name}</Text>
            <Text style={styles.profileEmail}>{userProfile?.email}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>
                {userProfile?.role === 'venue_owner' ? 'Restaurant Owner' : 'Attendee'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <View style={styles.statIcon}>
            <Ticket size={24} color="#FF6B35" />
          </View>
          <Text style={styles.statCount}>{ticketCount}</Text>
          <Text style={styles.statLabel}>Tickets</Text>
        </View>

        {userProfile?.role === 'venue_owner' && (
          <View style={styles.statBox}>
            <View style={styles.statIcon}>
              <Utensils size={24} color="#00A6A6" />
            </View>
            <Text style={styles.statCount}>0</Text>
            <Text style={styles.statLabel}>My Events</Text>
          </View>
        )}
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.menuSectionTitle}>Account</Text>

        <TouchableOpacity style={styles.menuItem}>
          <User size={20} color="#333" />
          <Text style={styles.menuItemText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Settings size={20} color="#333" />
          <Text style={styles.menuItemText}>Account Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <CreditCard size={20} color="#333" />
          <Text style={styles.menuItemText}>Payment Methods</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/tickets')}
        >
          <Ticket size={20} color="#333" />
          <Text style={styles.menuItemText}>My Tickets</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={confirmLogout}
        disabled={isLoading}
      >
        <LogOut size={20} color="#FF6B35" />
        <Text style={styles.logoutText}>
          {isLoading ? 'Signing Out...' : 'Sign Out'}
        </Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Eat Meet Club</Text>
        <Text style={styles.footerVersion}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B6B6B',
    fontFamily: 'Inter-Regular',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FF6B35',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    fontFamily: 'Inter-Bold',
  },
  profileSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'Inter-Bold',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'Inter-Medium',
  },
  profileEmail: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  roleBadge: {
    backgroundColor: '#FFF1EB',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  roleText: {
    color: '#FF6B35',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statCount: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B6B6B',
    fontFamily: 'Inter-Regular',
  },
  menuSection: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    fontFamily: 'Inter-Medium',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF1EB',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#FF6B35',
    fontFamily: 'Inter-Medium',
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#6B6B6B',
    fontFamily: 'Inter-Regular',
  },
  footerVersion: {
    fontSize: 12,
    color: '#B2B2B2',
    fontFamily: 'Inter-Regular',
  },
});