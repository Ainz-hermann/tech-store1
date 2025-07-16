import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { ShoppingCart, Heart, Package } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  message: string;
  buttonText: string;
  buttonLink: string;
  icon: 'shopping-cart' | 'heart' | 'package';
}

export function EmptyState({ title, message, buttonText, buttonLink, icon }: EmptyStateProps) {
  const renderIcon = () => {
    const size = 64;
    const color = colors.gray[300];
    
    switch (icon) {
      case 'shopping-cart':
        return <ShoppingCart size={size} color={color} />;
      case 'heart':
        return <Heart size={size} color={color} />;
      case 'package':
        return <Package size={size} color={color} />;
      default:
        return <ShoppingCart size={size} color={color} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <Link href={buttonLink} asChild>
        <Button title={buttonText} style={styles.button} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    ...typography.h3,
    marginBottom: 8,
  },
  message: {
    ...typography.body1,
    textAlign: 'center',
    color: colors.gray[500],
    marginBottom: 32,
  },
  button: {
    width: '100%',
  },
});