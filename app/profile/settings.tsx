import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Volume2, 
  Smartphone, 
  Mail, 
  MessageCircle,
  ChevronRight,
  User,
  CreditCard,
  CircleHelp as HelpCircle,
  FileText,
  LogOut
} from 'lucide-react-native';
import { router } from 'expo-router';

const notificationSettings = [
  {
    id: 'workouts',
    title: 'Rappels d\'entraînement',
    description: 'Notifications pour vos séances programmées',
    enabled: true,
  },
  {
    id: 'progress',
    title: 'Suivi des progrès',
    description: 'Mises à jour sur vos objectifs et réalisations',
    enabled: true,
  },
  {
    id: 'community',
    title: 'Activité communautaire',
    description: 'Likes, commentaires et nouveaux posts',
    enabled: false,
  },
  {
    id: 'marketing',
    title: 'Offres et promotions',
    description: 'Nouveaux programmes et réductions',
    enabled: false,
  },
];

const accountSettings = [
  {
    id: 'profile',
    title: 'Informations personnelles',
    description: 'Nom, email, photo de profil',
    icon: User,
    action: () => router.push('/profile/edit-profile'),
  },
  {
    id: 'subscription',
    title: 'Abonnements',
    description: 'Gérer vos abonnements et paiements',
    icon: CreditCard,
    action: () => router.push('/profile/subscription'),
  },
  {
    id: 'privacy',
    title: 'Confidentialité',
    description: 'Contrôlez qui peut voir votre profil',
    icon: Shield,
    action: () => router.push('/profile/privacy'),
  },
];

const appSettings = [
  {
    id: 'language',
    title: 'Langue',
    description: 'Français',
    icon: Globe,
    action: () => console.log('Language settings'),
  },
  {
    id: 'theme',
    title: 'Thème sombre',
    description: 'Activer le mode sombre',
    icon: Moon,
    hasSwitch: true,
    enabled: false,
  },
  {
    id: 'sound',
    title: 'Sons',
    description: 'Sons de l\'application',
    icon: Volume2,
    hasSwitch: true,
    enabled: true,
  },
];

const supportSettings = [
  {
    id: 'help',
    title: 'Centre d\'aide',
    description: 'FAQ et guides d\'utilisation',
    icon: HelpCircle,
    action: () => router.push('/help'),
  },
  {
    id: 'contact',
    title: 'Nous contacter',
    description: 'Support client',
    icon: MessageCircle,
    action: () => router.push('/contact'),
  },
  {
    id: 'terms',
    title: 'Conditions d\'utilisation',
    description: 'Termes et conditions',
    icon: FileText,
    action: () => router.push('/terms'),
  },
  {
    id: 'privacy-policy',
    title: 'Politique de confidentialité',
    description: 'Comment nous utilisons vos données',
    icon: Shield,
    action: () => router.push('/privacy-policy'),
  },
];

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(notificationSettings);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleBack = () => {
    router.back();
  };

  const handleNotificationToggle = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
      )
    );
  };

  const handleLogout = () => {
    // Show confirmation dialog
    console.log('Logout');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Paramètres</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Notifications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Bell size={20} color="#EC5300" />
            <Text style={styles.sectionTitle}>Notifications</Text>
          </View>
          {notifications.map((notification) => (
            <View key={notification.id} style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>{notification.title}</Text>
                <Text style={styles.settingDescription}>{notification.description}</Text>
              </View>
              <Switch
                value={notification.enabled}
                onValueChange={() => handleNotificationToggle(notification.id)}
                trackColor={{ false: '#F3F4F6', true: '#EC5300' }}
                thumbColor="#FFFFFF"
              />
            </View>
          ))}
        </View>

        {/* Account */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <User size={20} color="#EC5300" />
            <Text style={styles.sectionTitle}>Compte</Text>
          </View>
          {accountSettings.map((setting) => (
            <TouchableOpacity
              key={setting.id}
              style={styles.settingItem}
              onPress={setting.action}
            >
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <setting.icon size={20} color="#6B7280" />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>{setting.title}</Text>
                  <Text style={styles.settingDescription}>{setting.description}</Text>
                </View>
              </View>
              <ChevronRight size={16} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Smartphone size={20} color="#EC5300" />
            <Text style={styles.sectionTitle}>Application</Text>
          </View>
          {appSettings.map((setting) => (
            <View key={setting.id} style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <setting.icon size={20} color="#6B7280" />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>{setting.title}</Text>
                  <Text style={styles.settingDescription}>{setting.description}</Text>
                </View>
              </View>
              {setting.hasSwitch ? (
                <Switch
                  value={setting.id === 'theme' ? darkMode : soundEnabled}
                  onValueChange={(value) => {
                    if (setting.id === 'theme') {
                      setDarkMode(value);
                    } else if (setting.id === 'sound') {
                      setSoundEnabled(value);
                    }
                  }}
                  trackColor={{ false: '#F3F4F6', true: '#EC5300' }}
                  thumbColor="#FFFFFF"
                />
              ) : (
                <ChevronRight size={16} color="#9CA3AF" />
              )}
            </View>
          ))}
        </View>

        {/* Support */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <HelpCircle size={20} color="#EC5300" />
            <Text style={styles.sectionTitle}>Support</Text>
          </View>
          {supportSettings.map((setting) => (
            <TouchableOpacity
              key={setting.id}
              style={styles.settingItem}
              onPress={setting.action}
            >
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <setting.icon size={20} color="#6B7280" />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingTitle}>{setting.title}</Text>
                  <Text style={styles.settingDescription}>{setting.description}</Text>
                </View>
              </View>
              <ChevronRight size={16} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <View style={styles.logoutIcon}>
              <LogOut size={20} color="#EF4444" />
            </View>
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionSection}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
          <Text style={styles.versionSubtext}>Dernière mise à jour : 15 janvier 2024</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginLeft: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  logoutIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
  },
  versionSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
});