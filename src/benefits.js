import IconFullHealth from '@/components/icons/IconFullHealth.vue';
import IconUnlimitedVacation from '@/components/icons/IconUnlimitedVacation.vue';
import IconSkillDevelopment from '@/components/icons/IconSkillDevelopment.vue';

const defaultBenefits = {
  full_healcare: {
    id: 0,
    icon: IconFullHealth,
    value: 'full_healcare',
    header: 'Full Healthcare',
    description: 'We believe in thriving communities and that starts with our team being happy and healthy.'
  },
  unlimited_vacation: {
    id: 1,
    icon: IconUnlimitedVacation,
    value: 'unlimited_vacation',
    header: 'Unlimited Vacation',
    description: 'We believe you should have a flexible schedule that makes space for family, wellness, and fun.'
  },
  skill_development: {
    id: 2,
    icon: IconSkillDevelopment,
    value: 'skill_development',
    header: 'Skill Development',
    description: "We believe in always learning and leveling up our skills. Whether it's a conference or online course."
  }
}
export default defaultBenefits;
