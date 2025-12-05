/* eslint-disable @typescript-eslint/no-explicit-any */
// components/profile/AddressForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema, AddressInput } from "@/lib/schemas/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface Props {
  address?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddressForm({ address, onSuccess, onCancel }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
    defaultValues: address || {
      label: "",
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "Egypt",
      isDefault: false,
    },
  });

  const onSubmit = async (data: AddressInput) => {
    setIsLoading(true);
    setError("");

    try {
      const url = address
        ? `/api/user/addresses/${address._id}`
        : "/api/user/addresses";

      const method = address ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save address");
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Label */}
        <div className="space-y-2">
          <Label htmlFor="label">Label *</Label>
          <Input
            id="label"
            placeholder="e.g., Home, Work"
            {...register("label")}
            disabled={isLoading}
          />
          {errors.label && (
            <p className="text-sm text-destructive">{errors.label.message}</p>
          )}
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input id="fullName" {...register("fullName")} disabled={isLoading} />
          {errors.fullName && (
            <p className="text-sm text-destructive">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            placeholder="01xxxxxxxxx"
            {...register("phone")}
            disabled={isLoading}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>

        {/* Street */}
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="street">Street Address *</Label>
          <Input id="street" {...register("street")} disabled={isLoading} />
          {errors.street && (
            <p className="text-sm text-destructive">{errors.street.message}</p>
          )}
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input id="city" {...register("city")} disabled={isLoading} />
          {errors.city && (
            <p className="text-sm text-destructive">{errors.city.message}</p>
          )}
        </div>

        {/* State */}
        <div className="space-y-2">
          <Label htmlFor="state">State/Governorate *</Label>
          <Input id="state" {...register("state")} disabled={isLoading} />
          {errors.state && (
            <p className="text-sm text-destructive">{errors.state.message}</p>
          )}
        </div>

        {/* Postal Code */}
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code *</Label>
          <Input
            id="postalCode"
            {...register("postalCode")}
            disabled={isLoading}
          />
          {errors.postalCode && (
            <p className="text-sm text-destructive">
              {errors.postalCode.message}
            </p>
          )}
        </div>

        {/* Country */}
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Input id="country" {...register("country")} disabled={isLoading} />
          {errors.country && (
            <p className="text-sm text-destructive">{errors.country.message}</p>
          )}
        </div>
      </div>

      {/* Is Default */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="isDefault"
          checked={watch("isDefault")}
          onCheckedChange={(checked) =>
            setValue("isDefault", checked as boolean)
          }
          disabled={isLoading}
        />
        <Label htmlFor="isDefault" className="cursor-pointer">
          Set as default address
        </Label>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-2 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {address ? "Update Address" : "Add Address"}
        </Button>
      </div>
    </form>
  );
}
