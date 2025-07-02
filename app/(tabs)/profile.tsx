import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Heart, CreditCard, Bell, CircleHelp as HelpCircle, LogOut, ChevronRight, Star, Target, Award, Calendar } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const menuItems = [
  {
    id: 1,
    title: 'Mes favoris',
    icon: Heart,
    color: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  {
    id: 2,
    title: 'Abonnements & Paiements',
    icon: CreditCard,
    color: '#EC5300',
    backgroundColor: '#FEF3E7',
  },
  {
    id: 3,
    title: 'Objectifs',
    icon: Target,
    color: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  {
    id: 4,
    title: 'Récompenses',
    icon: Award,
    color: '#F59E0B',
    backgroundColor: '#FFFBEB',
  },
];

const settingsItems = [
  {
    id: 1,
    title: 'Notifications',
    icon: Bell,
    hasSwitch: true,
    value: true,
  },
  {
    id: 2,
    title: 'Paramètres',
    icon: Settings,
    hasSwitch: false,
  },
  {
    id: 3,
    title: 'Aide & Support',
    icon: HelpCircle,
    hasSwitch: false,
  },
  {
    id: 4,
    title: 'Déconnexion',
    icon: LogOut,
    hasSwitch: false,
    isLogout: true,
  },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profil</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <LinearGradient
          colors={['#EC5300', '#FF6B35']}
          style={styles.profileCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.profileContent}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=200' }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Marie Dupont</Text>
              <Text style={styles.profileEmail}>marie.dupont@email.com</Text>
              <View style={styles.membershipBadge}>
                <Star size={14} color="#FCD34D" fill="#FCD34D" />
                <Text style={styles.membershipText}>Membre Premium</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>28</Text>
            <Text style={styles.statLabel}>Séances</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Jours actifs</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Note moy.</Text>
          </View>
        </View>

        {/* Current Program */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Programme actuel</Text>
          <View style={styles.currentProgramCard}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=300' }}
              style={styles.programImage}
            />
            <View style={styles.programInfo}>
              <Text style={styles.programTitle}>Bootcamp Intensif</Text>
              <Text style={styles.programProgress}>Semaine 3 sur 8</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '37.5%' }]} />
              </View>
            </View>
            <TouchableOpacity style={styles.continueButton}>
              <Calendar size={16} color="#EC5300" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <View style={styles.menuGrid}>
            {menuItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.menuItem}>
                <View style={[styles.menuIcon, { backgroundColor: item.backgroundColor }]}>
                  <item.icon size={24} color={item.color} />
                </View>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <ChevronRight size={16} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres</Text>
          <View style={styles.settingsList}>
            {settingsItems.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={[
                  styles.settingItem,
                  item.isLogout && styles.logoutItem
                ]}
              >
                <View style={styles.settingLeft}>
                  <View style={[
                    styles.settingIcon,
                    item.isLogout && styles.logoutIcon
                  ]}>
                    <item.icon 
                      size={20} 
                      color={item.isLogout ? '#EF4444' : '#6B7280'} 
                    />
                  </View>
                  <Text style={[
                    styles.settingTitle,
                    item.isLogout && styles.logoutText
                  ]}>
                    {item.title}
                  </Text>
                </View>
                {item.hasSwitch ? (
                  <Switch
                    value={item.value}
                    onValueChange={() => {}}
                    trackColor={{ false: '#F3F4F6', true: '#EC5300' }}
                    thumbColor="#FFFFFF"
                  />
                ) : (
                  <ChevronRight 
                    size={16} 
                    color={item.isLogout ? '#EF4444' : '#9CA3AF'} 
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* App Version */}
        <View style={styles.footer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 20,
    padding: 20,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 8,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  membershipText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 16,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#EC5300',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 8,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  currentProgramCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  programImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  programInfo: {
    flex: 1,
  },
  programTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  programProgress: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#EC5300',
    borderRadius: 3,
  },
  continueButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuGrid: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  settingsList: {
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutItem: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
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
    marginRight: 16,
  },
  logoutIcon: {
    backgroundColor: '#FEF2F2',
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  logoutText: {
    color: '#EF4444',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
});