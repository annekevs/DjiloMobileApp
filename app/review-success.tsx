import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircleCheck as CheckCircle, Chrome as Home, MapPin } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function ReviewSuccessScreen() {
  const handleGoHome = () => {
    router.push('/(tabs)');
  };

  const handleViewGyms = () => {
    router.push('/gyms');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <CheckCircle size={80} color="#10B981" />
        
        {/* Title */}
        <Text style={styles.title}>Avis publié !</Text>
        <Text style={styles.subtitle}>
          Merci d'avoir partagé votre avis. Votre retour aidera d'autres membres à choisir leur salle de sport.
        </Text>

        {/* Impact Info */}
        <View style={styles.impactCard}>
          <Text style={styles.impactTitle}>Votre avis compte !</Text>
          <Text style={styles.impactText}>
            • Aide les autres à faire le bon choix{'\n'}
            • Encourage les salles à s'améliorer{'\n'}
            • Renforce la communauté fitness{'\n'}
            • Partage votre expérience authentique
          </Text>
        </View>

        {/* Reward Info */}
        <View style={styles.rewardCard}>
          <Text style={styles.rewardTitle}>🏆 Points gagnés !</Text>
          <Text style={styles.rewardText}>
            +25 points pour votre avis détaillé ! Continuez à partager vos expériences pour gagner plus de récompenses.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.gymsButton} onPress={handleViewGyms}>
            <MapPin size={20} color="#EC5300" />
            <Text style={styles.gymsButtonText}>Découvrir d'autres salles</Text>
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
    paddingTop: 80,
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
    lineHeight: 24,
  },
  impactCard: {
    width: '100%',
    backgroundColor: '#F0F9FF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  impactTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#0369A1',
    marginBottom: 12,
  },
  impactText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#0C4A6E',
    lineHeight: 20,
  },
  rewardCard: {
    width: '100%',
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  rewardTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#D97706',
    marginBottom: 8,
  },
  rewardText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#92400E',
    lineHeight: 20,
  },
  actionButtons: {
    width: '100%',
    marginBottom: 24,
  },
  gymsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF3E7',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  gymsButtonText: {
    fontSize: 16,
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