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
import { ArrowLeft, Check, CreditCard, Calendar, Users, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';

const subscriptionPlans = [
  {
    id: 'monthly',
    name: 'Mensuel',
    price: 39,
    period: 'mois',
    savings: 0,
    popular: false,
  },
  {
    id: 'quarterly',
    name: 'Trimestriel',
    price: 99,
    period: '3 mois',
    savings: 18,
    popular: true,
  },
  {
    id: 'yearly',
    name: 'Annuel',
    price: 299,
    period: 'an',
    savings: 169,
    popular: false,
  },
];

const programData = {
  1: {
    id: 1,
    title: 'Bootcamp Minceur',
    description: 'Programme intensif de 8 semaines pour une perte de poids rapide et durable.',
    image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=500',
    coach: {
      name: 'Coach Alexandre',
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 4.9,
    },
    features: [
      'Plan d\'entraînement personnalisé',
      'Suivi nutritionnel inclus',
      'Sessions de groupe 3x/semaine',
      'Accès à l\'app mobile',
      'Support coach 7j/7',
      'Communauté privée',
      'Recettes exclusives',
      'Suivi des progrès en temps réel',
    ],
    participants: 156,
    rating: 4.8,
  },
};

export default function SubscribeProgramScreen() {
  const { id } = useLocalSearchParams();
  const [selectedPlan, setSelectedPlan] = useState('quarterly');
  
  const program = programData[id as string] || programData[1];

  const handleBack = () => {
    router.back();
  };

  const handleSubscribe = () => {
    router.push('/payment-method');
  };

  const getMonthlyPrice = (plan: any) => {
    if (plan.id === 'monthly') return plan.price;
    if (plan.id === 'quarterly') return Math.round(plan.price / 3);
    if (plan.id === 'yearly') return Math.round(plan.price / 12);
    return plan.price;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>S'abonner</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Program Info */}
        <View style={styles.programSection}>
          <Image source={{ uri: program.image }} style={styles.programImage} />
          <View style={styles.programInfo}>
            <Text style={styles.programTitle}>{program.title}</Text>
            <Text style={styles.programDescription}>{program.description}</Text>
            
            <View style={styles.programStats}>
              <View style={styles.statItem}>
                <Users size={16} color="#EC5300" />
                <Text style={styles.statText}>{program.participants} inscrits</Text>
              </View>
              <View style={styles.statItem}>
                <Star size={16} color="#FCD34D" fill="#FCD34D" />
                <Text style={styles.statText}>{program.rating}</Text>
              </View>
            </View>

            <View style={styles.coachInfo}>
              <Image source={{ uri: program.coach.avatar }} style={styles.coachAvatar} />
              <View>
                <Text style={styles.coachName}>{program.coach.name}</Text>
                <View style={styles.coachRating}>
                  <Star size={12} color="#FCD34D" fill="#FCD34D" />
                  <Text style={styles.coachRatingText}>{program.coach.rating}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Subscription Plans */}
        <View style={styles.plansSection}>
          <Text style={styles.sectionTitle}>Choisissez votre abonnement</Text>
          
          {subscriptionPlans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                selectedPlan === plan.id && styles.planCardSelected,
                plan.popular && styles.planCardPopular,
              ]}
              onPress={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>Le plus populaire</Text>
                </View>
              )}
              
              <View style={styles.planHeader}>
                <View style={styles.planInfo}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <View style={styles.planPricing}>
                    <Text style={styles.planPrice}>{plan.price}€</Text>
                    <Text style={styles.planPeriod}>/{plan.period}</Text>
                  </View>
                  {plan.savings > 0 && (
                    <Text style={styles.planSavings}>
                      Économisez {plan.savings}€
                    </Text>
                  )}
                  <Text style={styles.planMonthly}>
                    {getMonthlyPrice(plan)}€/mois
                  </Text>
                </View>
                
                <View style={[styles.radio, selectedPlan === plan.id && styles.radioSelected]}>
                  {selectedPlan === plan.id && <Check size={16} color="#FFFFFF" />}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Ce qui est inclus</Text>
          {program.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Check size={16} color="#10B981" />
              </View>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Payment Info */}
        <View style={styles.paymentInfo}>
          <View style={styles.paymentHeader}>
            <CreditCard size={20} color="#EC5300" />
            <Text style={styles.paymentTitle}>Informations de paiement</Text>
          </View>
          <Text style={styles.paymentText}>
            • Paiement sécurisé par carte bancaire{'\n'}
            • Résiliation possible à tout moment{'\n'}
            • Remboursement sous 7 jours si non satisfait{'\n'}
            • Renouvellement automatique
          </Text>
        </View>

        {/* Trial Info */}
        <View style={styles.trialInfo}>
          <Text style={styles.trialTitle}>🎉 Essai gratuit de 7 jours</Text>
          <Text style={styles.trialText}>
            Commencez votre transformation dès aujourd'hui. Aucun engagement, résiliez quand vous voulez.
          </Text>
        </View>
      </ScrollView>

      {/* Subscribe Button */}
      <View style={styles.bottomSection}>
        <View style={styles.priceInfo}>
          <Text style={styles.totalLabel}>
            {subscriptionPlans.find(p => p.id === selectedPlan)?.name}
          </Text>
          <Text style={styles.totalPrice}>
            {subscriptionPlans.find(p => p.id === selectedPlan)?.price}€
          </Text>
        </View>
        <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
          <LinearGradient
            colors={['#EC5300', '#FF6B35']}
            style={styles.subscribeButtonGradient}
          >
            <Text style={styles.subscribeButtonText}>
              Commencer l'essai gratuit
            </Text>
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
  programSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  programImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 16,
  },
  programInfo: {
    gap: 12,
  },
  programTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  programDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 24,
  },
  programStats: {
    flexDirection: 'row',
    gap: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  coachInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  coachAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  coachName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 2,
  },
  coachRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  coachRatingText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  plansSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 16,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    position: 'relative',
  },
  planCardSelected: {
    borderColor: '#EC5300',
    backgroundColor: '#FEF3E7',
  },
  planCardPopular: {
    borderColor: '#F59E0B',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    left: 20,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  planHeader: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  planPricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#EC5300',
  },
  planPeriod: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  planSavings: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
    marginBottom: 4,
  },
  planMonthly: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#EC5300',
    backgroundColor: '#EC5300',
  },
  featuresSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    flex: 1,
  },
  paymentInfo: {
    backgroundColor: '#F9FAFB',
    margin: 20,
    borderRadius: 12,
    padding: 16,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginLeft: 8,
  },
  paymentText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  trialInfo: {
    backgroundColor: '#FEF3E7',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    marginBottom: 120,
  },
  trialTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#EA580C',
    marginBottom: 8,
  },
  trialText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9A3412',
    lineHeight: 20,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  priceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  totalPrice: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#EC5300',
  },
  subscribeButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  subscribeButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  subscribeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});