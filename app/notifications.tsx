import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bell, Calendar, Heart, MessageCircle, Trophy, Users } from 'lucide-react-native';
import { router } from 'expo-router';

const notifications = [
  {
    id: 1,
    type: 'workout',
    title: 'Rappel de séance',
    message: 'Votre séance HIIT Cardio commence dans 30 minutes',
    time: '5 min',
    read: false,
    icon: Calendar,
    color: '#EC5300',
    backgroundColor: '#FEF3E7',
  },
  {
    id: 2,
    type: 'community',
    title: 'Nouveau like',
    message: 'Sarah Martin a aimé votre post de transformation',
    time: '1h',
    read: false,
    icon: Heart,
    color: '#EF4444',
    backgroundColor: '#FEF2F2',
    avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: 3,
    type: 'achievement',
    title: 'Objectif atteint!',
    message: 'Félicitations! Vous avez complété 5 séances cette semaine',
    time: '2h',
    read: true,
    icon: Trophy,
    color: '#F59E0B',
    backgroundColor: '#FFFBEB',
  },
  {
    id: 4,
    type: 'community',
    title: 'Nouveau commentaire',
    message: 'Coach Alexandre a commenté votre question sur la nutrition',
    time: '3h',
    read: true,
    icon: MessageCircle,
    color: '#3B82F6',
    backgroundColor: '#EFF6FF',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: 5,
    type: 'program',
    title: 'Nouveau programme disponible',
    message: 'Le programme "Yoga Avancé" est maintenant disponible',
    time: '1j',
    read: true,
    icon: Bell,
    color: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  {
    id: 6,
    type: 'community',
    title: 'Nouveau membre',
    message: 'Emma Dubois a rejoint votre groupe Bootcamp Minceur',
    time: '2j',
    read: true,
    icon: Users,
    color: '#8B5CF6',
    backgroundColor: '#F5F3FF',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
];

export default function NotificationsScreen() {
  const [notificationList, setNotificationList] = useState(notifications);

  const handleBack = () => {
    router.back();
  };

  const handleNotificationPress = (notification: any) => {
    // Mark as read
    setNotificationList(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );

    // Navigate based on notification type
    switch (notification.type) {
      case 'workout':
        router.push('/workout/1');
        break;
      case 'community':
        router.push('/community');
        break;
      case 'achievement':
        router.push('/activity');
        break;
      case 'program':
        router.push('/programs');
        break;
      default:
        break;
    }
  };

  const unreadCount = notificationList.filter(n => !n.read).length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.headerRight}>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{unreadCount}</Text>
            </View>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Today Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aujourd'hui</Text>
          {notificationList
            .filter(n => n.time.includes('min') || n.time.includes('h'))
            .map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[styles.notificationCard, !notification.read && styles.unreadCard]}
                onPress={() => handleNotificationPress(notification)}
              >
                <View style={styles.notificationLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: notification.backgroundColor }]}>
                    {notification.avatar ? (
                      <Image source={{ uri: notification.avatar }} style={styles.avatar} />
                    ) : (
                      <notification.icon size={20} color={notification.color} />
                    )}
                  </View>
                  <View style={styles.notificationContent}>
                    <Text style={[styles.notificationTitle, !notification.read && styles.unreadTitle]}>
                      {notification.title}
                    </Text>
                    <Text style={styles.notificationMessage}>{notification.message}</Text>
                  </View>
                </View>
                <View style={styles.notificationRight}>
                  <Text style={styles.notificationTime}>{notification.time}</Text>
                  {!notification.read && <View style={styles.unreadDot} />}
                </View>
              </TouchableOpacity>
            ))}
        </View>

        {/* Earlier Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plus tôt</Text>
          {notificationList
            .filter(n => n.time.includes('j'))
            .map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[styles.notificationCard, !notification.read && styles.unreadCard]}
                onPress={() => handleNotificationPress(notification)}
              >
                <View style={styles.notificationLeft}>
                  <View style={[styles.iconContainer, { backgroundColor: notification.backgroundColor }]}>
                    {notification.avatar ? (
                      <Image source={{ uri: notification.avatar }} style={styles.avatar} />
                    ) : (
                      <notification.icon size={20} color={notification.color} />
                    )}
                  </View>
                  <View style={styles.notificationContent}>
                    <Text style={[styles.notificationTitle, !notification.read && styles.unreadTitle]}>
                      {notification.title}
                    </Text>
                    <Text style={styles.notificationMessage}>{notification.message}</Text>
                  </View>
                </View>
                <View style={styles.notificationRight}>
                  <Text style={styles.notificationTime}>{notification.time}</Text>
                  {!notification.read && <View style={styles.unreadDot} />}
                </View>
              </TouchableOpacity>
            ))}
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
    alignItems: 'center',
  },
  unreadBadge: {
    backgroundColor: '#EC5300',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  unreadCount: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 16,
  },
  notificationCard: {
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
  unreadCard: {
    backgroundColor: '#FEFEFE',
    borderLeftWidth: 3,
    borderLeftColor: '#EC5300',
  },
  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  unreadTitle: {
    fontFamily: 'Inter-Bold',
  },
  notificationMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  notificationRight: {
    alignItems: 'flex-end',
  },
  notificationTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    marginBottom: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EC5300',
  },
});