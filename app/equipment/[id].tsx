import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Star,
  Heart,
  Share,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

const equipmentData = {
  1: {
    id: 1,
    name: 'Haltères Ajustables PowerFlex Pro',
    brand: 'PowerFlex',
    price: 189.99,
    originalPrice: 249.99,
    discount: 24,
    rating: 4.8,
    reviews: 324,
    inStock: true,
    images: [
      'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4162481/pexels-photo-4162481.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description:
      "Haltères ajustables de qualité professionnelle avec système de verrouillage rapide. Parfaits pour l'entraînement à domicile, ils remplacent un rack complet d'haltères traditionnels.",
    features: [
      'Poids ajustable de 2,5kg à 25kg par haltère',
      'Système de verrouillage rapide et sécurisé',
      'Poignées ergonomiques antidérapantes',
      'Plaques en fonte avec revêtement caoutchouc',
      'Support de rangement inclus',
      'Garantie 5 ans',
    ],
    specifications: {
      'Poids total': '50kg (2 x 25kg)',
      Matériau: 'Fonte avec revêtement caoutchouc',
      Dimensions: '40 x 20 x 20 cm',
      Garantie: '5 ans',
      Certification: 'CE, ISO 9001',
    },
    shipping: {
      free: true,
      estimatedDays: '2-3 jours ouvrés',
      express: '24h (9,99€)',
    },
    reviews_list: [
      {
        id: 1,
        name: 'Marc D.',
        rating: 5,
        comment: 'Excellent produit ! Très pratique et gain de place énorme.',
        date: '2 semaines',
        verified: true,
      },
      {
        id: 2,
        name: 'Sophie L.',
        rating: 5,
        comment: 'Qualité au top, système de verrouillage très sûr.',
        date: '1 mois',
        verified: true,
      },
      {
        id: 3,
        name: 'Thomas K.',
        rating: 4,
        comment: 'Bon rapport qualité-prix, livraison rapide.',
        date: '3 semaines',
        verified: true,
      },
    ],
  },
};

export default function EquipmentDetailScreen() {
  const { id } = useLocalSearchParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const equipment = equipmentData[1];

  const handleBack = () => {
    router.back();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    console.log('Sharing equipment:', equipment.name);
  };

  const handleAddToCart = () => {
    router.push('/cart');
  };

  const handleBuyNow = () => {
    router.push('/checkout');
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Images */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / width
              );
              setSelectedImageIndex(index);
            }}
          >
            {equipment.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.headerImage}
              />
            ))}
          </ScrollView>

          {/* Header Controls */}
          <View style={styles.headerControls}>
            <TouchableOpacity style={styles.controlButton} onPress={handleBack}>
              <ArrowLeft size={24} color="#111827" />
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={handleLike}
              >
                <Heart
                  size={24}
                  color={isLiked ? '#EC5300' : '#111827'}
                  fill={isLiked ? '#EC5300' : 'transparent'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={handleShare}
              >
                <Share size={24} color="#111827" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Image Indicators */}
          <View style={styles.imageIndicators}>
            {equipment.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  selectedImageIndex === index && styles.indicatorActive,
                ]}
              />
            ))}
          </View>

          {/* Discount Badge */}
          {equipment.discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{equipment.discount}%</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title and Rating */}
          <View style={styles.titleSection}>
            <Text style={styles.brand}>{equipment.brand}</Text>
            <Text style={styles.title}>{equipment.name}</Text>
            <View style={styles.ratingRow}>
              <View style={styles.rating}>
                <Star size={16} color="#FCD34D" fill="#FCD34D" />
                <Text style={styles.ratingText}>{equipment.rating}</Text>
                <Text style={styles.reviewsText}>
                  ({equipment.reviews} avis)
                </Text>
              </View>
              <View
                style={[
                  styles.stockBadge,
                  !equipment.inStock && styles.outOfStock,
                ]}
              >
                <Text
                  style={[
                    styles.stockText,
                    !equipment.inStock && styles.outOfStockText,
                  ]}
                >
                  {equipment.inStock ? 'En stock' : 'Rupture de stock'}
                </Text>
              </View>
            </View>
          </View>

          {/* Price */}
          <View style={styles.priceSection}>
            <View style={styles.priceRow}>
              <Text style={styles.currentPrice}>
                {equipment.price.toFixed(2)}€
              </Text>
              {equipment.originalPrice > equipment.price && (
                <Text style={styles.originalPrice}>
                  {equipment.originalPrice.toFixed(2)}€
                </Text>
              )}
            </View>
            <Text style={styles.savings}>
              Vous économisez{' '}
              {(equipment.originalPrice - equipment.price).toFixed(2)}€
            </Text>
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Quantité</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Text
                  style={[
                    styles.quantityButtonText,
                    quantity <= 1 && styles.quantityButtonDisabled,
                  ]}
                >
                  -
                </Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={increaseQuantity}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Shipping Info */}
          <View style={styles.shippingSection}>
            <View style={styles.shippingItem}>
              <Truck size={20} color="#10B981" />
              <View style={styles.shippingInfo}>
                <Text style={styles.shippingTitle}>Livraison gratuite</Text>
                <Text style={styles.shippingText}>
                  {equipment.shipping.estimatedDays}
                </Text>
              </View>
            </View>
            <View style={styles.shippingItem}>
              <Shield size={20} color="#3B82F6" />
              <View style={styles.shippingInfo}>
                <Text style={styles.shippingTitle}>
                  Garantie {equipment.specifications.Garantie}
                </Text>
                <Text style={styles.shippingText}>Retour gratuit 30 jours</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{equipment.description}</Text>
          </View>

          {/* Features */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Caractéristiques</Text>
            {equipment.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureCheck}>✓</Text>
                </View>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* Specifications */}
          <View style={styles.specificationsSection}>
            <Text style={styles.sectionTitle}>Spécifications techniques</Text>
            {Object.entries(equipment.specifications).map(([key, value]) => (
              <View key={key} style={styles.specItem}>
                <Text style={styles.specKey}>{key}</Text>
                <Text style={styles.specValue}>{value}</Text>
              </View>
            ))}
          </View>

          {/* Reviews */}
          <View style={styles.reviewsSection}>
            <Text style={styles.sectionTitle}>Avis clients</Text>
            {equipment.reviews_list.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewName}>{review.name}</Text>
                  <View style={styles.reviewRating}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={12} color="#FCD34D" fill="#FCD34D" />
                    ))}
                  </View>
                  {review.verified && (
                    <Text style={styles.verifiedText}>Achat vérifié</Text>
                  )}
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
                <Text style={styles.reviewDate}>Il y a {review.date}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomSection}>
        <View style={styles.priceInfo}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>
            {(equipment.price * quantity).toFixed(2)}€
          </Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
            <ShoppingCart size={20} color="#EC5300" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
            <LinearGradient
              colors={['#EC5300', '#FF6B35']}
              style={styles.buyButtonGradient}
            >
              <Text style={styles.buyButtonText}>Acheter maintenant</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  headerImage: {
    width: width,
    height: 300,
  },
  headerControls: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  indicatorActive: {
    backgroundColor: '#FFFFFF',
  },
  discountBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  discountText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 20,
  },
  brand: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#EC5300',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginLeft: 6,
  },
  reviewsText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 6,
  },
  stockBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  outOfStock: {
    backgroundColor: '#FEF2F2',
  },
  stockText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#059669',
  },
  outOfStockText: {
    color: '#DC2626',
  },
  priceSection: {
    marginBottom: 24,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  currentPrice: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#EC5300',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  savings: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#059669',
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#111827',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  quantityButtonDisabled: {
    color: '#9CA3AF',
  },
  quantityText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#111827',
    marginHorizontal: 16,
  },
  shippingSection: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  shippingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  shippingInfo: {
    marginLeft: 12,
    flex: 1,
  },
  shippingTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#111827',
    marginBottom: 2,
  },
  shippingText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 24,
  },
  featuresSection: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureCheck: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#059669',
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    flex: 1,
  },
  specificationsSection: {
    marginBottom: 24,
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  specKey: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  specValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  reviewsSection: {
    marginBottom: 120,
  },
  reviewCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewName: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginRight: 8,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  verifiedText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: '#059669',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  reviewComment: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#111827',
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
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
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  totalPrice: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#EC5300',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cartButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FEF3E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buyButtonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  buyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});
