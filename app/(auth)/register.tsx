import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
// import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { Lock, Mail, User } from 'lucide-react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'venue_owner' | 'attendee'>('attendee');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegister() {
    if (!email || !password || !fullName) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    // const { data, error: signUpError } = await supabase.auth.signUp({
    //   email,
    //   password,
    //   options: {
    //     data: {
    //       full_name: fullName,
    //       role,
    //     },
    //   },
    // });

    // if (signUpError) {
    //   setLoading(false);
    //   setError(signUpError.message);
    //   return;
    // }

    // if (data?.user) {
    //   const { error: profileError } = await supabase
    //     .from('users')
    //     .insert([
    //       {
    //         id: data.user.id,
    //         email,
    //         full_name: fullName,
    //         role,
    //       },
    //     ]);

    //   if (profileError) {
    //     setLoading(false);
    //     setError(profileError.message);
    //     return;
    //   }
    // }

    setLoading(false);
    router.replace('/(tabs)');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Eat Meet Club</Text>
          <Text style={styles.subtitle}>Create a new account</Text>
        </View>

        <View style={styles.formContainer}>
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <View style={styles.inputContainer}>
            <User size={20} color="#6B6B6B" />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Mail size={20} color="#6B6B6B" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color="#6B6B6B" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.roleContainer}>
            <Text style={styles.roleTitle}>I am a:</Text>
            <View style={styles.roleButtons}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === 'attendee' && styles.roleButtonActive,
                ]}
                onPress={() => setRole('attendee')}
              >
                <Text
                  style={[
                    styles.roleButtonText,
                    role === 'attendee' && styles.roleButtonTextActive,
                  ]}
                >
                  Attendee
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === 'venue_owner' && styles.roleButtonActive,
                ]}
                onPress={() => setRole('venue_owner')}
              >
                <Text
                  style={[
                    styles.roleButtonText,
                    role === 'venue_owner' && styles.roleButtonTextActive,
                  ]}
                >
                  Restaurant Owner
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.registerButtonText}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6B6B',
    marginBottom: 20,
    fontFamily: 'Inter-Regular',
  },
  formContainer: {
    width: '100%',
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    padding: 10,
    borderRadius: 4,
    marginBottom: 16,
  },
  errorText: {
    color: '#B91C1C',
    fontFamily: 'Inter-Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  roleContainer: {
    marginBottom: 20,
  },
  roleTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roleButton: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  roleButtonActive: {
    backgroundColor: '#FF6B35',
  },
  roleButtonText: {
    color: '#6B6B6B',
    fontWeight: '600',
    fontFamily: 'Inter-Medium',
  },
  roleButtonTextActive: {
    color: '#fff',
  },
  registerButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-Bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#6B6B6B',
    fontFamily: 'Inter-Regular',
  },
  loginLink: {
    color: '#FF6B35',
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
});