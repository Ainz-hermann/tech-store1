import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { Link } from 'expo-router';
import { User, Package, Heart, CreditCard, Settings, LogOut, ChevronRight, Bell, Moon, Shield, CircleHelp as HelpCircle } from 'lucide-react-native';
import { typography } from '@/constants/typography';
import { colors } from '@/constants/colors';
import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';

export default function ProfileScreen() {
  const { user, isAuthenticated, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={typography.h3}>Profile</Text>
        </View>
        
        <View style={styles.authContainer}>
          <Text style={typography.h4}>Welcome to TechStore</Text>
          <Text style={[typography.body1, styles.authDescription]}>
            Sign in to view your orders, manage your wishlist and more
          </Text>

          <Link href="/sign-in" asChild>
            <Button title="Sign In" style={styles.authButton} />
          </Link>

          <View style={styles.registerContainer}>
            <Text style={typography.body2}>Don't have an account? </Text>
            <Link href="/sign-up" asChild>
              <TouchableOpacity>
                <Text style={styles.registerText}>Register</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={typography.h3}>Profile</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={typography.h4}>{user?.name}</Text>
            <Text style={typography.body2}>{user?.email}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Account</Text>
        </View>

        <View style={styles.menuCard}>
          <Link href="/orders" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <Package size={20} color={colors.primary[600]} />
              </View>
              <Text style={styles.menuText}>My Orders</Text>
              <ChevronRight size={18} color={colors.gray[400]} />
            </TouchableOpacity>
          </Link>

          <Link href="/wishlist" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <Heart size={20} color={colors.accent[600]} />
              </View>
              <Text style={styles.menuText}>Wishlist</Text>
              <ChevronRight size={18} color={colors.gray[400]} />
            </TouchableOpacity>
          </Link>

          <Link href="/payment-methods" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <CreditCard size={20} color={colors.success[600]} />
              </View>
              <Text style={styles.menuText}>Payment Methods</Text>
              <ChevronRight size={18} color={colors.gray[400]} />
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Preferences</Text>
        </View>

        <View style={styles.menuCard}>
          <View style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Bell size={20} color={colors.warning[600]} />
            </View>
            <Text style={styles.menuText}>Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.gray[300], true: colors.primary[600] }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Moon size={20} color={colors.primary[400]} />
            </View>
            <Text style={styles.menuText}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: colors.gray[300], true: colors.primary[600] }}
              thumbColor={colors.white}
            />
          </View>
        </View>

        <View style={styles.sectionTitle}>
          <Text style={styles.sectionTitleText}>Support</Text>
        </View>

        <View style={styles.menuCard}>
          <Link href="/help-center" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <HelpCircle size={20} color={colors.primary[600]} />
              </View>
              <Text style={styles.menuText}>Help Center</Text>
              <ChevronRight size={18} color={colors.gray[400]} />
            </TouchableOpacity>
          </Link>

          <Link href="/privacy-policy" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <Shield size={20} color={colors.primary[600]} />
              </View>
              <Text style={styles.menuText}>Privacy & Security</Text>
              <ChevronRight size={18} color={colors.gray[400]} />
            </TouchableOpacity>
          </Link>

          <Link href="/settings" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIcon}>
                <Settings size={20} color={colors.primary[600]} />
              </View>
              <Text style={styles.menuText}>Settings</Text>
              <ChevronRight size={18} color={colors.gray[400]} />
            </TouchableOpacity>
          </Link>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color={colors.error[600]} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: colors.white,
    margin: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.gray[100],
  },
  editButtonText: {
    ...typography.button,
    color: colors.primary[600],
  },
  sectionTitle: {
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  sectionTitleText: {
    ...typography.h6,
    color: colors.gray[500],
  },
  menuCard: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  menuIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    ...typography.body1,
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 32,
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  logoutText: {
    ...typography.button,
    color: colors.error[600],
    marginLeft: 8,
  },
  versionText: {
    ...typography.caption,
    textAlign: 'center',
    margin: 24,
    color: colors.gray[400],
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  authDescription: {
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32,
    color: colors.gray[500],
  },
  authButton: {
    width: '100%',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  registerText: {
    ...typography.body2,
    color: colors.primary[600],
  },
});