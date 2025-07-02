import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircleCheck as CheckCircle, Calendar, CreditCard, Chrome as Home } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function SubscriptionCheckoutScreen() {
  const handleGoHome = () => {
    router.push('/(tabs)');
  };

  const handleViewProgram = () => {
    router.push('/program/1');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <CheckCircle size={80} color="#10B981" />
        
        {/* Title */}
        <Text style={styles.title}>Abonnement activé !</Text>
        <Text style={styles.subtitle}>
          Bienvenue dans le programme Bootcamp Minceur. Votre transformation commence maintenant !
        </Text>

        {/* Subscription Details */}
        <View style={styles.subscriptionCard}>
          <Text style={styles.subscriptionTitle}>Détails de l'abonnement</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Programme :</Text>
            <Text style={styles.detailValue}>Bootcamp Minceur</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Plan :</Text>
            <Text style={styles.detailValue}>Trimestriel</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Prix :</Text>
            <Text style={styles.detailValue}>99€ / 3 mois</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Essai gratuit :</Text>
            <Text style={styles.detailValue}>7 jours</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Prochain paiement :</Text>
            <Text style={styles.detailValue}>1er février 2024</Text>
          </View>
        </View>

        {/* Next Steps */}
        <View style={styles.stepsCard}>
          <Text style={styles.stepsTitle}>Prochaines étapes</Text>
          
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>
              Complétez votre profil pour un programme personnalisé
            </Text>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>
              Rejoignez la communauté privée du programme
            </Text>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>
              Commencez votre première séance dès aujourd'hui
            </Text>
          </View>
        </View>

        {/* Reminder */}
        <View style={styles.reminderCard}>
          <Text style={styles.reminderTitle}>Rappel important</Text>
          <Text style={styles.reminderText}>
            Vous avez 7 jours d'essai gratuit. Vous pouvez annuler à tout moment depuis votre profil sans frais.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.programButton} onPress={handleViewProgram}>
            <Calendar size={20} color="#EC5300" />
            <Text style={styles.programButtonText}>Voir mon programme</Text>
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
    lineHeight: 24,
  },
  subscriptionCard: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  subscriptionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 16,
  },
  detailRow: {
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
  stepsCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  stepsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EC5300',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  stepText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    flex: 1,
    lineHeight: 20,
  },
  reminderCard: {
    width: '100%',
    backgroundColor: '#FEF3E7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  reminderTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#EA580C',
    marginBottom: 8,
  },
  reminderText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9A3412',
    lineHeight: 20,
  },
  actionButtons: {
    width: '100%',
    marginBottom: 24,
  },
  programButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF3E7',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  programButtonText: {
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