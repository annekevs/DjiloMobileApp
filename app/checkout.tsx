import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard, MapPin, Truck, Shield } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function CheckoutScreen() {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleBack = () => {
    router.back();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = () => {
    router.push('/order-success');
  };

  const orderTotal = 235.98;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.title}>Commande</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations de contact</Text>
          <TextInput
            style={styles.input}
            placeholder="Adresse email"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Shipping Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={20} color="#EC5300" />
            <Text style={styles.sectionTitle}>Adresse de livraison</Text>
          </View>
          <View style={styles.nameRow}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Prénom"
              value={formData.firstName}
              onChangeText={(value) => handleInputChange('firstName', value)}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Nom"
              value={formData.lastName}
              onChangeText={(value) => handleInputChange('lastName', value)}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Adresse"
            value={formData.address}
            onChangeText={(value) => handleInputChange('address', value)}
          />
          <View style={styles.nameRow}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Ville"
              value={formData.city}
              onChangeText={(value) => handleInputChange('city', value)}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Code postal"
              value={formData.postalCode}
              onChangeText={(value) => handleInputChange('postalCode', value)}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Shipping Method */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Truck size={20} color="#EC5300" />
            <Text style={styles.sectionTitle}>Mode de livraison</Text>
          </View>
          <View style={styles.shippingOption}>
            <View style={styles.shippingInfo}>
              <Text style={styles.shippingTitle}>Livraison standard</Text>
              <Text style={styles.shippingTime}>2-3 jours ouvrés</Text>
            </View>
            <Text style={styles.shippingPrice}>Gratuite</Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CreditCard size={20} color="#EC5300" />
            <Text style={styles.sectionTitle}>Mode de paiement</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.paymentOption, selectedPayment === 'card' && styles.paymentOptionSelected]}
            onPress={() => setSelectedPayment('card')}
          >
            <View style={styles.paymentInfo}>
              <CreditCard size={20} color="#6B7280" />
              <Text style={styles.paymentText}>Carte bancaire</Text>
            </View>
            <View style={[styles.radio, selectedPayment === 'card' && styles.radioSelected]} />
          </TouchableOpacity>

          {selectedPayment === 'card' && (
            <View style={styles.cardForm}>
              <TextInput
                style={styles.input}
                placeholder="Numéro de carte"
                value={formData.cardNumber}
                onChangeText={(value) => handleInputChange('cardNumber', value)}
                keyboardType="numeric"
              />
              <View style={styles.nameRow}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="MM/AA"
                  value={formData.expiryDate}
                  onChangeText={(value) => handleInputChange('expiryDate', value)}
                  keyboardType="numeric"
                />
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="CVV"
                  value={formData.cvv}
                  onChangeText={(value) => handleInputChange('cvv', value)}
                  keyboardType="numeric"
                  secureTextEntry
                />
              </View>
            </View>
          )}
        </View>

        {/* Security Info */}
        <View style={styles.securityInfo}>
          <Shield size={16} color="#10B981" />
          <Text style={styles.securityText}>
            Vos informations de paiement sont sécurisées et chiffrées
          </Text>
        </View>

        {/* Order Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Résumé de la commande</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Sous-total</Text>
            <Text style={styles.summaryValue}>235.98€</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Livraison</Text>
            <Text style={styles.summaryValue}>Gratuite</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>TVA</Text>
            <Text style={styles.summaryValue}>47.20€</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{orderTotal.toFixed(2)}€</Text>
          </View>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.orderButton} onPress={handlePlaceOrder}>
          <LinearGradient
            colors={['#EC5300', '#FF6B35']}
            style={styles.orderButtonGradient}
          >
            <Text style={styles.orderButtonText}>
              Finaliser la commande • {orderTotal.toFixed(2)}€
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
    paddingTop: 20,
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
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  shippingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#EC5300',
  },
  shippingInfo: {
    flex: 1,
  },
  shippingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  shippingTime: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  shippingPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  paymentOptionSelected: {
    borderColor: '#EC5300',
    backgroundColor: '#FEF3E7',
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#111827',
    marginLeft: 12,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  radioSelected: {
    borderColor: '#EC5300',
    backgroundColor: '#EC5300',
  },
  cardForm: {
    marginTop: 12,
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  securityText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#059669',
    marginLeft: 8,
    flex: 1,
  },
  summarySection: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 20,
    marginBottom: 100,
  },
  summaryTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#111827',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  totalValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#EC5300',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  orderButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  orderButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  orderButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});