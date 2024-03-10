<template>
  <Card class="w-[650px] grow p-8">
    <OrganizationTest />
    <form @submit="onSubmit" class="flex flex-col gap-3">
      <div class="grid grid-cols-2 gap-2">
        <FormField v-slot="{ componentField }" name="organization_name">
          <FormItem>
            <FormLabel>Organization Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Organization Name" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="industry">
          <FormItem>
            <FormLabel>Industry</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Industry" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>
      </div>
      <FormField v-slot="{ componentField }" name="country">
        <FormItem>
          <FormLabel>Country</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Country" v-bind="componentField" />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="street_address">
        <FormItem>
          <FormLabel>Street Address</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Street Address" v-bind="componentField" />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="city">
        <FormItem>
          <FormLabel>City</FormLabel>
          <FormControl>
            <Input type="text" placeholder="City" v-bind="componentField" />
          </FormControl>
        </FormItem>
      </FormField>
      <div class="grid grid-cols-2 gap-2">
        <FormField v-slot="{ componentField }" name="postal_code">
          <FormItem>
            <FormLabel>Postal Code</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Postal Code" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="administrative_division">
          <FormItem>
            <FormLabel>State/Province/Region</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Administrative Division" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <FormField v-slot="{ componentField }" name="organization_contact">
          <FormItem>
            <FormLabel>Organization Contact</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Organization Contact" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="organization_email">
          <FormItem>
            <FormLabel>Organization Email</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Organization Email" v-bind="componentField" />
            </FormControl>
          </FormItem>
        </FormField>
      </div>
      <Button class="mt-2" type="submit">Create Organization</Button>
    </form>
  </Card>
</template>

<script lang="ts" setup>
import Card from '../ui/card/Card.vue';
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createNewOrganization } from '~/services/organizationServices';
const createOrganizationFormSchema = toTypedSchema(z.object({
  organization_name: z.string(),
  industry: z.string(),
  country: z.string({
    required_error: 'Please select a language.',
  }),
  postal_code: z.string(),
  administrative_division: z.string(),
  city: z.string(),
  street_address: z.string(),
  organization_contact: z.string(),
  organization_email: z.string(),
}))

const createOrganizationForm = useForm({
  validationSchema: createOrganizationFormSchema,
})

const supabase = useSupabaseClient()
const onSubmit = createOrganizationForm.handleSubmit((values) => {
  createNewOrganization({ organizationInfo: values, supabase: supabase })
    .then(response => {
      navigateTo('/')
    })
    .catch(error => {
      console.log(error);
    })
})
</script>