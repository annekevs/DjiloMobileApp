import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircleCheck as CheckCircle, Calendar, MapPin, Chrome as Home } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function SessionConfirmedScreen() {
  const handleGoHome = () => {
    router.push('/(tabs)');
  };

  const handleAddToCalendar = () => {
    console.log('Adding to calendar');
  };

  const handleViewLocation = () => {
    console.log('Opening location');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <CheckCircle size={80} color="#10B981" />
        
        {/* Title */}
        <Text style={styles.title}>Inscription confirmée !</Text>
        <Text style={styles.subtitle}>
          Vous êtes inscrit(e) à la séance Bootcamp Minceur
        </Text>

        {/* Session Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.sessionTitle}>Bootcamp Minceur - Session Intensive</Text>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Date :</Text>
            <Text style={styles.detailValue}>Jeudi 25 janvier</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Heure :</Text>
            <Text style={styles.detailValue}>18h30 - 19h30</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Lieu :</Text>
            <Text style={styles.detailValue}>FitZone Center - Salle 2</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Coach :</Text>
            <Text style={styles.detailValue}>Coach Alexandre</Text>
          </View>
        </View>

        {/* Reminder */}
        <View style={styles.reminderCard}>
          <Text style={styles.reminderTitle}>N'oubliez pas !</Text>
          <Text style={styles.reminderText}>
            • Arrivez 10 minutes avant le début{'\n'}
            • Apportez une serviette et une bouteille d'eau{'\n'}
            • Portez des vêtements de sport confortables
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.calendarButton} onPress={handleAddToCalendar}>
            <Calendar size={20} color="#EC5300" />
            <Text style={styles.calendarButtonText}>Ajouter au calendrier</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.locationButton} onPress={handleViewLocation}>
            <MapPin size={20} color="#EC5300" />
            <Text style={styles.locationButtonText}>Voir l'itinéraire</Text>
          </TouchableOpacity>
        </View>

        {/* Home Button */}
        <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
          <LinearGradient
            colors={['#EC5300', '#FF6B35']}
            style={styles.homeButtonGradient}
          >
            <Home size={20} color="#FFFFFF" />
            <Text style={styles.homeButtonText}>Retour à l'accueil</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  detailsCard: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  sessionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  reminderCard: {
    width: '100%',
    backgroundColor: '#FEF3E7',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  reminderTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#EA580C',
    marginBottom: 12,
  },
  reminderText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9A3412',
    lineHeight: 20,
  },
  actionButtons: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  calendarButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF3E7',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  calendarButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#EC5300',
  },
  locationButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF3E7',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  locationButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#EC5300',
  },
  homeButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  homeButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  homeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});