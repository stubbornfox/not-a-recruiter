import IconFullHealth from '@/components/icons/IconFullHealth.vue';
import IconUnlimitedVacation from '@/components/icons/IconUnlimitedVacation.vue';
import IconSkillDevelopment from '@/components/icons/IconSkillDevelopment.vue';
import IconTeamSummits from '@/components/icons/IconTeamSummits.vue';
import IconRemoteWorking from '@/components/icons/IconRemoteWorking.vue';
import IconCommuterBenefits from '@/components/icons/IconCommuterBenefits.vue';
import IconWeGiveBack from '@/components/icons/IconWeGiveBack.vue';

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
  },
  team_summits: {
    id: 3,
    icon: IconTeamSummits,
    value: 'team_summits',
    header: 'Team summits',
    description: 'Every 6 months we have a full team summit where we have fun, reflect, and plan for the upcoming quarter.'
  },
  remote_working: {
    id: 4,
    icon: IconRemoteWorking,
    value: 'remote_working',
    header: 'Remote Working',
    description: 'You know how you perform your best. Work from home, coffee shop or anywhere when you feel like it.'
  },
  commuter_benefit: {
    id: 5,
    icon: IconCommuterBenefits,
    value: 'commuter_benefit',
    header: 'Commuter Benefits',
    description: 'We’re grateful for all the time and energy each team member puts into getting to work every day.'
  },
  we_give_back: {
    id: 6,
    icon: IconWeGiveBack,
    value: 'we_give_back',
    header: 'We give back',
    description: 'We anonymously match any donation our employees make (up to $/€ 600) so they can support the organizations they care about most—times two.'
  },

}
export default defaultBenefits;
