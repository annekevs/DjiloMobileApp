import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard, Calendar, CircleAlert as AlertCircle, CircleCheck as CheckCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const subscriptionData = {
  plan: 'Trimestriel',
  price: '99€',
  period: '3 mois',
  nextBilling: '2024-04-01',
  status: 'active',
  autoRenew: true,
  paymentMethod: {
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expiry: '12/26',
  },
};

const billingHistory = [
  {
    id: 1,
    date: '2024-01-01',
    amount: '99€',
    status: 'paid',
    description: 'Abonnement Trimestriel',
  },
  {
    id: 2,
    date: '2023-10-01',
    amount: '99€',
    status: 'paid',
    description: 'Abonnement Trimestriel',
  },
  {
    id: 3,
    date: '2023-07-01',
    amount: '99€',
    status: 'paid',
    description: 'Abonnement Trimestriel',
  },
];

export default function SubscriptionScreen() {
  const [autoRenew, setAutoRenew] = useState(subscriptionData.autoRenew);

  const handleBack = () => {
    router.back();
  };

  const handleChangePaymentMethod = () => {
    router.push('/payment-method');
  };

  const handleChangePlan = () => {
    router.push('/subscribe-program/1');
  };

  const handleCancelSubscription = () => {
    Alert.alert(
      'Annuler l\'abonnement',
      'Êtes-vous sûr de vouloir annuler votre abonnement ? Vous garderez l\'accès jusqu\'à la fin de votre période de facturation.',
      [
        { text: 'Non', style: 'cancel' },
        { text: 'Oui, annuler', style: 'destructive', onPress: confirmCancellation },
      ]
    );
  };

  const confirmCancellation = () => {
    console.log('Subscription cancelled');
    Alert.alert('Abonnement annulé', 'Votre abonnement sera annulé à la fin de la période en cours.');
  };

  const toggleAutoRenew = () => {
    setAutoRenew(!autoRenew);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Abonnements</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Current Subscription */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Abonnement actuel</Text>
          <View style={styles.subscriptionCard}>
            <LinearGradient
              colors={['#EC5300', '#FF6B35']}
              style={styles.subscriptionGradient}
            >
              <View style={styles.subscriptionHeader}>
                <Text style={styles.subscriptionPlan}>{subscriptionData.plan}</Text>
                <View style={styles.statusBadge}>
                  <CheckCircle size={16} color="#FFFFFF" />
                  <Text style={styles.statusText}>Actif</Text>
                </View>
              </View>
              <Text style={styles.subscriptionPrice}>
                {subscriptionData.price} / {subscriptionData.period}
              </Text>
              <Text style={styles.nextBilling}>
                Prochain prélèvement : {formatDate(subscriptionData.nextBilling)}
              </Text>
            </LinearGradient>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mode de paiement</Text>
          <TouchableOpacity style={styles.paymentCard} onPress={handleChangePaymentMethod}>
            <View style={styles.paymentLeft}>
              <View style={styles.paymentIcon}>
                <CreditCard size={24} color="#EC5300" />
              </View>
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentMethod}>
                  {subscriptionData.paymentMethod.brand} •••• {subscriptionData.paymentMethod.last4}
                </Text>
                <Text style={styles.paymentExpiry}>
                  Expire le {subscriptionData.paymentMethod.expiry}
                </Text>
              </View>
            </View>
            <Text style={styles.changeText}>Modifier</Text>
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres</Text>
          
          <View style={styles.settingCard}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Renouvellement automatique</Text>
              <Text style={styles.settingDescription}>
                Votre abonnement sera renouvelé automatiquement
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.toggle, autoRenew && styles.toggleActive]}
              onPress={toggleAutoRenew}
            >
              <View style={[styles.toggleThumb, autoRenew && styles.toggleThumbActive]} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.actionButton} onPress={handleChangePlan}>
            <Text style={styles.actionButtonText}>Changer de plan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelSubscription}>
            <AlertCircle size={20} color="#EF4444" />
            <Text style={styles.cancelButtonText}>Annuler l'abonnement</Text>
          </TouchableOpacity>
        </View>

        {/* Billing History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historique de facturation</Text>
          {billingHistory.map((bill) => (
            <View key={bill.id} style={styles.billCard}>
              <View style={styles.billLeft}>
                <Text style={styles.billDescription}>{bill.description}</Text>
                <Text style={styles.billDate}>{formatDate(bill.date)}</Text>
              </View>
              <View style={styles.billRight}>
                <Text style={styles.billAmount}>{bill.amount}</Text>
                <View style={styles.billStatus}>
                  <CheckCircle size={12} color="#10B981" />
                  <Text style={styles.billStatusText}>Payé</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Help */}
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Besoin d'aide ?</Text>
          <Text style={styles.helpText}>
            Contactez notre support client pour toute question concernant votre abonnement.
          </Text>
          <TouchableOpacity style={styles.helpButton}>
            <Text style={styles.helpButtonText}>Contacter le support</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 16,
  },
  subscriptionCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  subscriptionGradient: {
    padding: 20,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subscriptionPlan: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  subscriptionPrice: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  nextBilling: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3E7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentMethod: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  paymentExpiry: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  changeText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#EC5300',
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#EC5300',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  actionButton: {
    backgroundColor: '#FEF3E7',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#EC5300',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
  },
  billCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  billLeft: {
    flex: 1,
  },
  billDescription: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  billDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  billRight: {
    alignItems: 'flex-end',
  },
  billAmount: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  billStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  billStatusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
  },
  helpSection: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
  },
  helpTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#0369A1',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#0C4A6E',
    marginBottom: 16,
    lineHeight: 20,
  },
  helpButton: {
    backgroundColor: '#0369A1',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  helpButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});