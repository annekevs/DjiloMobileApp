import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CircleCheck as CheckCircle, Package, Truck, Chrome as Home } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function OrderSuccessScreen() {
  const orderNumber = 'CMD-2024-001234';
  const estimatedDelivery = '25-27 janvier 2024';

  const handleTrackOrder = () => {
    console.log('Tracking order:', orderNumber);
  };

  const handleGoHome = () => {
    router.push('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <CheckCircle size={80} color="#10B981" />
        
        {/* Title */}
        <Text style={styles.title}>Commande confirmée !</Text>
        <Text style={styles.subtitle}>
          Merci pour votre achat. Votre commande a été traitée avec succès.
        </Text>

        {/* Order Details */}
        <View style={styles.orderCard}>
          <Text style={styles.orderTitle}>Détails de la commande</Text>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Numéro de commande :</Text>
            <Text style={styles.orderValue}>{orderNumber}</Text>
          </View>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Total :</Text>
            <Text style={styles.orderValue}>235.98€</Text>
          </View>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Livraison estimée :</Text>
            <Text style={styles.orderValue}>{estimatedDelivery}</Text>
          </View>
        </View>

        {/* Next Steps */}
        <View style={styles.stepsCard}>
          <Text style={styles.stepsTitle}>Prochaines étapes</Text>
          
          <View style={styles.step}>
            <View style={styles.stepIcon}>
              <Package size={20} color="#EC5300" />
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>Préparation</Text>
              <Text style={styles.stepText}>Votre commande est en cours de préparation</Text>
            </View>
          </View>
          
          <View style={styles.step}>
            <View style={styles.stepIcon}>
              <Truck size={20} color="#9CA3AF" />
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>Expédition</Text>
              <Text style={styles.stepText}>Vous recevrez un email de suivi</Text>
            </View>
          </View>
        </View>

        {/* Email Confirmation */}
        <View style={styles.emailInfo}>
          <Text style={styles.emailText}>
            Un email de confirmation a été envoyé à votre adresse email avec tous les détails de votre commande.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.trackButton} onPress={handleTrackOrder}>
            <Package size={20} color="#EC5300" />
            <Text style={styles.trackButtonText}>Suivre ma commande</Text>
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
  orderCard: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  orderTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 16,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  orderLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  orderValue: {
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
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3E7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  stepText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  emailInfo: {
    width: '100%',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  emailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E40AF',
    textAlign: 'center',
    lineHeight: 20,
  },
  actionButtons: {
    width: '100%',
    marginBottom: 24,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF3E7',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  trackButtonText: {
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