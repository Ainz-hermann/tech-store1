import { TouchableOpacity, StyleSheet } from 'react-native';
import { SlidersHorizontal } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface FilterButtonProps {
  onPress: () => void;
}

export function FilterButton({ onPress }: FilterButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <SlidersHorizontal size={20} color={colors.primary[600]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});