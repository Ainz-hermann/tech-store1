import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { Video as LucideIcon } from 'lucide-react-native';

interface CategoryPillProps {
  name: string;
  icon: LucideIcon;
  isActive: boolean;
  onPress: () => void;
}

export function CategoryPill({ name, icon: Icon, isActive, onPress }: CategoryPillProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isActive && styles.activeContainer,
      ]}
      onPress={onPress}
    >
      <Icon
        size={16}
        color={isActive ? colors.white : colors.primary[600]}
        style={styles.icon}
      />
      <Text
        style={[
          styles.text,
          isActive && styles.activeText,
        ]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    marginRight: 8,
  },
  activeContainer: {
    backgroundColor: colors.primary[600],
  },
  icon: {
    marginRight: 6,
  },
  text: {
    ...typography.label,
    color: colors.gray[800],
  },
  activeText: {
    color: colors.white,
  },
});