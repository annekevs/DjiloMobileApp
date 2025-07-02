import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircleCheck as CheckCircle, Chrome as Home, Users } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function TestimonialSuccessScreen() {
  const handleGoHome = () => {
    router.push('/(tabs)');
  };

  const handleViewCommunity = () => {
    router.push('/(tabs)/community');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <CheckCircle size={80} color="#10B981" />
        
        {/* Title */}
        <Text style={styles.title}>Témoignage publié !</Text>
        <Text style={styles.subtitle}>
          Merci d'avoir partagé votre expérience. Votre témoignage aidera d'autres membres de la communauté.
        </Text>

        {/* Benefits */}
        <View style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>Votre témoignage va :</Text>
          <Text style={styles.benefitsText}>
            • Inspirer d'autres membres{'\n'}
            • Aider les nouveaux utilisateurs{'\n'}
            • Améliorer nos programmes{'\n'}
            • Renforcer la communauté
          </Text>
        </View>

        {/* Reward Info */}
        <View style={styles.rewardCard}>
          <Text style={styles.rewardTitle}>🎉 Récompense débloquée !</Text>
          <Text style={styles.rewardText}>
            Vous avez gagné 50 points pour votre témoignage. Continuez à partager pour débloquer plus de récompenses !
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.communityButton} onPress={handleViewCommunity}>
            <Users size={20} color="#EC5300" />
            <Text style={styles.communityButtonText}>Voir la communauté</Text>
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
  benefitsCard: {
    width: '100%',
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  benefitsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#059669',
    marginBottom: 12,
  },
  benefitsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#065F46',
    lineHeight: 20,
  },
  rewardCard: {
    width: '100%',
    backgroundColor: '#FEF3E7',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  rewardTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#EA580C',
    marginBottom: 8,
  },
  rewardText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9A3412',
    lineHeight: 20,
  },
  actionButtons: {
    width: '100%',
    marginBottom: 24,
  },
  communityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF3E7',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  communityButtonText: {
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