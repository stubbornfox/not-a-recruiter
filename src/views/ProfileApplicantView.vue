<template>
  <div class="flex flex-col lg:p-6 p-4 gap-6">
    <div class="flex flex-col gap-4">
      <p class="text-neutrals-100 text-lg font-semibold">Personal Info</p>
      <dl class="grid grid-cols-2 gap-4 justify-between">
        <div>
          <dt>Full Name</dt>
          <dd class="text-neutrals-100 font-medium">{{profile.name}}</dd>
        </div>
        <div>
          <dt>Gender</dt>
          <dd class="text-neutrals-100 font-medium">{{profile.gender}}</dd>
        </div>
        <div>
          <dt>Date of Birth</dt>
          <dd class="text-neutrals-100 font-medium">{{profile.dob}}</dd>
        </div>
        <div>
          <dt>Language</dt>
          <dd class="text-neutrals-100 font-medium">{{profile.language}}</dd>
        </div>
        <div class="max-w-xs">
          <dt>Address</dt>
          <dd class="text-neutrals-100 font-medium">{{profile.address}}</dd>
        </div>
      </dl>
    </div>
    <hr>
    <div class="flex flex-col gap-4">
      <p class="text-neutrals-100 text-lg font-semibold">Professional Info</p>
      <dl>
        <dt>About me</dt>
        <dd class="text-neutrals-100 font-medium">{{profile.about_me}}</dd>
      </dl>
      <dl class="grid grid-cols-2 gap-4 justify-between">
        <div>
          <dt>Current Job</dt>
          <dd class="text-neutrals-100 font-medium">{{profile.job}}</dd>
        </div>
        <div>
          <dt>Experience in Years</dt>
          <dd class="text-neutrals-100 font-medium">{{profile.experiences}}</dd>
        </div>
        <div>
          <dt>Highest Qualification Held</dt>
          <dd class="text-neutrals-100 font-medium">{{profile.highest_qualification_held}}</dd>
        </div>
        <div>
          <dt>Skill set</dt>
          <dd class="text-neutrals-100 font-medium flex gap-1">
           <span v-for="skill in profile.skill_set" class="py-1 px-4 bg-neutrals-10i text-primary">{{skill}}</span>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>
<script setup>
const tmp = {
  name: 'Jeromo Bell',
  gender: 'Male',
  dob: 'March 23, 1995 (26 y.o) ',
  language: 'English, French, Bahasa',
  address: '4517 Washington Ave. Manchester, Kentucky 39495',
  about_me: 'For 10 years, I’ve specialised in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups.',
  highest_qualification_held: 'Bachelors in Engineering',
  skill_set: ['HTML', 'CSS'],
  job: 'Designer',
  experiences: '4 Years',
}
const props = defineProps({
  applicant: {
    type: Object,
    default: () => {}
  }
});
const profile = { ...tmp, ...props.applicant}
</script>
