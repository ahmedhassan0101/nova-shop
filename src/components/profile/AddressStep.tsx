'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileCompletionStep2Schema, ProfileStep2Input } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface AddressStepProps {
  onComplete: () => void;
}

export default function AddressStep({ onComplete }: AddressStepProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileStep2Input>({
    resolver: zodResolver(profileCompletionStep2Schema),
    defaultValues: {
      addresses: [
        {
          label: 'Home',
          fullName: '',
          phone: '',
          street: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'Egypt',
          isDefault: true,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses',
  });

  const onSubmit = async (data: ProfileStep2Input) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/user/complete-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step: 2, data }),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      onComplete();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Address {index + 1}</h3>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Label</Label>
                <Input {...register(`addresses.${index}.label`)} />
                {errors.addresses?.[index]?.label && (
                  <p className="text-sm text-destructive">
                    {errors.addresses[index]?.label?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input {...register(`addresses.${index}.fullName`)} />
                {errors.addresses?.[index]?.fullName && (
                  <p className="text-sm text-destructive">
                    {errors.addresses[index]?.fullName?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Phone</Label>
                <Input {...register(`addresses.${index}.phone`)} />
                {errors.addresses?.[index]?.phone && (
                  <p className="text-sm text-destructive">
                    {errors.addresses[index]?.phone?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Street</Label>
                <Input {...register(`addresses.${index}.street`)} />
              </div>

              <div className="space-y-2">
                <Label>City</Label>
                <Input {...register(`addresses.${index}.city`)} />
              </div>

              <div className="space-y-2">
                <Label>State</Label>
                <Input {...register(`addresses.${index}.state`)} />
              </div>

              <div className="space-y-2">
                <Label>Postal Code</Label>
                <Input {...register(`addresses.${index}.postalCode`)} />
              </div>

              <div className="space-y-2">
                <Label>Country</Label>
                <Input {...register(`addresses.${index}.country`)} />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox {...register(`addresses.${index}.isDefault`)} />
              <Label>Set as default address</Label>
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({
            label: '',
            fullName: '',
            phone: '',
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: 'Egypt',
            isDefault: false,
          })
        }
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Another Address
      </Button>

      <Button type="submit" className="w-full" disabled={isLoading}>
        Continue
      </Button>
    </form>
  );
}